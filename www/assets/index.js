/*
*  the canvas element
*/
var classMonitor = true;
var c    = document.getElementById('gameGraphics');
var ctx  = c.getContext('2d');
var isFire = 0;
var isFireCount = 0;
    /*
     *  the canvas element
     */
    var myGamePiece;
    var myGamePiece2;
    var myBackground;

    function startGame() {

        myGamePiece  = new component( 120,  270, "img/ship01.png", 300, 240,  "image"); //corelian
        myGamePiece2 = new component( 120,  296, "img/ship02.png", 100, 240,  "image");
        myBackground = new component(3000, 3000, "img/space01.jpg",  0,   0,  "image");
        myGameArea.start();
    }

    var myGameArea = {
        canvas : document.createElement("canvas"),
        start : function() {
            this.context = c.getContext("2d");
            this.interval = setInterval(updateGameArea, 20);
        },
        clear : function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        stop : function() {
            clearInterval(this.interval);
        }
    }

    function component(width, height, color, x, y, type) {
        this.type = type;
        if (type == "image") {
            this.image = new Image();
            this.image.src = color;
        }
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.update = function() {
            ctx = myGameArea.context;
            if (type == "image") {
                ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            }
            else {
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }
        this.newPos = function() {
            this.x += this.speedX;
            this.y += this.speedY;
        }
    }

    function updateGameArea() {
        myGameArea.clear();

        myBackground.newPos();
        myBackground.update();

        myGamePiece.newPos();
        myGamePiece.update();

        myGamePiece2.newPos();
        myGamePiece2.update();

        //testestestestes
        // ctx.fillStyle = "#FF0000";
        // ctx.fillRect(0,0,150,75);

        if (isFireCount > 0 ){
          if (isFireCount > 10 ){
            ctx.strokeStyle="#FF0000";
            ctx.moveTo(350,420);
            ctx.lineTo(200,350);
            ctx.stroke();
          }
          if (isFireCount == 10  || isFireCount == 7  || isFireCount == 5  || isFireCount == 3  | isFireCount == 1) {
            ctx.strokeStyle="#ff8300";
            ctx.moveTo(350,420);
            ctx.lineTo(200,350);
            ctx.stroke();
          }
          document.getElementById("monitor1").innerHTML = isFireCount;
          isFireCount = isFireCount -1;
        }
    }

    function fire(){
      if (isFireCount < 1){
        isFireCount = 50;
        document.getElementById('audio').play();
      }
    }

    function move(dir) {
        myGamePiece.image.src = "img/ship01.png"; //angry.gif
        if (dir == "up"   ) {myGamePiece.speedY = -1; }
        if (dir == "down" ) {myGamePiece.speedY =  1; }
        if (dir == "left" ) {myGamePiece.speedX = -1; }
        if (dir == "right") {myGamePiece.speedX =  1; }
    }

    function clearmove() {
        myGamePiece.image.src = "img/ship01.png"; //happy
        myGamePiece.speedX = 0;
        myGamePiece.speedY = 0;
        myGamePiece2.image.src = "img/ship02.png"; //happy
        myGamePiece2.speedX = 0;
        myGamePiece2.speedY = 0;
    }


// if (classMonitor == false){
  document.getElementById("monitor1").style.display = "none";
  document.getElementById("monitor2").style.display = "none";
  document.getElementById("monitor3").style.display = "none";
  document.getElementById("monitor4").style.display = "none";

// }
    /*
     *   Calculando o tamanho da janela
     */
    var bw = window.innerWidth;
    var bh = window.innerHeight;
    // document.getElementById("monitor3").innerHTML = " Browser resolution: <br> Width: " + bw + "<br>Height: " + bh;

    var sw = screen.width;
    var sh = screen.height;
    // document.getElementById("monitor4").innerHTML = " Screen resolution: <br> Width: " + sw + "<br>Height: " + sh;

    finalheight = bh - 100;
    document.getElementById("gameGraphicsContainer").style.height = finalheight + "px";
