var player
var splashScreen, playButton, aboutButton
var level1img
var enemyGroup,enemy,alien1,level2img,dustimage,alien2,alien3,playerimg,dust,dustGroup
var playerhealth =300
var playermaxHealth=300
var alienhealth =300
var alienmaxHealth=300
var playerhealth2 =300
var playermaxHealth2=300
var alienhealth2 =300
var alienmaxHealth2=300
var gamemusic,hitmusic,winmusic,loosehealthmusic,gameState = "wait"


function preload() {
//    splashScreen = loadImage("assets/splash.gif")
//    gameState = "wait"
//    level1img = loadImage("assets/level1bg.jpg")
//    alien1=loadImage("assets/alien3.png")
//    alien2=loadImage("assets/alien1flip.png")
//    alien3=loadImage("assets/alien1.png")
//    alienl2=loadImage("assets/alien_l2.png")
// playerimg=loadImage("assets/player.png")
// level2img = loadImage("assets/marsformarsgame.png")
// dustimage=loadImage("assets/orange dust.png")
// gamemusic=loadSound("Music/gamemusic.mp3")
// hitmusic=loadSound("Music/hit.wav")
// loosehealthmusic=loadSound("game over.wav")


splashScreen = loadImage("assets/Endless bars.gif")
   
level1img = loadImage("assets/Background 1.png")
alien1=loadImage("enemy3.png")
alien2=loadImage("enemy2.png")
 alien3=loadImage("enemy4.png")
//  alienl2=loadImage("assets/alien_l2.png")
playerimg=loadImage("assets/enemy2.png")
dustimage=loadImage("Bullet laser.png")
level2img=loadImage("assets/snow 2.jpg")
gamemusic=loadSound("soundsparsh-main/bgMusic.mp3")
hitmusic=loadSound("Bonus.mp3")
loosehealthmusic=loadSound("soundsparsh-main/game over.wav")
}

function setup() {
   

   createCanvas(windowWidth, windowHeight)

   player = createSprite(100, height - 100)
   player.addImage(playerimg)
   player.scale=0.35
   player.visible = false


   playButton = createImg("assets/play.png")
   playButton.position(width/3.5,height-height/2);
   playButton.size(300,300);



   aboutButton = createImg("assets/about.png")
   aboutButton.position(playButton.x+250,playButton.y);
   aboutButton.size(350,350);

   playButton.hide()
   aboutButton.hide()
 enemyGroup=new Group()
 dustGroup=new Group()


 player.setCollider("rectangle", 0, 0, player.width / 2, player.height / 2+55)


 invisibleGround = createSprite(width / 2, height- 80, width, 20)
 invisibleGround.visible = false



}


function draw() {
   player.collide(invisibleGround)
   if (gameState == "wait") {
      background(splashScreen)
      playButton.show()
      aboutButton.show()

      if (!gamemusic.isPlaying()) {
         gamemusic.play()
         // gamemusic.rate(0.5)
         gamemusic.setVolume(0.5)
     }

   }


   playButton.mousePressed(() => {
      gameState = "level1"
      playButton.hide()
      aboutButton.hide()
   })



   aboutButton.mousePressed(() => {
      aboutGame()
      playButton.hide()
      aboutButton.hide()
   })


   if (gameState == "level1") {
      background(level1img)
      spawnEnemies()
      playermovement()
      player.visible = true
      healthBar(180,50,playerhealth,playermaxHealth,"green")
      healthBar(width-200,50,alienhealth,alienmaxHealth,"yellow")


if(player.isTouching(enemyGroup)){
   playerhealth -=10
   loosehealthmusic.play()
   enemyGroup.destroyEach()
}

if(enemyGroup.isTouching(dustGroup)){
   alienhealth -=25
   hitmusic.play()
   enemyGroup.destroyEach()
   dustGroup.destroyEach()
}


if(playerhealth >=150 && alienhealth <=200){
enemyGroup.destroyEach()
dustGroup.destroyEach()
levelup()
player.y=height-height/4

}

   }



   if (gameState == "level2") {
background(level2img)
spawnEnemies2()
playermovement()
player.visible = true
healthBar(180,50,playerhealth2,playermaxHealth2,"green")
healthBar(width-200,50,alienhealth2,alienmaxHealth2,"yellow")


if(player.isTouching(enemyGroup)){
   playerhealth2 -=10
   loosehealthmusic.play()
   enemyGroup.destroyEach()
}

if(enemyGroup.isTouching(dustGroup)){
   alienhealth2 -=25
   hitmusic.play()
   enemyGroup.destroyEach()
   dustGroup.destroyEach()
}

if(playerhealth >=150 && alienhealth2 <=200){
   enemyGroup.destroyEach()
   dustGroup.destroyEach()
   
   win()
   
   }

}


   drawSprites()

if(gameState=="level1"){
   textSize(50)
    fill("yellow")
    stroke("red")
    strokeWeight(8)
    text("LEVEL 1",width/2.25,60)
}

if(gameState=="level2"){
   textSize(50)
    fill("yellow")
    stroke("red")
    strokeWeight(8)
    text("LEVEL 2",width/2.25,60)
}
}

function healthBar(x,y,h,mx,clr){

   noFill()
   stroke("black")
   strokeWeight(2)
   ellipse(x,y,mx,20)
   fill(clr)
     ellipse(x,y,h,20)
}


function aboutGame() {
   swal({
      title: "Lets PLAY",
      text: "Save yourself from the enemies & reach your SPACESHIP",
      textAlign: "center",
      imageUrl: "assets/enemy2.png",
      imageSize: "200x200",
      confirmButtonText: "Lets Play",
      confirmButtonColor: "black"
   },
      function () {
         gameState = "wait"
      }
   )


}

function levelup() {
   swal({
      title: "LEVEL CLEARED",
      text: "Hey You destroyed the Aliens But \n There are more",
      textAlign: "center",
      imageUrl: "assets/enemy2.png",
      imageSize: "200x200",
      confirmButtonText: "Level 2",
      confirmButtonColor: "black"
   },
   function (isConfirm) { if (isConfirm) {
      gameState="level2"
   }}
   
   )
}

function spawnEnemies(){
   if(frameCount%150==0){
   randy=Math.round(random(50,height-100))
   enemy=createSprite(width-100,height-200 )
   enemy.velocityX=-4
   // enemy.debug=true

randimage=Math.round(random(1,3))

switch(randimage){

case 1: enemy.addImage(alien1)
enemy.scale=1
break;

case 2: enemy.addImage(alien2)
enemy.scale=1

break;

case 3: enemy.addImage(alien3)
enemy.scale=0.5
enemy.y=height-200
enemy.setCollider("rectangle",0,0,enemy.width/2,enemy.height/2)
break;

default:break;
}
enemyGroup.add(enemy)
}
}




function spawnEnemies2(){
   if(frameCount%90==0){
   randy=Math.round(random(50,height-100))
   enemy=createSprite(width-100,height-200 )
   enemy.velocityX=-15
   // enemy.debug=true

randimage=Math.round(random(1,3))

switch(randimage){

   case 1: enemy.addImage(alien1)
   enemy.scale=1
   break;
   
   case 2: enemy.addImage(alien2)
   enemy.scale=1
   
   break;
   
   case 3: enemy.addImage(alien3)
   enemy.scale=0.5
   enemy.y=height-200
   enemy.setCollider("rectangle",0,0,enemy.width/2,enemy.height/2)
   break;


default:break;
}
enemyGroup.add(enemy)
}
}


function playermovement() {

   if (keyDown("RIGHT_ARROW")) {
       player.x += 5
   }

   if (keyDown("LEFT_ARROW")) {
       player.x -= 5
   }
   if (keyDown("UP_ARROW")) {
      player.velocityY = -5
  }
  player.velocityY += 0.8


     if(keyDown("space")){
     shoot()
     }

  

}

function shoot() {
   if(frameCount%30==0){
     dust= createSprite(player.x,player.y)
     dust.addImage(dustimage)
     dust.depth=player.depth 
     dust.scale=1
     player.depth   +=1
   dust.velocityX += 7
   dustGroup.add(dust)
   }
   
   }

   function win() {
      swal(
        {
          title: `YOU WON !!!`,
          text: "Thanks for playing!!",
          imageUrl:"assets/enemy2.png",
          imageSize: "150x150",
          confirmButtonText: "Play Again"
        },
        function (isConfirm) {
          if (isConfirm) {
            location.reload();
          }
        }
      );
    }
  