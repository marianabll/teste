var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["686eabaf-c93e-4e51-8353-49f6e7d42305","2ea559cb-36da-4bae-a0a4-f59508762540","f5f51e5b-d5e6-4462-a057-4683b15404dc","4ed6b00e-a27b-468d-bd0b-cc3f2e943895","1da25e42-6a28-42cf-881f-9ced66587d60"],"propsByKey":{"686eabaf-c93e-4e51-8353-49f6e7d42305":{"name":"player","sourceUrl":"assets/v3/animations/ZbLA0dnxMii_n_NGXsYhRtL7k15AD94-AATjT843Prk/686eabaf-c93e-4e51-8353-49f6e7d42305.png","frameSize":{"x":60,"y":91},"frameCount":1,"looping":true,"frameDelay":4,"version":"D8NfzlRUwLRec6QByRo06IZcVkUIe1U9","loadedFromSource":true,"saved":true,"sourceSize":{"x":60,"y":91},"rootRelativePath":"assets/v3/animations/ZbLA0dnxMii_n_NGXsYhRtL7k15AD94-AATjT843Prk/686eabaf-c93e-4e51-8353-49f6e7d42305.png"},"2ea559cb-36da-4bae-a0a4-f59508762540":{"name":"soccerBall","sourceUrl":"assets/v3/animations/ZbLA0dnxMii_n_NGXsYhRtL7k15AD94-AATjT843Prk/2ea559cb-36da-4bae-a0a4-f59508762540.png","frameSize":{"x":20,"y":20},"frameCount":1,"looping":true,"frameDelay":4,"version":"2VV.d.PEthJMteKGqnz_dqt8fKBA0c7S","loadedFromSource":true,"saved":true,"sourceSize":{"x":20,"y":20},"rootRelativePath":"assets/v3/animations/ZbLA0dnxMii_n_NGXsYhRtL7k15AD94-AATjT843Prk/2ea559cb-36da-4bae-a0a4-f59508762540.png"},"f5f51e5b-d5e6-4462-a057-4683b15404dc":{"name":"player_dive","sourceUrl":"assets/v3/animations/ZbLA0dnxMii_n_NGXsYhRtL7k15AD94-AATjT843Prk/f5f51e5b-d5e6-4462-a057-4683b15404dc.png","frameSize":{"x":92,"y":51},"frameCount":1,"looping":true,"frameDelay":4,"version":".UENdgYicA6dT_vPj0UooqNZcOhv15O3","loadedFromSource":true,"saved":true,"sourceSize":{"x":92,"y":51},"rootRelativePath":"assets/v3/animations/ZbLA0dnxMii_n_NGXsYhRtL7k15AD94-AATjT843Prk/f5f51e5b-d5e6-4462-a057-4683b15404dc.png"},"4ed6b00e-a27b-468d-bd0b-cc3f2e943895":{"name":"player_kick","sourceUrl":"assets/v3/animations/ZbLA0dnxMii_n_NGXsYhRtL7k15AD94-AATjT843Prk/4ed6b00e-a27b-468d-bd0b-cc3f2e943895.png","frameSize":{"x":77,"y":77},"frameCount":1,"looping":true,"frameDelay":4,"version":"PHY8X0bfLrLanWBLonnQEQ9yLpXebCyr","loadedFromSource":true,"saved":true,"sourceSize":{"x":77,"y":77},"rootRelativePath":"assets/v3/animations/ZbLA0dnxMii_n_NGXsYhRtL7k15AD94-AATjT843Prk/4ed6b00e-a27b-468d-bd0b-cc3f2e943895.png"},"1da25e42-6a28-42cf-881f-9ced66587d60":{"name":"robot","sourceUrl":"assets/v3/animations/ZbLA0dnxMii_n_NGXsYhRtL7k15AD94-AATjT843Prk/1da25e42-6a28-42cf-881f-9ced66587d60.png","frameSize":{"x":77,"y":69},"frameCount":1,"looping":true,"frameDelay":4,"version":"MqX.2y2vRpSqPH9X99FJHDvEhAAFGFzd","loadedFromSource":true,"saved":true,"sourceSize":{"x":77,"y":69},"rootRelativePath":"assets/v3/animations/ZbLA0dnxMii_n_NGXsYhRtL7k15AD94-AATjT843Prk/1da25e42-6a28-42cf-881f-9ced66587d60.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

 //configurar sprites das bordas
createEdgeSprites();

//criar um sprite de raquete do usuário
var userPaddle = createSprite(390,200,10,70);

//criar um sprite de raquete do computador
var computerPaddle = createSprite(10,200,10,70);

//criar a bola
var ball = createSprite(200,200,12,12);

var computerScore = 0;
var playerScore = 0;
var gameState = "serve";

function draw() {
  //preencher a tela do computador com a cor branca
  background("white");
  
  //exibe o placar
  text(computerScore,170,20);
  text(playerScore, 230,20);
  
  //desenha uma linha tracejada
  for (var i = 0; i < 400; i+=20) {
     line(200,i,200,i+10);
  }
  
  if (gameState === "serve") {
    text("Aperte espaço para sacar",150,180);
  } 
  
  if (gameState === "over") {
    text("Game Over!",170,160);
    text("Aperte R para recomeçar.",150,180);
  }
  
  if (keyDown("r")) {
    gameState = "serve";
    computerScore = 0;
    playerScore = 0;
  }
  
  
  //dá velocidade à bola quando o usuário pressiona play
  //atribua velocidades aleatórias mais tarde para se divertir
  if (keyDown("space") && gameState == "serve") {
    ball.velocityX = 5;
    ball.velocityY = 5;
    gameState = "play";
  }
  
  //faça a raquete do usuário se mover com o mouse
  userPaddle.y = World.mouseY;
  
  
  
  //faça a bola quicar na raquete do usuário
  if(ball.isTouching(userPaddle)){
    playSound("assets/hit.mp3");
    ball.x = ball.x - 5;
    ball.velocityX = -ball.velocityX;
  }
  
  //faça a bola quicar na raquete do computador
  if(ball.isTouching(computerPaddle)){
    playSound("assets/hit.mp3");
    ball.x = ball.x + 5;
    ball.velocityX = -ball.velocityX;
  }
  
  //coloque a bola de volta no centro se ela cruzar a tela
  if(ball.x > 400 || ball.x < 0){
    playSound("assets/score.mp3");
    
    if (ball.x < 0) {
      playerScore++;
    }
    else {
      computerScore++;
    }
      
    ball.x = 200;
    ball.y = 200;
    ball.velocityX = 0;
    ball.velocityY = 0;
    gameState = "serve";
    
    if (computerScore=== 5 || playerScore === 5){
      gameState = "over";
    }
  }
  
  //faça a bola quicar nas paredes superior e inferior
  if (ball.isTouching(topEdge) || ball.isTouching(bottomEdge)) {
    ball.bounceOff(topEdge);
    ball.bounceOff(bottomEdge);
    playSound("assets/wall_hit.mp3"); 
  }
  
  //adicione IA a raquete do computador para que sempre bata na bola
  computerPaddle.y = ball.y;
  drawSprites();
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
