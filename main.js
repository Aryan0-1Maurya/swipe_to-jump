/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/


let isJumped = false;
let isGrounded = true;
let game_over = true;
let dom_show = false;
let ground = 60;
let speed = - 0.001;
let land_img;
let gap = 50;
let h,w;
let bg;
let scores = 0;

// Player

let PLAYER_MASS = 3;
let FORCE = 8;
let ACCELERATION = 4.5;
let GRAVITY = 0.6;
let PLAYER_HEIGHT = 55;
let PLAYER_WIDTH = 35;
let player_gap;
let player_images = [];
let walking_speed = 0.25;

// Enemy 

let enemies = [];
let ENEMY_HEIGHT = 50;
let ENEMY_WIDTH = 35;
let VELOCITY = -5;
let enemy_num = 3;
let enemy_images = [];
let enemy_gap;


// Lands

let lands = [];
let LAND_HEIGHT = ground;
let LAND_WIDTH = window.innerWidth * 2;
let land_vel = -3;
let land_number = 1;


// Points


let points = [];
let point_taken = false;
let POINT_HEIGHT = 18;
let POINT_WIDTH = 18;
let point_num = 10;
let point_vel = VELOCITY;
let point_img;


// Setup


function setup(){

    h = window.innerHeight;
    w = window.innerWidth;
    //player_gap = h - (ground + (PLAYER_HEIGHT - gap));
    player_gap = h - (ground + gap);
    //enemy_gap = h - (ground + (ENEMY_HEIGHT - gap));
    enemy_gap = h - (ground + gap);
    //console.log(LAND_WIDTH);
    createCanvas(w, h);
    
    
    // Dom
    
    
    if (dom_show == true){
        point_div.style.display = 'flex';
        load.style.display = 'none';
    }
    
    // Player
    
    player = new Player(50, player_gap, PLAYER_WIDTH, PLAYER_HEIGHT);
    
    // Enemy
    
    for ( a = 0; a < enemy_num; a++){
        enemies[a] = new Enemy( w + random(40, 140), enemy_gap, ENEMY_WIDTH, ENEMY_HEIGHT, VELOCITY);
    }
    
    
    // Lands
    
    lands = [
        new Land(0, h - ground, LAND_WIDTH, LAND_HEIGHT, VELOCITY),
        /*new Land(w + 50, h - ground, LAND_WIDTH, LAND_HEIGHT)*/
    ];
    
    // Points
    
    for (c = 0; c < point_num; c++){
        points[c] = new Point( random(w, w * 2), random((w / 2) + 20, h - (ground + ENEMY_HEIGHT)), POINT_WIDTH, POINT_HEIGHT);
    }
    
    
    // Game over
    
    if (game_over == true){
        speed = 0;
    }
    
}

function draw(){
    background(240);
    
    image(bg, 0 - 50, 0, w + 50, h - 10);
    
    //fill(255);
    
    for (b = 0; b < lands.length; b++){
        lands[b].print();
        lands[b].go();
    }
    
    for (c = 0; c < points.length; c++){
        points[c].print();
        points[c].go();
        points[c].collidedWithPoint(player);
        //points[c].get_point();
    }
    
    // Enemy 
    
    for (a = 0; a < enemies.length; a++){
        enemies[a].print();
        enemies[a].go();
        player.collidedWith(enemies[a]);
    }
    
    
    
    // Player
    
    player.print();
    player.go();
    player.handle();
    
    // Game over
    
    if (game_over == true){
        
    }
    
    restart.addEventListener('click', e => {
        restart.style.display = 'none';
        game_over = false;
        scores = 0;
        score.innerText = scores;
        for (i = 0; i < enemies.length; i++){
            enemies[i].x = w;
            enemies[i].velocity = -5;
        }
        for (j = 0; j < points.length; j++){
            points[j].x = random((w / 2) + 20, h - (ground + ENEMY_HEIGHT));
        }
        for (k = 0; k < lands.length; k++){
            lands[k].vel = -5;
        }
        speed = - 0.001;
        isGrounded = true;
    });
    
    splash.addEventListener('click', e => {
        splash.style.display = 'none';
        game_over = false;
    });
    
    
    
    
}


// Player Builder

class Player{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = player_images;
        this.mass = PLAYER_MASS;
        this.gravity = GRAVITY;
        this.force = FORCE;
        this.acceleration = ACCELERATION;
        this.walking_speed = walking_speed;
        this.index = 0;
    }
    
    print(){
        
        image(this.img[floor(this.index) % this.img.length], this.x,this.y, this.w, this.h);
        if (isGrounded == true){
            if (game_over == false)
            {
                if (isJumped == false){
                    this.index += this.walking_speed;
                }
                
            }
            else
            {
                this.index = 2;
            }
            
        }
        
    }
    
    go(){
        
        
    
        if (isJumped == true){
            this.mass += this.gravity;
            this.y += this.mass;
        }
    
        if (this.y > player_gap){
            isJumped = false;
            isGrounded = true;
            this.y = player_gap;
        }
        
    }
    
    
  /* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/  
    // Collision with enemy 
    
    
    collidedWith(op){
            let w1 = this.x + this.w;
            let w2 = (op.x + op.w) - 20;
            let h1 = this.y + this.h;
            let h2 = op.y + op.h;
            
            if (w1 < w2 && w1 > op.x + 20 && h1 < h2 && h1 > op.y){
                
                    collided();
                    
                
            }
            if (w1 > w2 && w2 > this.x && h1 < h2 && h1 > op.y){
                    collided();
                    
                
            }
            if (w1 > w2 && w2 > this.x && h1 > h2 && h2 > this.y){
                    collided();
                    
                
            }
            if (w1 < w2 && w1 > op.x + 20 && h2 < h1 && h2 > this.y){
                    collided();
                    
                
                
            }
            
        }
    
    
    // collsion With point
    
    
    
    
    
    
    handle(){
        let c = document.querySelector('canvas');
        c.addEventListener('touchstart', e => {
            // 
            
            
            
            
            
            
            isJumped = true;
            if (this.y < w / 2 + 130){
                this.force = 0;
                isGrounded = false;
            }
            else
            {
                
                
                this.force = FORCE;
                this.force += this.acceleration;
                if (isGrounded == true){
                    if (game_over == false){
                        this.mass = -this.force;
                    }
                    
                }
                //isGrounded = false;
            }
        });
        
        
        
        /*c.addEventListener('touchend', e => {
            if (isGrounded == true){
                isGrounded = false;
            }
            
        });*/
    }
}


// Enemy Builder

class Enemy{
    constructor(x, y, w, h, vel){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.velocity = vel;
        this.img = enemy_images;
        this.index = 0;
    }
    
    print(){
        image(this.img[this.index], this.x,this.y, this.w, this.h);
        
    }
    
    go(){
        if (this.x > - this.w){
            if (game_over == false){
                this.velocity += speed;
                this.x += this.velocity;
            }
            
        }
        else
        {
            this.x = w + this.w;
            this.x = w + random(w / 2, w * 3);
            this.index = floor(random(0, this.img.length));
            //this.x = random(0, w);
            
        }
    }
        
}



// Land Builder

class Land{
    constructor(x, y, w, h, vel){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.land_img = land_img;
        this.vel = vel;
    }
    
    print(){
        image(this.land_img, this.x, this.y, this.w, this.h);
    }
    
    go(){
        if (this.x > - this.w / 2){
            if (game_over == false){
                this.vel += speed;
                this.x += this.vel;
            }
            
        }
        else
        {
            this.x = - w / 2;
            //this.x = w;
            //this.y = random(h / 2 , h - BOTTOM);
        }
    }
}


// Point



class Point{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.point_vel = point_vel;
        this.point_img = point_img;
    }
    
    print(){
        image(this.point_img, this.x, this.y, this.w, this.h);
    }
    
    go(){
        if (this.x > - this.w){
            if (game_over == false){
                this.x += this.point_vel;
            }
            
        }
        else
        {
            this.x = w;
            this.print = function (){
                image(this.point_img, this.x, this.y, this.w, this.h);
            }
            this.y = random((w / 2) + 20, h - (ground + ENEMY_HEIGHT));
        }
        
        
        
    }
    
    
    // coin collision
    
    
    collidedWithPoint(op){
            let w1 = this.x + this.w;
            let w2 = op.x + op.w;
            let h1 = this.y + this.h;
            let h2 = op.y + op.h;
            
            if (w1 < w2 && w1 > op.x && h1 < h2 && h1 > op.y){
                
                    this.print = function(){}
                    point_taken = true;
                    this.get_point();
                
            }
            else
            {
                point_taken = false;
            }
            if (w1 > w2 && w2 > this.x && h1 < h2 && h1 > op.y){
                    this.print = function(){}
                    point_taken = true;
                    this.get_point();
            }
            else
            {
                point_taken = false;
            }
            if (w1 > w2 && w2 > this.x && h1 > h2 && h2 > this.y){
                    this.print = function(){}
                    point_taken = true;
                    this.get_point();
            }
            else
            {
                point_taken = false;
            }
            if (w1 < w2 && w1 > op.x && h2 < h1 && h2 > this.y){
                    this.print = function(){}
                    point_taken = true;
                    this.get_point();
                
            }
            else
            {
                point_taken = false;
            }
            
        }
    get_point(){
            if (game_over == false){
                scores++;
            }
            
            score.innerText = scores;
            if (scores > 10){
            VELOCITY += -1;
        }
        
    }

    
}



// Game over


function collided(){
    //console.log("Game over!");
    game_over = true;
    restart.style.display = 'inline';
}







// Preload Images


function preload(){
    
    bg = loadImage('https://i.imgur.com/vH8Z10Xh.jpg');
    
    land_img = loadImage('https://i.imgur.com/h03Te4f.jpg');
    player_images[0] = loadImage('https://i.imgur.com/zCXCGBm.jpg');
    player_images[1] = loadImage('https://i.imgur.com/DCzLIQc.jpg');
    player_images[2] = loadImage('https://i.imgur.com/m7m19va.png');
    player_images[3] = loadImage('https://i.imgur.com/a3fQyRW.jpg');
    player_images[4] = loadImage('https://i.imgur.com/nYoYe9e.jpg');
    player_images[5] = loadImage('https://i.imgur.com/8ADaYGr.jpg');
    
    
    enemy_images[0] = loadImage('https://i.imgur.com/9Coxu68.jpg');
    enemy_images[1] = loadImage('https://i.imgur.com/lT0PA01.jpg');
    
    point_img = loadImage('https://i.imgur.com/QEWIhUM.png');
    
    dom_show = true;
}




/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/
