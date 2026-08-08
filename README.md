# WHGame
LogisticGame
Juego:

Diseño de Pantalla:
Ya tenemos parte de la pantalla creada, pero te paso todos los puntos del diseño de la pantalla que quiero para el desarrollo de la partida del juego
(donde transcurrirá el juego)
1. La pantalla se divide en tres zonas; ZONA IN (INBOUNDS), ZONA OUT (OUTBOUNDS) y cuadrícula (ya creado)
2. las ZONA IN (INBOUNDS)y ZONA OUT (OUTBOUNDS) deberán estar debajo de la cuadrícula, una a la izquierda (INBOUNDS), y otra a la derecha (OUTBOUNDS). (ya creado)
3. La cuadrícula representa las estanterías de almacén, donde se colocarán los artículos en sus diferentes tipos de unidades. Esta cuadrícula puede ser variable (ya creado)
4. la ZONA IN (INBOUNDS) y la ZONA OUT (OUTBOUNDS) estarán separadas mediante una línea a trazos
4. La zona de entrada (INBOUNDS) será donde aparecerán las cajas para colocar en la cuadrícula (huecos de estantería). También tendrá que tener una cuadrícula donde se irán
colocando los artículos para darles de entrada (arrastrarlos a los huecos de almacén)
5. La zona de salida (OUTBOUNDS) será donde se colocarán los artículos que se tengan que expedir (despachar)- se arrastrarán con el dedo las cajas desde cuadrícula a zona OUT.
6. En la aprte superior izquierda aparecerá el número de pedidos preparados y entre paréntesis el número de unidades totales preparadas. Por ejemplo si hemos preparados 3 pedidos
con 15 unidades de artículo, la puntuación que parecerá en la parte superior izquierda será 3(15)
7. En la parte superior central aparecerá el tiempo de la partida, en horas minutos y segundos (HH:MM:SS)
8. En la parte superior superior derecha aparecerá el NIVEL en el que estamos (ya creado)


Esencia, estrategía y objetivo del juego:
El juego tiene que tener la esencia de un juego de estrategia. Simulará un almacen de logistica, es decir:
La mercancía o Stock tendrá una zona de entradas (ZONA IN) donde aparecerá la mercancía a colocar en la cuadrícula.
La mercancía tendrá una zona de almacenamiento (Cuadrícula, que llamaremos 'huecos de estantería' o 'huecos' simplemente).
La mercancía tendrá una zona de salidas donde se colocará el stock que se preparará (ZONA OUT).
En estas 3 zonas se gestionará el stock, que es la que el usuario moverá a través de estas tres zonas.
Al ser tres zonas, Los flujos de movimientos principales de la mercancía serán dos:
1. Tiene que dar de entrada a la mercancía (artículos), que será el flujo desde la ZONA IN a la cuadrícula.
2. Tiene que dar salida a la mercancía (artículos), que será el flujo desde la cuadrícula ala ZONA OUT.
El objetivo del juego se trata de hacer estos flujos (ZONA IN -> cuadrícula -> ZONA OUT) para que no se saturen de mercancía ninguna de las zonas (ZONA IN, Cuadrícula y ZONA OUT)
EL jugador en una partida o jugada dispondrá de 3 vidas.
Una partida terminará cuando el jugador agote las 3 vidas por una de las siguientes razones:
cuando en una de las zonas no quepa más artículos, es decir:
En la ZONA IN ya no caben más artículos de los que aparecen para dar de entrada porque no se hayan movido a la cuadrícula.
En la cuadrícula ya no caben más artículos porque no se han preparado los pedidos solicitados por el cliente liberando la cuadrícula
También terminará la partida cuando no se haya preparado a tiempo el pedido (los pedidos a preparar tendrán un contador hacía atrás, y si este contador llega a cero
el jugador perderá una vida)
EL motor del juego gestionará las entradas y los pedidos de manera que el juego tenga en cuanta las siguientes reglas para el ciclo del juego en la partida:
El supuesto cliente (el motor del juego) nos enviará el stock suficiente, que entrará por la zona IN (desde el lateral de la pantalla) y deberemos colocar en los huecos de estantería.
Con el stock que tengamos en almacén nos pedirá que preparemos pedidos que aparecerán en la zona OUT.
Antes de empezar una partida aparecerá un ventana emergente con un mensaje Presiona OK cuando estés listo para empezar' y botón OK. La partida empieza cuando se pulsa
el botón OK de la ventana. La ventana emergente tiene que desaparecer y un cronómetro se pone en marcha. En ese momento ya puede aparecer la primera entrada.
Mecanismo y detalle de los flujos:
Flujo ZONA IN -> Cuadrícula:
AL ponerse en marcha el cronómetro, empieza la partida y en la zona IN debe aparecer la primera entrada de mercancía (la mercancía aparecerá desde el lateral izquierdo
de la pantalla y se colocará en la ZONA IN).
El jugador debe colocar el stock que ha entrado arrastrando con el dedo la mercancía hacía los huecos libre que haya en la cuadrículaLa primera entrada
EL motor del juego deberá gestionar que los artículos siempre tengan cabida en estas dos zonas.Por ejemplo, si solo tengo tres celdas vacías en la cuadrícula, en la zona IN
aleatoreamente deberán aparecer una combinación de artículo de manera que yo pueda darles de entrada en esas tres celdas vacías (podrá ser un artículo que ocupe tres celdas,
o bien dos artículos, uno que ocupe dos celdas y otro que ocupe una celda).
se trata de, con los artículos que entran por la zona IN mantener sobre la cuadrícula el stock de artículos suficiente para servir los pedidos que se hagan en la zona OUT.
La dificultad al ir pasando pantallas radicará en la rapidez para preparar esos pedidos sin que se sature el almacén (cuadrícula), y en un tiempo límite que tendremos para
preparar el pedido.
El motor del juego tendrá que calcular escenarios como que se tenga que preparar un pedido con un artículo que no se ha ubicado en hueco, y ese artículo está esperando
en la zona IN para ser ubicado antes
Flujo Cuadrícula -> ZONA OUT
Los articulos disponibles para los pedidos que se tienen que preparar, podrán estar tanto en la zona IN como en la cuadrícula.



Artículos:
6. El stock está representado por artículos que se diferenciarán por colores. Al igual que en el Tetris, cada artículo tendrá un color.
Las dimensiones de cada artículo vendrán dadas por la unidad de la cuadrícula que es la celda, que será la dimensión de ancho y alto de las celdas que contienen el artículo,
el bounding box, seguida de la cantidad de celdas que ocupa el artículo dentro de ese bounding box, y finaliza con la forma y color del artículo.
Con esta nomenclatura, la referencia de cada artículo es la siguiente y una explicación:
Introduciremos un grupo de 7 artículos para empezar. Posteriormente se introducirán más artículos con formas más complejas de manera que aporten dificultad a los niveles.
El listado de la definición de artículos es la siguiente:
Artículo A
Dimensión: 1×1 celda
Ocupación: 1 celda
forma: cuadrado
color: amarillo
Es decir, el artículo A tiene 1 celda de ancho por 1 celda de alto, ocupa la totalidad de dimensión, forma cuadrada y color amarillo. de forma compacta
artículo A:(1x1/1)amarillo (si no se menciona la forma, el artículo ocupará la totalidad de la dimensión)
Artículo B
Dimensión: 1×2 celdas
Ocupación: 2 celdas
forma: rectangular
color: roja
Es decir, el artículo B tiene 1 celda de ancho por 2 celdas de alto, ocupa la totalidad de dimensión, color rojo.
artículo B:(1x2/2)rojo (si no se menciona la forma, el artículo ocupará la totalidad de la dimensión)
Artículo C
Dimensión: 2x1 celdas
Ocupación: 2 celdas
forma: rectangular apaisada
color: verde
Es decir, el artículo C tiene 2 celdas de ancho por 1 celda de alto, ocupa la totalidad de dimensión, color verde.
artículo C:(2x1/2)amarillo (si no se menciona la forma, el artículo ocupará la totalidad de la dimensión)
Artículo D
Dimensión: 3x1 celdas
Ocupación: 3 celdas
forma: rectangular apaisada
color: azul
Es decir, el artículo D tiene 3 celdas de ancho por 1 celda de alto, ocupa la totalidad de dimensión, color azul.
artículo D:(3x1/3)azul (si no se menciona la forma, el artículo ocupará la totalidad de la dimensión)
Artículo E
Dimensión: 2x2 celdas
Ocupación: 4 celdas
forma: cuadrada
color: magenta
Es decir, el artículo E tiene 2 celdas de ancho por 2 celdas de alto, ocupa la totalidad de dimensión, color magenta.
artículo E:(2x2/4)magenta (si no se menciona la forma, el artículo ocupará la totalidad de la dimensión)
Artículo F
Dimensión: 2x2 celdas
Ocupación: 3 celdas
forma: L
color: cian
Es decir, el artículo F tiene 2 celdas de ancho por 2 celdas de alto, ocupa 3 celdas de la dimensión, forma en L y color cian.
artículo E:L(2x2/3)cian
Artículo G
Dimensión: 2x2 celdas
Ocupación: 3 celdas
forma: J
color: naranja
Es decir, el artículo G tiene 2 celdas de ancho por 2 celdas de alto, ocupa 3 celdas de la dimensión, forma en J y color naranja.
artículo G:J(2x2/3)naranja

cuadrícula Zona IN:
será la delimitación de la zona IN.
Lo haremos con una cuadrícula cuya unidad también será la celda. Te explico a continuación lo que quiero:
En esta zona es donde se depositarán los artículos que entren al almacén para ser colocados en la cuadrícula almacén.
Estos artículos irán apareciendo de manera secuencial (se deslizarán desde el margen izquierdo de la pantalla) y aleatoria
(uno cada vez de los 7 artículos que hemos definido) cada intervalo de tiempo, y para ello deberán colocarse en la ZONA IN,
sobre la cuadrícula. Delimitaremos la Zona IN con una cuadrícula que tendrá como objetivo los siguientes puntos:
1. Preparar las piezas que vayan apareciendo cada cierto tiempo y que deben ser ubicadas en la cuadrícula almacén.
Esto será cuando el artículo quede encajado en las celdas de la cuadrícula de la zona IN. En ese momento se podrá arrastrar con el dedo
(o con el cursor del ratón) el artículo desde la Zona IN a la cuadrícula almacén.
2. Hacer de tope para finalizar la partida. Es decir, cuando ya no quepan más artículos en la cuadrícula de la zona IN
(no haya suficientes celdas para depositar los artículos que vayan entrando para depositar en la cuadrícula almacén).
La partida se dará por finalizada y el jugador habrá perdido. Por ejemplo, si en la cuadrícula quedan 2 celdas libres, 
y la siguiente pieza que aparece es una pieza de 3 celdas o más, esto significará el final de la partida,
ya que esta pieza de tres celdas no se puede depositar en la cuadrícula de la zona IN. También finalizará la partida si, por ejemplo,
en la cuadrícula de la zona IN quedan 2 celdas libres, pero no son continuas no colindan entre ellas, y el siguiente artículo en aparecer ocupa 2 celdas,
no se podrá colocar en la cuadrícula de la zona IN ya que no es posible dividirlo. También esto será un final de partida.
Es decir, la partida puede continuar mientras los artículos que aparecen para depositar en la zona IN, puedan ser colocados en la cuadrícula de la zona IN
(cuadrícula INBOUNDS).
Para la construcción de la cuadrícula INBOUNDS, utilizaremos la cuadrícula principal almacén. Esta cuadrícula tiene ahora 64 casillas (que será el 100%),
la cuadrícula INBOUNDS tendrá un rango de celdas del 25% de las casillas de la cuadrícula almacén (como nuestra unidad en la cuadrícula es la celda,
haz el redondeo necesario para que la cuadrícula INBOUNDS siempre sea de celdas completas, que las filas y columnas estén también completas, es decir,
que la cuadrícula INBOUNDS sea rectangular o cuadrada si es el caso y que entre dentro de la zona IN). Para este primer nivel, al tener la cuadrícula almacén 64  celdas,
el 25% de esta cuadrícula es 16 celdas (una cuadrícula de 4 filas por 4 columnas).

Juego:
Empezaremos con el mensaje emergente de inicio de la partida, los temporizadores necesarios en cada momento y el movimiento de los artículos a la cuadrícula desde la zona IN
(IN-CUADRÍCULA). Los detalles de la ventana emergente, los temporizadores y las reglas de este primer movimiento te las detallo a continuación:
Cuando se cargue el juego en pantalla, deberá haber un mensaje emergente con un botón con la palabra START, para pulsar e iniciar la partida
después de pulsar el botón START, un temporizador de 3 segundos y finalmente la palabra GO! aparece, se quita el mensaje emergente y dará inicio a la partida.
Se pondrá en marcha el temporizador de la partida, que para las pruebas inicialmente pondremos de 1 minuto, posteriormente se calibrará a un tiempo más óptimo).
Este minuto del temporizador será el tiempo para completar el primer nivel. Se deslizarán desde el margen izquierdo de la pantalla al centro de la ZONA 18 artículos
(1 cada 3 segundos) aleatoriamente de los 7 artículos definidos.
Iniciada la partida aparecerá el primer artículo en la ZONA IN (un efecto de movimiento se deslizará desde la izquierda, imitando a un camión que nos trae la mercancía,
los artículos al almacén, que atraca en el muelle de carga para ser almacenado).
Una vez el artículo esté en la zona IN listo para ser movido, desde la zona IN lo arrastraremos al hueco que creamos conveniente de la cuadrícula,
y soltaremos para que encaje. Los movimientos de las reglas para almacenar un artículo te las explico a continuación:
Movimientos de almacenamiento:
El proceso de entrada (IN) vendrá dado por una serie de artículos que irán apareciendo de forma secuencial y aleatoria, cualquiera de los siete artículos definidos
en la zona IN cada cierto intervalo de tiempo (según aumenta la dificultad del nivel irá disminuyendo el tiempo del intervalo con el que aparecen los artículos).
Los artículos aparecerán de forma secuencial y aleatoria y deberán ser arrastrados a la cuadrícula desde la zona IN con el dedo (para las pruebas se utilizará el cursor del ratón)
Al arrastrarlos se encajarán en la cuadrícula (efecto magnético) una vez se suelte el artículo y cumpliendo con las siguientes condiciones:
1. Los huecos de la cuadrícula deben estar vacíos.
2. Deben coincidir con la forma del artículo.
3. El efecto magnético para encajar el artículo en la cuadrícula debe darse al soltar el artículo sobre la cuadrícula y deberá encajar en las celdas de 
la cuadrícula que coincidan con las celdas y forma del artículo si estas celdas están vacías, con un margen de sesgo del 2%.
Por ejemplo, para el artículo A (1x1/1), arrastraré con el dedo (cursor del ratón)hasta la zona de la cuadrícula y se suelta sobre una celda 1x1, aquí entra la lógica del efecto 
magnético; el artículo encajará (será almacenado en una celda de la cuadrícula) que deberá estar vacía, deberá tener una posición con una diferencia igual o menor de un 2% 
en la posición donde se ha soltado el artículo. Si la celda en cuestión seleccionada para soltar el artículo no está vacía (y por extensión las vecinas si el artículo
así lo requiere), al soltar el artículo, no puede ser almacenado y volverá a la Zona IN, donde se podrá coger y arrastrar de nuevo a una zona de la cuadrícula donde se cumplan
las reglas mencionadas.
Para la aparición de artículos en la Zona IN, también habrá un temporizador (inicialmente de 5 segundos por pieza, es decir, aparecerá la primera pieza y a los 5 segundos
la siguiente, de nuevo a los cinco segundos otra, y así sucesivamente una tras otra, de manera secuencial y aleatoria).
NOTA IMPORTANTE PARA LA LÓGICA DEL JUEGO: La aparición de los artículos irá en función de las celdas libres de la cuadrícula (almacén), es decir,
la aparición de los artículos debe ser secuencial y aleatoria, pero cumpliendo siempre que el artículo que aparezca en cada momento puede ser almacenado
en la cuadrícula (bien porque hay celdas para almacenarlo, o bien porque en niveles superiores se cuente con que determinadas celdas van a ser liberadas
en el proceso de preparación de la Zona OUT).
Vamos a implementar estos puntos. Los movimientos de los artículos es la esencia del juego, y haré una prueba de testeo para probar los temporizadores cómo se mueven
los artículos hacia las cuadrículas.
Botón PAUSA:
Añadir un botón al lado del temporizador para pausar la partida. Al pausar el botón la partida se pausará, el temporizador de la partida se pausará y una ventana
emergente aparecerá avisando de que la partida está pausada y tendrá un botón de REANUDAR PARTIDA. Para REANUDAR la partida se deberá pulsar el botón de REANUDAR,
y la partida continúa poniendo de nuevo el temporizador en marcha. Durante el tiempo que esté pausado la partida, la pantalla detrás de la ventana emergente deberá
estar difuminada. Realiza este cambio y esta implementación del botón PAUSA (un botón sin texto, redondo, solo con el icono de PAUSA, dos palitos verticales paralelos)

ALMACÉN - OUTBOUNDS
El otro flujo de movimiento del juego es el de ALMACÉN-OUTBOUNDS. La zona OUT es la OUTBOUND, al igual que en un almacén es la zona donde se depositan los pedidos.
En este movimiento incluiremos la preparación, es decir, la forma que tiene una operativa de almacén par para preparar un pedido y depositarlo en la zona OUT.
La lógica de este flujo es la siguiente:
En el nivel 2 comenzarán las preparaciones. Este nivel también tendrá 1 minuto de temporizador.
La primera preparación aparecerá a los 5 segundos de iniciado el nivel 2.
Las preparaciones se harán de manera secuencial, es decir, el jugador tiene 11 segundos para preparar un pedido (como el primero aparece a los 5 segundos de iniciado 
el tiempodel nivel 2, restan 55 segundos, estos segundos divididos entre los cinco pedidos nos da 11 segundos para cada pedido), por lo que cada 11 seg aparecerá un pedido
a preparar en la zona OUT. La preparación consistirá en:
En la Zona OUT (OUBOUNDS) aparecerá el contorno en línea de trazos de los artículos que conforman el pedido y en el interior de ese contorno los colores de cada artículo, pero 
con una transparencia del colorde un 50%.
Ese contorno se tomará como una cuadrícula temporal hecho de celdas, donde se encajarán los artículos (también con efecto magnético) y la colocación de los artículos,
que se arrastrarán desde la cuadrícula ALMACÉN a la cuadrícula PEDIDO temporal de la zona OUT, deberá coincidir en forma y color con las celdas que comforman esa cuadrícula y
con su color correspondiente. Por ejemplo, para un pedido que aparezca en la zona OUT del artículo A, la cuadrícula será de una celda de contorno línea de trazos
de un color amarillo apagado (con un 50% detransparencia). Cuando aparezca ese contorno, el jugador deberá arrastras un artículo A desde la cuadrícula ALMACÉN a la
cuadrícula PEDIDO temporal en la zona OUT. una vez el jugador suelte el artículo A en su celda correspondiente de la cuadrícula PEDIDO temporal, el pedido se da por completo
(La línea de trazos se vuelve continua y el color se vuelve opaco. entonces el pedido está realizado y se deslizara desde la zona OUT hacia la derecha desapareciendo por el margen
derecho de la pantalla). si el pedido tuviera dos artículos, el contorno de la cuadrícula PEDIDO temporal sería el correspondiente al contorno que cubra los dos artículos
y en su interior los colores correspondientes a los artículos seleccionados para el pedido con un 50% de transparencia. cuando los dos artículos del pedido seán colocados 
en la cuadrícula PEDIDO temporal la línea de contorno de trazos se volverá continua y los colores de los dos artículos opacos y se delizará hacía la derecha. El pedido
estará listo. así sucesivamente.
Algunas condiciones para los pedidos:

1.Como ya te he comentado los pedidos aparecerán en la zona OUT cada 11 segundos, el primero en el segundo 55, el segundo en el 44, el tercero en el 33, el cuarto en el 22 y el tercero
en el segundo 11.
2. el pedido que aparece en la zona OUT se quedará pendiente hasta que se acabe el tiempo del temporizador.
3. Coloca un contador en la zona OUT pequeño pero visible de los pedidos a preparar (en este caso 5, pedidos 'pendiente = 5'), y que vaya descontando
los pedidos que se terminan y salen del almacén. Es decir, inicialmente el contador tiene 5 pedidos pendientes, y cuando se prepare uno y salga por el
margen izquierdo de la pantalla, el contador baja a 4. Y así sucesivamente hasta llegar a cero.
4. Optimiza el espacio de la zona OUT para que al menos quepan 3 pedidos. Es decir, distribuye los pedidos de manera que queden en la zona OUT sin que interseccionen los
contornos a trazos de los pedidos de manera que el jugador pueda prepararlos sin lugar a equivocarse de artículo, y que tenga visibilidad siempre de los artículos a preparar en
cada pedido.
5. En el caso de que haya tres pedidos en la zona OUT para preparar o en preparación, el resto de los pedidos se mantendrán sin salir hasta que uno de los pedidos se valide y 
desaparezca de la pantalla. Es decir, si el primer pedido sale en el segundo 55, el segundo pedido en el segundo 44 y el tercer pedido en el segundo 33, cuando en el segundo
22 tenga que salir el cuarto pedido, si aún están los tres pedidos anteriores, no aparecerá en la zona OUT este cuarto pedido hasta que uno de los otros se haya preparado.
En el momento en que uno de los pedidos de la zona OUT se prepare y desaparezca, entonces saldrá el cuarto pedido. si llega el segundo 11, momento en el que tiene que salir el 
último pedido, y aún no se han preparado ninguno. La aparición de los pedidos restantes (el cuarto y quinto) se harán de manera secuencual, es decir, a media que vayan preparándose
y despareciendo los pedidos que están en la zona OUT.
Si el temporizador llegara a cero y no estuvieran todos los pedidos preparados, o como en el nivel no estuvieran todos los artículos ubicados en las cuadriculas INBOUND o ALMACÉN
el jugador perdería la partida y saldría un mensaje emergente con texto 'pedidos no preparados - GAME OVER' y botón de REINICIAR, 
o bien un  mensaje emergente 'faltan artículos por colocar - GAME OVER' y botón de reiniciar), bien si faltan las dos cosas (pedidos por preparar y artículos por ubicar),
un mensaje emergente con texto 'pedidos no preparados y faltan artículos por colocar - GAME OVER' y botón de REINICIAR. al darle al botón REINICIAR se reinicia la partida desde cero.
6. En el nivel 2 prepararemos un total de cinco pedidos y aparecerán 12 artículos a ubicar (cada 5 segundos).
7. Los pedidos también serán de manera aleatoria y serán:
Dos pedidos de un artículo (el artículo a preparar lo seleccionará el juego de manera aleatoria de los siete definidos)
Dos pedidos de dos artículos (los artículos a preparar los seleccionará el juego de manera aleatoria de los siete definidos)
un pedido de tres artículos (los artículos a preparar los seleccionará el juego de manera aleatoria de los siete definidos)
8. El contorno que encierra los pedidos en la cuadrícula PEDIDO temporal, en el caso de dos o más artículos debe ser compacta, es decir, que el contorno de la
cuadrícula PEDIDO temporal, debe ser lo más similar a un cuadrado o rectángulo posible. Por ejemplo, si tenemos un pedido con el artículo A y el Artículo B,
el contorno de las celdas de la cuadrícula PEDIDO temporal será en forma de L. si por ejemplo, tenemos un pedido con el artículo A y el Artículo F,
el contorno de las celdas de la cuadrícula PEDIDO temporal será en forma cuadrada (el artículo A ocuparía la celda que hay libre del artículo F para formar un cuadrado).
tenemos un pedido con el artículo C y el Artículo D, el contorno de las celdas de la cuadrícula PEDIDO temporal será en forma de dimension (3x2/5)dos celdas arriba y tres debajo.
Y así sucesivamente. Para tres artículos aplica la misma regla, siempre lo más parecido a la forma cuadrada dentro de los posible.
Aplica este flujo de movimiento y estas reglas para el nivel 2 del juego. con esto ya tenemos mucho hecho. Probaré el nivel 2 una vez hayas hecho los cambios.

En el nivel 3 añadiremos más dificultad acortando los tiempos de aparición de artículos y preparación de pedidos. Es decir, en este nivel la secuencia de los artículos
que se deslizan a la cuadrícula INBOUNDS será en un intervalo más corto, así como la cuadrícula PEDIDO temporal que aparece en la zona OUT será también más corta. Te doy
a continuación los parametros de los temporizadores así como los pedidos a realizar en este nivel 3.
En este nivel 3 el temporizador también será de 1 minuto.
El primer artículo se deslizará desde el margen izquierdo de la pantalla a los 2 segundos de iniciado el temporizador. Después del primero, el segundo artículo y sucesivos lo
harán cada 3 seg.
La primera preparación aparecerá a los 3 segundos de iniciado el temporizador.
Al igual que en el nivel 2 las preparaciones se harán de manera secuencial.
la secuencia y preparación de pedidos sigue la misma lógica que en el nivel 2, pero la cantidad y los tiempos de preparación son serán en este nivel 3 los siguientes:
En este nivel 3 habrá que preparar 7 pedidos.
Cada pedido aparecerá a los 8 segundos del anterior. Es decir, el primer pedido saldrá en el segundo 57 el segundo saldrá a los 49 segundos, el tercero a los 41 segundos
y asi sucesivamente, siguiendo la lógica de aparición de la cuadrícula PEDIDO temporal y preparación de pedidos del nivel 2.
Algunas condiciones para los pedidos:
En este nivel 3 el contador de PEDIDOS PENDIENTES será de 8 y se irán descontando pedidos a medida que se vayan preparando. 
Cuando el contador llegue a cero, todos los pedidos se habrán preparado. Al igual que en el nivel 2 Optimiza el espacio de la zona OUT para que al menos quepan 3 pedidos.
Es decir, distribuye los pedidos de manera que queden en la zona OUT sin que interseccionen los contornos a trazos de los pedidos de manera que el jugador pueda prepararlos
sin lugar a equivocarse de artículo, y que tenga visibilidad siempre de los artículos a preparar en cada pedido.
AL igual que en el nivel 2, en el caso de que haya tres pedidos en la zona OUT para preparar o en preparación, el resto de los pedidos se mantendrán sin salir hasta que uno
de los pedidos se valide y desaparezca de la pantalla. Es decir, si el primer pedido sale en el segundo 57, el segundo pedido en el segundo 49 y el tercer pedido en el segundo 41,
cuando en el segundo 33 tenga que salir el cuarto pedido, si aún están los tres pedidos anteriores pendientes de preparar, no aparecerá en la zona OUT este cuarto pedido
hasta que uno de los otros se haya preparado y desaparezca. En el momento en que uno de los pedidos de la zona OUT se prepare y desaparezca, entonces saldrá el cuarto pedido
y así sucesivmente.
Si en el temporizador llega el segundo 9, momento en el que tiene que salir el último pedido, y aún no se han preparado ninguno. La aparición de los pedidos restantes
(el cuarto, quinto, sexto y septimo) se harán de manera secuencual, es decir, a media que vayan preparándose y despareciendo los pedidos que están en la zona OUT.
Finalizar el nivel.
Al igual que en el nivel 2, si el temporizador llegara a cero y no estuvieran todos los pedidos preparados, o como en el nivel 1 no estuvieran todos los artículos ubicados en 
las cuadriculas INBOUND o ALMACÉN el jugador perdería la partida y saldría un mensaje emergente con texto 'pedidos no preparados - GAME OVER' y botón de REINICIAR, 
o bien un  mensaje emergente 'faltan artículos por colocar - GAME OVER' y botón de reiniciar), bien si faltan las dos cosas (pedidos por preparar y artículos por ubicar),
un mensaje emergente con texto 'pedidos no preparados y faltan artículos por colocar - GAME OVER' y botón de REINICIAR. Al darle al botón REINICIAR se reinicia la partida desde cero.
Si acabado el temporizador de 1 minuto, todos los pedidos están preparados y todos los artículos están ubicados (bien en la cuadrícula ALMACÉN 
o bien en la cuadrícula INBOUNDS), al igual que en el nivel 2, que se continúa con el nivel 3, en el nivel 3 este quedará superado y se continuará con el nivel 4.
6. En el nivel 3 prepararemos un total de 7 pedidos (saldrá uno cada 8 segundos) y aparecerán 18 artículos a ubicar (cada 3 segundos, a partir del segundo 57 del temporizador).
7. Los pedidos también serán de manera aleatoria y serán:
Un pedido de un artículo (el artículo a preparar lo seleccionará el juego de manera aleatoria de los siete definidos)
Dos pedidos de dos artículos (los artículos a preparar los seleccionará el juego de manera aleatoria de los siete definidos)
Dos pedidos de tres artículos (los artículos a preparar los seleccionará el juego de manera aleatoria de los siete definidos)
Dos pedidos de cuatro artículos (los artículos a preparar los seleccionará el juego de manera aleatoria de los siete definidos)
8. Al igual que el nivel 2, en el nivel 3 el contorno que encierra los pedidos en la cuadrícula PEDIDO temporal, en el caso de dos o más artículos debe ser compacta, es decir, que el contorno de la
cuadrícula PEDIDO temporal, debe ser lo más similar a un cuadrado o rectángulo posible. Por ejemplo, si tenemos un pedido con el artículo A y el Artículo B,
el contorno de las celdas de la cuadrícula PEDIDO temporal será en forma de L. si por ejemplo, tenemos un pedido con el artículo A y el Artículo F,
el contorno de las celdas de la cuadrícula PEDIDO temporal será en forma cuadrada (el artículo A ocuparía la celda que hay libre del artículo F para formar un cuadrado).
tenemos un pedido con el artículo C y el Artículo D, el contorno de las celdas de la cuadrícula PEDIDO temporal será en forma de dimension (3x2/5)dos celdas arriba y tres debajo.
Y así sucesivamente. Para tres artículos aplica la misma regla, siempre lo más parecido a la forma cuadrada dentro de los posible.
Implementa este nivel 3 del juego y estas reglas para el nivel 3 del juego y probaré el nivel 3 una vez hayas hecho los cambios.
