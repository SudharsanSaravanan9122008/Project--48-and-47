class Bullet{
    constructor(x, y, bulletSize_x, bulletSize_y, bulletColor, bullet_lifetime, explosion_animation, explosion_lifetime, velocity_of_bullet){
        this.explosion = createSprite(x, y);
        this.explosion.addAnimation("explosionAnimation", explosion_animation);
        this.explosion.scale = 0.2
        this.explosion.lifetime = explosion_lifetime;
        this.bullet = createSprite(x, y, bulletSize_x, bulletSize_y);
        this.bullet.shapeColor = bulletColor;
        this.bullet.velocityX = velocity_of_bullet
        this.bullet.lifetime = bullet_lifetime;
        
    }
}