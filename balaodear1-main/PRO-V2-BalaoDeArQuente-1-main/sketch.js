var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop, obsTop1, obsTop2
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3
var restart
var restartImg
var fimDeJogo
var fimDeJogoImg
var gameState = 'play'
var jump
var die
var bgImg2
var score = 0
function preload(){
bgImg = loadImage('assets/bg.png')
balloonImg = loadAnimation('assets/balloon1.png','assets/balloon2.png','assets/balloon3.png')
obsTop1 = loadImage('assets/obsTop1.png')
obsTop2 = loadImage('assets/obsTop2.png')
obsBottom1 = loadImage('assets/obsBottom1.png')
obsBottom2 = loadImage('assets/obsBottom2.png')
obsBottom3 = loadImage('assets/obsBottom3.png')
restartImg = loadImage('assets/restart.png')
fimDeJogoImg = loadImage('assets/fimdejogo.png')
jump = loadSound ('assets/jump.mp3')
die = loadSound ('assets/die.mp3')
bgImg2 = loadImage('assets/bg2.jpg')
}

function setup(){
bg = createSprite(165,485)

balloon = createSprite(50,200)
balloon.addAnimation('baloon',balloonImg)
balloon.scale = 0.2
balloon.setCollider("rectangle",0,0,balloon.width,balloon.height);
balloon. debug = false
//imagem de plano de fundo

topObstaclesGroup = createGroup()
bottomObstacleGroup = createGroup()
barraGroup = createGroup()
//criando canto superior e inferior
tirosGroup = createGroup()


      
//criando o balão     
restart = createSprite(220,240)
restart.addImage('restartImage',restartImg)
restart.scale = 0.5
restart.visible = false
fimDeJogo = createSprite(220,200)
fimDeJogo.addImage('fimdejogoimage',fimDeJogoImg)
fimDeJogo.scale = 0.5
fimDeJogo.visible = false
getBackgroundImg()
}

function draw() {
  
  background("black");
 
  if(gameState === 'play'){ 
          //fazendo o balão de ar quente pular
          

          //adicionando gravidade
          if(keyDown("space")&& balloon.y ) {
            balloon.velocityY = -8;
            //jump.play();
        }
        balloon.velocityY = balloon.velocityY + 0.8
        
        if(balloon.isTouching(barraGroup)){
                score = score+1
        }
        
        tirosGroup.overlap(topObstaclesGroup, function(collector, collected) {
                
                //o sprite é coletado no grupo de colecionáveis que desencadeou
                //o evento
                collector.remove()
                collected.remove();
                score = score + 1000
              });

              tirosGroup.overlap(bottomObstacleGroup, function(collector, collected) {
                
                //o sprite é coletado no grupo de colecionáveis que desencadeou
                //o evento
                collector.remove()
                collected.remove();
                score = score + 1000
              });

        if(balloon.position.y <= 10 || balloon.position.y >= 400){

 gameState = 'end'
        }
        if(topObstaclesGroup.isTouching(balloon)|| bottomObstacleGroup.isTouching(balloon)){
                //trex.velocityY = -12;
                die.play();
                gameState = 'end';
                balloon.position.y = 200
            }
            
        spawnObstacles() 
        barra()   
 }else if (gameState === 'end'){
        balloon.velocityY = 0
        balloon.velocityX = 0
        restart.visible = true
        fimDeJogo.visible = true
        topObstaclesGroup.setVelocityXEach(0);
        bottomObstacleGroup.setVelocityXEach(0);
        topObstaclesGroup.setLifetimeEach(-1);
        bottomObstacleGroup.setLifetimeEach(-1);
        if(mousePressedOver(restart)) {
    
  
                reset();
              }
 }
      
 drawSprites();
 textFont("Algerian")
 textSize (30)
 fill ('red')
 text("score:"+ score,10,30)
}
function spawnObstacles(){
        if (frameCount % 60 === 0){
          var topObstacle = createSprite(400,50,10,40);
          topObstacle.y = Math.round(random(15,100));
          topObstacle.velocityX = -(6);
          
           //gerar obstáculos aleatórios
           var rand = Math.round(random(1,2));
           switch(rand) {
             case 1: topObstacle.addImage(obsTop1);
                     break;
             case 2: topObstacle.addImage(obsTop2);
                     break;
             
             default: break;
           }
           topObstacle.depth = balloon.depth;
                 balloon.depth = balloon.depth + 1;
           //atribuir dimensão e tempo de vida ao obstáculo           
           topObstacle.scale = 0.1;
           topObstacle.lifetime = 66.6;
          
          //acrescentar cada obstáculo ao grupo
           topObstaclesGroup.add(topObstacle);
        }
        if (frameCount % 60 === 0){
                var bottomObstacle = createSprite(400,350,10,40);
                
                bottomObstacle.velocityX = -(6);
                
                 //gerar obstáculos aleatórios
                 var rand = Math.round(random(1,3));
                 switch(rand) {
                   case 1: bottomObstacle.addImage(obsBottom1);
                           break;
                   case 2: bottomObstacle.addImage(obsBottom2);
                           break;
                   case 3: bottomObstacle.addImage(obsBottom3);
                           break;
                   default: break;
                   
                 }
                 bottomObstacle.depth = balloon.depth;
                 balloon.depth = balloon.depth + 1;
                 //atribuir dimensão e tempo de vida ao obstáculo           
                 bottomObstacle.scale = 0.07;
                 bottomObstacle.lifetime = 66.6;
                
                //acrescentar cada obstáculo ao grupo
                bottomObstacleGroup.add(bottomObstacle);
              }
       }

       function barra(){
        if (frameCount % 60 === 0){
              bar = createSprite(400,200,10,800)
              bar.velocityX = -6
              bar.depth = balloon.depth
              bar.lifetime = 66.6
              bar.visible = false
              barraGroup.add(bar)
        }
       }

       function reset(){
        gameState = 'play' 
        topObstaclesGroup.destroyEach();
        bottomObstacleGroup.destroyEach();
       fimDeJogo.visible = false
       restart.visible = false
       balloon.position.y = 200
       }

       async function getBackgroundImg(){
         var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
          var responseJSON = await response.json(); var datetime = responseJSON.datetime;
           var hour = datetime.slice(11,13); 
           if(hour>=06 && hour<=19){
                bg.addImage("bgImage",bgImg2)
                bg.x=200
          bg.y=200
                bg.scale=1.5}
       else{
         bg.addImage(bgImg);
          bg.scale = 1.3
         } 
}
function mousePressed(){
     tiro = createSprite(50,balloon.position.y,20,10)
tiro.velocityX = 20
tirosGroup.add(tiro)
  
}