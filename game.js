/**
 * Proyecto: Logística Puzzle
 * Versión: v.019
 * Descripción: Implementación del Nivel 4 con tiempo dinámico (88s) y pedidos de hasta 5 artículos.
 */

window.addEventListener('load', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const uiLayer = document.getElementById('ui-layer');
    
    // Modales y Botones
    const startModal = document.getElementById('start-modal');
    const pauseModal = document.getElementById('pause-modal');
    const levelModal = document.getElementById('level-modal');
    const startBtn = document.getElementById('start-btn');
    const resumeBtn = document.getElementById('resume-btn');
    const nextLevelBtn = document.getElementById('next-level-btn');
    const pauseBtn = document.getElementById('pause-btn');
    
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const levelTitle = document.getElementById('level-title');

    const width = Math.min(window.innerWidth, 480);
    const height = Math.min(window.innerHeight, 850);
    canvas.width = width;
    canvas.height = height;

    // --- VARIABLES GLOBALES DE ESTADO Y TIEMPO ---
    let gameState = 'ESPERANDO';
    let levelDuration = 60; // NUEVO: Tiempo total adaptable según el nivel
    let gameTimeLeft = 60; 
    let lastTime = 0;
    
    let hasCollapsed = false;
    
    // --- VARIABLES DEL CAMIÓN (INBOUND) ---
    let maxItems = 18; 
    let spawnedItemsCount = 0; 
    let itemSpawnInterval = 3;
    let itemFirstSpawnDelay = 0;
    let lastItemSpawnTime = 0;

    // --- VARIABLES DE NIVEL Y PEDIDOS (OUTBOUND) ---
    let level = 1;
    let totalOrdersLeft = 0;
    let totalOrdersLevel = 0;
    
    let orderSpawnInterval = 11;
    let orderFirstSpawnDelay = 5;
    let lastOrderSpawnTime = 0;
    
    let pendingOrderConfigs = []; 
    let activeOrders = [null, null, null]; 
    
    // --- VARIABLES DE CUADRÍCULA ---
    let gridCols = 10, gridRows = 10, cellSize = 0;
    let boardOffsetX = 0, boardOffsetY = 0;
    let inboundCols = 5, inboundRows = 5;
    let inboundOffsetX = 0, inboundOffsetY = 0;
    let outboundOffsetX = 0, outboundOffsetY = 0;

    let mainGridData = [];
    let inboundGridData = [];

    const ARTICULOS = [
        { id: 'A', color: 'yellow', matrix: [[1]] },
        { id: 'B', color: 'red', matrix: [[1], [1]] },
        { id: 'C', color: 'green', matrix: [[1, 1]] },
        { id: 'D', color: 'blue', matrix: [[1, 1, 1]] },
        { id: 'E', color: 'magenta', matrix: [[1, 1], [1, 1]] },
        { id: 'F', color: 'cyan', matrix: [[1, 0], [1, 1]] },
        { id: 'G', color: 'orange', matrix: [[0, 1], [1, 1]] }
    ];

    let itemsInPlay = [];
    let draggedItem = null;
    let dragOffsetX = 0, dragOffsetY = 0;
    let previewC = -1, previewR = -1;
    let isHoveringMain = false;

    let draggedOrder = null;
    let dragOrderOffsetX = 0, dragOrderOffsetY = 0;

    // --- INICIALIZACIÓN POR NIVELES ---
    function initLayoutAndGrids(isNewGame) {
        gridCols = 10;
        gridRows = 10;
        inboundCols = 5;
        inboundRows = 5; 

        if (isNewGame) {
            mainGridData = Array.from({ length: gridRows }, () => Array(gridCols).fill(0));
            inboundGridData = Array.from({ length: inboundRows }, () => Array(inboundCols).fill(0));
            itemsInPlay = [];
            level = 1;
        }

        hasCollapsed = false; 
        previewC = -1;
        previewR = -1;
        isHoveringMain = false;
        draggedItem = null;
        draggedOrder = null;

        const margin = 20;
        cellSize = Math.floor((canvas.width - (margin * 2)) / gridCols);
        boardOffsetX = (canvas.width - (gridCols * cellSize)) / 2;
        boardOffsetY = 60;
        
        inboundOffsetX = (canvas.width / 2 - (inboundCols * cellSize)) / 2;
        inboundOffsetY = boardOffsetY + (gridRows * cellSize) + 70;
        
        outboundOffsetX = canvas.width / 2 + 10;
        outboundOffsetY = inboundOffsetY; 

        // CONFIGURACIÓN DE PARÁMETROS POR NIVEL
        if (level === 1) {
            levelDuration = 60;
            maxItems = 18;
            itemSpawnInterval = 3;
            itemFirstSpawnDelay = 3; 
            totalOrdersLevel = 0;
            totalOrdersLeft = 0;
            pendingOrderConfigs = [];
        } else if (level === 2) {
            levelDuration = 60;
            maxItems = 12;
            itemSpawnInterval = 5;
            itemFirstSpawnDelay = 2; 
            totalOrdersLevel = 5;
            totalOrdersLeft = 5;
            orderSpawnInterval = 11;
            orderFirstSpawnDelay = 5;
            pendingOrderConfigs = [1, 2, 1, 3, 2]; 
        } else if (level === 3) {
            levelDuration = 60;
            maxItems = 18;
            itemSpawnInterval = 3;
            itemFirstSpawnDelay = 2; 
            totalOrdersLevel = 7;
            totalOrdersLeft = 7;
            orderSpawnInterval = 8; 
            orderFirstSpawnDelay = 3; 
            
            let configs = [1, 2, 2, 3, 3, 4, 4];
            configs.sort(() => Math.random() - 0.5);
            pendingOrderConfigs = configs;
        } else if (level >= 4) { // Nivel 4 (y herencia para los siguientes por ahora)
            levelDuration = 88; // 1 minuto y 28 segundos
            maxItems = 22;
            itemSpawnInterval = 4;
            itemFirstSpawnDelay = 1; // Aparece al primer segundo (segundo 87)
            totalOrdersLevel = 9;
            totalOrdersLeft = 9;
            orderSpawnInterval = 8; 
            orderFirstSpawnDelay = 8; // Espaciamos el primero para ajustarlo al ciclo total
            
            // Configuración del Nivel 4: 2x2, 3x3, 2x4, 2x5
            let configs = [2, 2, 3, 3, 3, 4, 4, 5, 5];
            configs.sort(() => Math.random() - 0.5);
            pendingOrderConfigs = configs;
        }
        
        activeOrders = [null, null, null];
        lastItemSpawnTime = 0;
        lastOrderSpawnTime = 0;
    }

    // --- LÓGICAS DE CUADRÍCULA ---
    function canFitInGrid(grid, cols, rows, itemMatrix, startC, startR) {
        for (let r = 0; r < itemMatrix.length; r++) {
            for (let c = 0; c < itemMatrix[r].length; c++) {
                if (itemMatrix[r][c] === 1) {
                    let targetR = startR + r;
                    let targetC = startC + c;
                    if (targetR < 0 || targetR >= rows || targetC < 0 || targetC >= cols) return false;
                    if (grid[targetR][targetC] !== 0) return false;
                }
            }
        }
        return true;
    }

    function canFitInMain(itemMatrix) {
        for (let r = 0; r < gridRows; r++) {
            for (let c = 0; c < gridCols; c++) {
                if (canFitInGrid(mainGridData, gridCols, gridRows, itemMatrix, c, r)) return true;
            }
        }
        return false;
    }

    function updateGridOcupancy(grid, itemMatrix, startC, startR, val) {
        for (let r = 0; r < itemMatrix.length; r++) {
            for (let c = 0; c < itemMatrix[r].length; c++) {
                if (itemMatrix[r][c] === 1) {
                    grid[startR + r][startC + c] = val;
                }
            }
        }
    }

    // Generador de pedidos compactos
    function generateOrder(numItems) {
        let availableIds = [];
        let boardCounts = {};
        
        itemsInPlay.forEach(item => {
            boardCounts[item.id] = (boardCounts[item.id] || 0) + 1;
        });

        activeOrders.forEach(order => {
            if (order) {
                order.requirements.forEach(req => {
                    if (!req.placed && boardCounts[req.id] > 0) {
                        boardCounts[req.id]--;
                    }
                });
            }
        });

        for (let id in boardCounts) {
            for (let i = 0; i < boardCounts[id]; i++) {
                availableIds.push(id);
            }
        }

        let selectedItems = [];
        for(let i=0; i<numItems; i++) {
            if (availableIds.length > 0) {
                let randIndex = Math.floor(Math.random() * availableIds.length);
                let chosenId = availableIds.splice(randIndex, 1)[0];
                selectedItems.push(ARTICULOS.find(a => a.id === chosenId));
            } else if (itemsInPlay.length > 0) {
                let randomExisting = itemsInPlay[Math.floor(Math.random() * itemsInPlay.length)];
                selectedItems.push(ARTICULOS.find(a => a.id === randomExisting.id));
            } else {
                selectedItems.push(ARTICULOS[Math.floor(Math.random() * ARTICULOS.length)]);
            }
        }

        let tempGrid = Array.from({length: 15}, () => Array(15).fill(0));
        let placements = []; 

        let first = selectedItems[0];
        placements.push({ item: first, r: 7, c: 7 });
        updateGridOcupancy(tempGrid, first.matrix, 7, 7, 1);

        for(let i=1; i<numItems; i++) {
            let current = selectedItems[i];
            let bestR = -1, bestC = -1;
            let minArea = 999;

            for(let r=0; r<15 - current.matrix.length; r++) {
                for(let c=0; c<15 - current.matrix[0].length; c++) {
                    if(canFitInGrid(tempGrid, 15, 15, current.matrix, c, r)) {
                        updateGridOcupancy(tempGrid, current.matrix, c, r, 1);
                        
                        let minR_b = 15, maxR_b = 0, minC_b = 15, maxC_b = 0;
                        for(let gr=0; gr<15; gr++){
                            for(let gc=0; gc<15; gc++){
                                if(tempGrid[gr][gc]){
                                    if(gr < minR_b) minR_b = gr;
                                    if(gr > maxR_b) maxR_b = gr;
                                    if(gc < minC_b) minC_b = gc;
                                    if(gc > maxC_b) maxC_b = gc;
                                }
                            }
                        }
                        let area = (maxR_b - minR_b + 1) * (maxC_b - minC_b + 1);

                        if (area < minArea) {
                            minArea = area;
                            bestR = r; bestC = c;
                        }
                        updateGridOcupancy(tempGrid, current.matrix, c, r, 0);
                    }
                }
            }
            placements.push({ item: current, r: bestR, c: bestC });
            updateGridOcupancy(tempGrid, current.matrix, bestC, bestR, 1);
        }

        let minR = 15, minC = 15;
        placements.forEach(p => {
            if (p.r < minR) minR = p.r;
            if (p.c < minC) minC = p.c;
        });

        return {
            x: 0, 
            y: 0,
            isAnimatingOut: false,
            xOffset: 0,
            requirements: placements.map(p => ({
                id: p.item.id,
                item: p.item,
                r: p.r - minR,
                c: p.c - minC,
                placed: false
            }))
        };
    }

    function spawnPiece() {
        if (spawnedItemsCount >= maxItems) return;

        let validItems = ARTICULOS.filter(item => canFitInMain(item.matrix));
        if (validItems.length === 0) {
            hasCollapsed = true; 
            return; 
        }

        let randomItem = validItems[Math.floor(Math.random() * validItems.length)];
        let foundSpot = false;
        let spotC = 0, spotR = 0;

        for (let r = 0; r < inboundRows; r++) {
            for (let c = inboundCols - 1; c >= 0; c--) {
                if (canFitInGrid(inboundGridData, inboundCols, inboundRows, randomItem.matrix, c, r)) {
                    spotC = c; spotR = r;
                    foundSpot = true;
                    break;
                }
            }
            if (foundSpot) break;
        }

        if (!foundSpot) {
            hasCollapsed = true;
            return; 
        }

        updateGridOcupancy(inboundGridData, randomItem.matrix, spotC, spotR, 1);
        const finalX = inboundOffsetX + (spotC * cellSize);
        const finalY = inboundOffsetY + (spotR * cellSize);

        itemsInPlay.push({
            ...randomItem,
            x: -200, 
            y: finalY,
            targetX: finalX,
            targetY: finalY,
            isAnimating: true,
            inZone: 'INBOUNDS', 
            gridC: spotC,
            gridR: spotR
        });

        spawnedItemsCount++;
    }

    // --- CONTROLES DE ARRASTRE ---
    function getPointerPos(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
    }

    function onPointerDown(e) {
        if (gameState !== 'JUGANDO') return;
        const { x, y } = getPointerPos(e);

        previewC = -1;
        previewR = -1;
        isHoveringMain = false;

        // Comprobar si tocamos un Pedido
        if (level >= 2) {
            for (let i = 0; i < activeOrders.length; i++) {
                let order = activeOrders[i];
                if (order && !order.isAnimatingOut) {
                    let maxC = 0, maxR = 0;
                    order.requirements.forEach(req => {
                        let reqMaxC = req.c + req.item.matrix[0].length;
                        let reqMaxR = req.r + req.item.matrix.length;
                        if (reqMaxC > maxC) maxC = reqMaxC;
                        if (reqMaxR > maxR) maxR = reqMaxR;
                    });
                    
                    let orderWidth = maxC * cellSize;
                    let orderHeight = maxR * cellSize;

                    if (x >= order.x && x <= order.x + orderWidth && y >= order.y && y <= order.y + orderHeight) {
                        draggedOrder = order;
                        dragOrderOffsetX = x - order.x;
                        dragOrderOffsetY = y - order.y;
                        return; 
                    }
                }
            }
        }

        // Comprobar si tocamos un artículo
        for (let i = itemsInPlay.length - 1; i >= 0; i--) {
            const item = itemsInPlay[i];
            if (!item.isAnimating && (item.inZone === 'INBOUNDS' || item.inZone === 'MAIN')) {
                const itemWidth = item.matrix[0].length * cellSize;
                const itemHeight = item.matrix.length * cellSize;
                
                if (x >= item.x && x <= item.x + itemWidth && y >= item.y && y <= item.y + itemHeight) {
                    draggedItem = item;
                    dragOffsetX = x - item.x;
                    dragOffsetY = y - item.y;
                    
                    draggedItem.originalZone = item.inZone;
                    draggedItem.originalC = item.gridC;
                    draggedItem.originalR = item.gridR;
                    
                    if (item.inZone === 'INBOUNDS') {
                        updateGridOcupancy(inboundGridData, item.matrix, item.gridC, item.gridR, 0);
                    } else if (item.inZone === 'MAIN') {
                        updateGridOcupancy(mainGridData, item.matrix, item.gridC, item.gridR, 0);
                    }
                    break;
                }
            }
        }
    }

    function onPointerMove(e) {
        if (gameState !== 'JUGANDO') return;
        e.preventDefault(); 
        const { x, y } = getPointerPos(e);
        
        if (draggedOrder) {
            let newX = x - dragOrderOffsetX;
            let newY = y - dragOrderOffsetY;
            
            if (newX < outboundOffsetX - 10) newX = outboundOffsetX - 10;
            if (newY < outboundOffsetY - 40) newY = outboundOffsetY - 40;
            
            draggedOrder.x = newX;
            draggedOrder.y = newY;
            return;
        }

        if (draggedItem) {
            draggedItem.x = x - dragOffsetX;
            draggedItem.y = y - dragOffsetY;

            const centerX = draggedItem.x + ((draggedItem.matrix[0].length * cellSize) / 2);
            const centerY = draggedItem.y + ((draggedItem.matrix.length * cellSize) / 2);

            if (centerX >= boardOffsetX && centerX <= boardOffsetX + (gridCols * cellSize) &&
                centerY >= boardOffsetY && centerY <= boardOffsetY + (gridRows * cellSize)) {
                
                isHoveringMain = true;
                const gridC = Math.round((centerX - boardOffsetX) / cellSize) - Math.floor(draggedItem.matrix[0].length / 2);
                const gridR = Math.round((centerY - boardOffsetY) / cellSize) - Math.floor(draggedItem.matrix.length / 2);

                if (canFitInGrid(mainGridData, gridCols, gridRows, draggedItem.matrix, gridC, gridR)) {
                    previewC = gridC;
                    previewR = gridR;
                } else {
                    previewC = -1;
                    previewR = -1;
                }
            } else {
                isHoveringMain = false;
                previewC = -1;
                previewR = -1;
            }
        }
    }

    function onPointerUp(e) {
        if (gameState !== 'JUGANDO') return;

        if (draggedOrder) {
            draggedOrder = null;
            return;
        }

        if (!draggedItem) return;

        let droppedInOrder = false;

        if (level >= 2 && draggedItem.originalZone === 'MAIN') {
            for (let i = 0; i < 3; i++) {
                let order = activeOrders[i];
                if (!order || order.isAnimatingOut) continue;

                for (let req of order.requirements) {
                    if (!req.placed && req.id === draggedItem.id) {
                        let targetX = order.x + req.c * cellSize;
                        let targetY = order.y + req.r * cellSize;

                        let dist = Math.hypot(draggedItem.x - targetX, draggedItem.y - targetY);
                        if (dist < cellSize * 1.5) { 
                            req.placed = true;
                            droppedInOrder = true;
                            
                            itemsInPlay = itemsInPlay.filter(it => it !== draggedItem);

                            if (order.requirements.every(r => r.placed)) {
                                order.isAnimatingOut = true;
                            }
                            break;
                        }
                    }
                }
                if (droppedInOrder) break;
            }
        }

        if (!droppedInOrder) {
            if (isHoveringMain && previewC !== -1 && previewR !== -1) {
                draggedItem.x = boardOffsetX + (previewC * cellSize);
                draggedItem.y = boardOffsetY + (previewR * cellSize);
                draggedItem.inZone = 'MAIN';
                draggedItem.gridC = previewC;
                draggedItem.gridR = previewR;
                updateGridOcupancy(mainGridData, draggedItem.matrix, previewC, previewR, 1);
            } else {
                draggedItem.inZone = draggedItem.originalZone;
                draggedItem.gridC = draggedItem.originalC;
                draggedItem.gridR = draggedItem.originalR;
                
                if (draggedItem.originalZone === 'INBOUNDS') {
                    draggedItem.x = inboundOffsetX + (draggedItem.gridC * cellSize);
                    draggedItem.y = inboundOffsetY + (draggedItem.gridR * cellSize);
                    updateGridOcupancy(inboundGridData, draggedItem.matrix, draggedItem.gridC, draggedItem.gridR, 1);
                } else {
                    draggedItem.x = boardOffsetX + (draggedItem.gridC * cellSize);
                    draggedItem.y = boardOffsetY + (draggedItem.gridR * cellSize);
                    updateGridOcupancy(mainGridData, draggedItem.matrix, draggedItem.gridC, draggedItem.gridR, 1);
                }
            }
        }
        
        draggedItem = null;
        previewC = -1;
        previewR = -1;
        isHoveringMain = false;
    }

    canvas.addEventListener('mousedown', onPointerDown);
    canvas.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    canvas.addEventListener('touchstart', onPointerDown, { passive: false });
    canvas.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend', onPointerUp);

    // --- CONTROLES DE INTERFAZ (UI) ---
    function startGameSequence(isNewGame) {
        canvas.classList.remove('canvas-blurred');
        levelModal.classList.add('hidden');
        uiLayer.classList.remove('hidden');
        startModal.classList.remove('hidden'); 
        
        startBtn.style.display = 'none';
        let count = 3;
        modalTitle.innerText = "¡PREPÁRATE!";
        modalText.style.fontSize = '40px'; 
        
        let countInterval = setInterval(() => {
            if (count > 0) {
                modalText.innerText = count;
                count--;
            } else {
                modalText.innerText = "¡GO!";
                clearInterval(countInterval);
                setTimeout(() => {
                    uiLayer.classList.add('hidden');
                    startModal.classList.add('hidden');
                    pauseBtn.classList.remove('hidden');
                    
                    if (!isNewGame) level++; 
                    initLayoutAndGrids(isNewGame);
                    
                    spawnedItemsCount = 0; 
                    gameTimeLeft = levelDuration; // NUEVO: Toma el tiempo específico del nivel
                    lastTime = performance.now();
                    gameState = 'JUGANDO';
                }, 500);
            }
        }, 1000);
    }

    startBtn.addEventListener('click', () => startGameSequence(true));
    nextLevelBtn.addEventListener('click', () => startGameSequence(false));

    pauseBtn.addEventListener('click', () => {
        if (gameState === 'JUGANDO') {
            gameState = 'PAUSADO';
            canvas.classList.add('canvas-blurred');
            uiLayer.classList.remove('hidden');
            pauseModal.classList.remove('hidden');
            pauseBtn.classList.add('hidden');
        }
    });

    resumeBtn.addEventListener('click', () => {
        gameState = 'JUGANDO';
        canvas.classList.remove('canvas-blurred');
        uiLayer.classList.add('hidden');
        pauseModal.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
        lastTime = performance.now(); 
    });

    function endGame(message) {
        gameState = 'GAMEOVER';
        canvas.classList.remove('canvas-blurred');
        uiLayer.classList.remove('hidden');
        startModal.classList.remove('hidden');
        pauseModal.classList.add('hidden');
        levelModal.classList.add('hidden');
        pauseBtn.classList.add('hidden');
        
        startBtn.style.display = 'block';
        startBtn.innerText = 'REINICIAR'; 
        startBtn.onclick = () => startGameSequence(true); 
        modalTitle.innerText = message;
        modalText.style.fontSize = '16px';
        modalText.innerText = `Has fallado en el Nivel: ${level}`;
    }

    function completeLevel(message) {
        gameState = 'NIVEL_COMPLETADO';
        canvas.classList.add('canvas-blurred');
        uiLayer.classList.remove('hidden');
        levelModal.classList.remove('hidden');
        pauseBtn.classList.add('hidden');
        levelTitle.innerText = message;
    }

    // --- BUCLE PRINCIPAL (TIEMPOS Y LÓGICA) ---
    function gameLoop(timestamp) {
        const deltaTime = (timestamp - lastTime) / 1000;
        lastTime = timestamp;

        if (gameState === 'JUGANDO') {
            gameTimeLeft -= deltaTime;
            let timeElapsed = levelDuration - gameTimeLeft; // Calculado sobre el tiempo dinámico
            
            if (level >= 2 && pendingOrderConfigs.length > 0) {
                let spawnedOrdersCount = totalOrdersLevel - pendingOrderConfigs.length;
                let shouldSpawnOrder = false;

                if (spawnedOrdersCount === 0) {
                    if (timeElapsed >= orderFirstSpawnDelay) shouldSpawnOrder = true;
                } else {
                    if (timeElapsed - lastOrderSpawnTime >= orderSpawnInterval) shouldSpawnOrder = true;
                }

                if (shouldSpawnOrder) {
                    let emptySlot = activeOrders.findIndex(o => o === null);
                    if (emptySlot !== -1) {
                        let numItems = pendingOrderConfigs.shift();
                        let newOrder = generateOrder(numItems);
                        
                        newOrder.x = outboundOffsetX;
                        newOrder.y = outboundOffsetY + (emptySlot * 3.5 * cellSize);
                        
                        activeOrders[emptySlot] = newOrder;
                        lastOrderSpawnTime = timeElapsed; 
                    }
                }
            }

            if (level >= 2) {
                activeOrders.forEach((order, index) => {
                    if (order && order.isAnimatingOut) {
                        order.xOffset += 500 * deltaTime; 
                        if (order.x + order.xOffset > canvas.width) {
                            activeOrders[index] = null; 
                            totalOrdersLeft--;
                        }
                    }
                });
            }

            if (spawnedItemsCount < maxItems && !hasCollapsed) {
                let shouldSpawnItem = false;
                
                if (spawnedItemsCount === 0) {
                    if (timeElapsed >= itemFirstSpawnDelay) shouldSpawnItem = true;
                } else {
                    if (timeElapsed - lastItemSpawnTime >= itemSpawnInterval) shouldSpawnItem = true;
                }

                if (shouldSpawnItem) {
                    spawnPiece();
                    lastItemSpawnTime = timeElapsed;
                }
            }

            if (gameTimeLeft <= 0) {
                if (level === 1) {
                    if (hasCollapsed) {
                        endGame('Faltan artículos por colocar - GAME OVER');
                    } else {
                        completeLevel('Tiempo finalizado, quedan artículos por ubicar.');
                    }
                } else if (level >= 2) {
                    let missingOrders = totalOrdersLeft > 0;
                    let missingItems = hasCollapsed; 

                    if (missingOrders && missingItems) {
                        endGame('Pedidos no preparados y faltan artículos por colocar - GAME OVER');
                    } else if (missingOrders) {
                        endGame('Pedidos no preparados - GAME OVER');
                    } else if (missingItems) {
                        endGame('Faltan artículos por colocar - GAME OVER');
                    } else {
                        completeLevel(`¡Nivel ${level} Superado! Eres un maestro logístico.`);
                    }
                }
            } 
            else if (spawnedItemsCount === maxItems && !hasCollapsed) {
                const allInMain = itemsInPlay.every(item => item.inZone === 'MAIN' && !item.isAnimating);
                if (level === 1 && allInMain) {
                    completeLevel('Nivel 1 finalizado, ¡enhorabuena!');
                } else if (level >= 2 && allInMain && totalOrdersLeft === 0) {
                    completeLevel(`Nivel ${level} finalizado, todo ubicado y entregado. ¡Enhorabuena!`);
                }
            }

            itemsInPlay.forEach(item => {
                if (item.isAnimating) {
                    item.x += 400 * deltaTime; 
                    if (item.x >= item.targetX) {
                        item.x = item.targetX;
                        item.isAnimating = false;
                    }
                }
            });
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        render();
        requestAnimationFrame(gameLoop);
    }

    function render() {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px Arial';
        
        let timeDisp = Math.max(0, Math.ceil(gameTimeLeft));
        let minutes = Math.floor(timeDisp / 60);
        let seconds = timeDisp % 60;
        ctx.fillText(`Tiempo: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`, 20, 30);
        ctx.fillText(`Nivel: ${level}`, canvas.width - 100, 30);

        drawGrid(mainGridData, boardOffsetX, boardOffsetY, '#fca311', 'rgba(20, 33, 61, 0.8)');
        drawGrid(inboundGridData, inboundOffsetX, inboundOffsetY, '#4ecca3', 'rgba(78, 204, 163, 0.15)');

        if (level >= 2) {
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`Pedidos Pendientes: ${totalOrdersLeft}`, canvas.width * 0.75, inboundOffsetY - 20);
            ctx.textAlign = 'left';

            activeOrders.forEach(order => {
                if (order) drawOrder(order);
            });
        }

        itemsInPlay.forEach(item => {
            if (item !== draggedItem) drawItem(item, item.x, item.y, 1.0); 
        });

        if (draggedItem && isHoveringMain && previewC !== -1 && previewR !== -1) {
            const previewX = boardOffsetX + (previewC * cellSize);
            const previewY = boardOffsetY + (previewR * cellSize);
            drawItem(draggedItem, previewX, previewY, 0.5); 
        }

        if (draggedItem) drawItem(draggedItem, draggedItem.x, draggedItem.y, 1.0); 
    }

    function drawGrid(gridArray, offsetX, offsetY, borderColor, bgColor) {
        ctx.strokeStyle = borderColor; ctx.lineWidth = 2;
        for (let r = 0; r < gridArray.length; r++) {
            for (let c = 0; c < gridArray[0].length; c++) {
                const x = offsetX + (c * cellSize);
                const y = offsetY + (r * cellSize);
                ctx.fillStyle = bgColor;
                ctx.fillRect(x, y, cellSize, cellSize);
                ctx.strokeRect(x, y, cellSize, cellSize);
            }
        }
    }

    function drawItem(item, xPos, yPos, alphaOpacity) {
        ctx.save();
        ctx.globalAlpha = alphaOpacity;
        ctx.fillStyle = item.color;
        ctx.strokeStyle = '#ffffff'; 
        ctx.lineWidth = 2;
        ctx.setLineDash([]); 
        for (let r = 0; r < item.matrix.length; r++) {
            for (let c = 0; c < item.matrix[r].length; c++) {
                if (item.matrix[r][c] === 1) {
                    const blockX = xPos + (c * cellSize);
                    const blockY = yPos + (r * cellSize);
                    ctx.fillRect(blockX, blockY, cellSize, cellSize);
                    ctx.strokeRect(blockX, blockY, cellSize, cellSize);
                }
            }
        }
        ctx.restore();
    }

    function drawOrder(order) {
        let orderBaseX = order.x;
        let orderBaseY = order.y; 

        for (let req of order.requirements) {
            let x = orderBaseX + req.c * cellSize;
            let y = orderBaseY + req.r * cellSize;

            if (order.isAnimatingOut) x += order.xOffset;

            ctx.save();
            if (req.placed) {
                ctx.globalAlpha = 1.0;
                ctx.setLineDash([]);
            } else {
                ctx.globalAlpha = 0.5;
                ctx.setLineDash([5, 5]);
            }

            ctx.fillStyle = req.item.color;
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;

            for (let r = 0; r < req.item.matrix.length; r++) {
                for (let c = 0; c < req.item.matrix[r].length; c++) {
                    if (req.item.matrix[r][c] === 1) {
                        let blockX = x + (c * cellSize);
                        let blockY = y + (r * cellSize);
                        ctx.fillRect(blockX, blockY, cellSize, cellSize);
                        ctx.strokeRect(blockX, blockY, cellSize, cellSize);
                    }
                }
            }
            ctx.restore();
        }
    }

    requestAnimationFrame(gameLoop);
});