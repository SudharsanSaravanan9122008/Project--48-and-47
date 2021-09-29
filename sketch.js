var bulletSpawnLocation_y = 840;
var zombieAnimation;
var playerAnimation, player;
var explosionAnimation;
var zombiesArray = [];
var bulletsArray = [];
var transparentBar;
var transparentImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var backgroundImg;

var speed = 2;

var score = 0;

var highScore = 0;

function preload(){
	zombieAnimation = loadAnimation("images/1.png", "images/2.png", "images/3.png","images/4.png", "images/4.png");
	playerAnimation = loadAnimation("images/player1.png", "images/player1.png", "images/player2.png","images/player2.png", "images/player1.png");
	backgroundImg = loadImage("images/Background.jpg");
	explosionAnimation = loadAnimation("images/explosion1.png", "images/explosion2.png", "images/explosion3.png", "images/explosion4.png");;
	transparentImage = loadImage("images/transparent.png");
	dead_zombieImg = loadImage("images/zombie_dead.png");
}

function setup(){
	createCanvas(1600, 1000);
	
	
	player = createSprite(100, 850);
	player.addAnimation("playerAnimation", playerAnimation);
	player.scale = 0.45;
	player.setCollider("rectangle", 0, 0, 200, 400);
	transparentBar = createSprite(500, 800);
	transparentBar.addImage(transparentImage);
	transparentBar.scale = 3
	player.debug = true;
	
}
function draw(){
	if(gameState === PLAY){
		background(backgroundImg);
	}else{
		background("Black");
	}
	playerController();
	spriteHandler();
	UI();
	if(document.cookie < score){
		document.cookie = score;
	}
}

function spawnZombies(){
	if(gameState === PLAY){
		var zombie = createSprite(1700, Math.round(random(800, 950)));
		zombie.scale = 0.4;
		zombie.addAnimation("zombieAnimation", zombieAnimation);
		zombie.velocityX = -2
		zombie.lifetime = 1050;
		zombiesArray.push(zombie);
		
	}
		
}

function playerController(){
	if(gameState === PLAY){
		if(keyCode === 32){
			shoot();
			keyCode = 0
		}
		if(keyDown("w") && player.y > 800){
			player.y-=speed;
			bulletSpawnLocation_y-=speed;
		}else if(keyDown("s") && player.y < 950){
			player.y+=speed;
			bulletSpawnLocation_y+=speed;

		}
	}

}
function shoot(){
	if(gameState === PLAY){
		var bullet = new Bullet(185, bulletSpawnLocation_y, 3, 1, "yellow", 450, explosionAnimation, 10, 35);
		bulletsArray.push(bullet);
	}

}

function spriteHandler(){
	if(frameCount % 80 === 0){
		spawnZombies();
	}
	for(var i = 0; i < bulletsArray.length; i++){
		for(var j = 0; j < zombiesArray.length; j++){
			if(zombiesArray[j].isTouching(bulletsArray[i].bullet)){
				zombiesArray[j].destroy();
				bulletsArray[i].bullet.destroy();
				x = zombiesArray[j].x;
				y = zombiesArray[j].y;
				dead_zombie_sprite = createSprite(x, y);
				dead_zombie_sprite.addImage(dead_zombieImg);
				dead_zombie_sprite.lifetime = 10;
				dead_zombie_sprite.scale = 0.5		
				score += 20;		
			}
		}
	}
	for(var i = 0; i<zombiesArray.length;i++){
		if(zombiesArray[i].isTouching(transparentBar)){
			AI_Movement_forZombies(zombiesArray[i], player.y, 2);
		}
		if(zombiesArray[i].isTouching(player)){
			gameState = END;
		}
	}
	drawSprites();
}
function UI(){
	textSize(20);
	fill("white");
	text("Score :"+score, 10, 30)
	text("HighScore :"+document.cookie, 10, 55)
}
function AI_Movement_forZombies(zombie, player_y, speed_of_changing_position_y){
if(gameState === PLAY){
	if(zombie.y > player_y){
		zombie.y-=1
	}else if(zombie.y < player_y){
		zombie.y+=Math.round(random(0, 1))
	}
}

}