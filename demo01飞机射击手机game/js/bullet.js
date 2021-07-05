class bullet{
    constructor(playerX,playerY){
        this.x=playerX+player_width/2-bullet_picture_width/2;
        this.y=playerY;
    }
    draw_bullet(){
        var bullet_img=new Image();
        bullet_img.src='source/bullet.png';
        ctx.drawImage(bullet_img,this.x,this.y,bullet_picture_width,bullet_picture_height);
    }
    bullet_move(){
        this.y-=bullet_speed;
    }
} 
function set_new_bullet(){
    bullet_array[bullet_number]=new bullet(player1.x,player1.y);
    bullet_number++;
}

function valid_bullet(){
    for(var i=bullet_out_number;i<bullet_number;i++){
        if(bullet_that_hit_ufo.includes(i)===false){
            bullet_array[i].draw_bullet();
            bullet_array[i].bullet_move();
        }
    }
}
function bullet_out_of_screen(){
     for(var i=bullet_out_number;i<bullet_number;i++){   
         if(bullet_array[i].y+bullet_picture_height<0){
             delete bullet_array[bullet_out_number];
             bullet_out_number++;
         }
     }
}

class ufo_bullet{
    constructor(x,y,img_src,Vx,Vy){
        this.width=ufo_bullet_img_width;
        this.height=ufo_bullet_img_height;
        this.x=x+ufo_width/2-ufo_bullet_img_width/2;
        this.y=y+30;
        this.Vx=Vx;
        this.Vy=Vy;
        this.img=new Image();
        (this.img).src=img_src;
    }
    draw(){
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
    }
    move(){
        this.x+=this.Vx;
        this.y+=this.Vy;
    }
}
function set_ufo_bullet(){
    for(var i=have_set_ufo_bullet_number;i<ufo_bullet_begin_array.length;i++){
        ufo_bullet_array[i]=new ufo_bullet(ufo_bullet_begin_array[i].x,ufo_bullet_begin_array[i].y,ufo_bullet_begin_array[i].img,ufo_bullet_begin_array[i].Vx,ufo_bullet_begin_array[i].Vy);
        delete ufo_bullet_begin_array[i];
        have_set_ufo_bullet_number++;
    }
}
function all_ufo_bullet(){
    set_ufo_bullet();
    for(var i=0;i<ufo_bullet_array.length;i++){
        if(typeof  ufo_bullet_array[i]!== "undefined"){
            ufo_bullet_array[i].draw();
            ufo_bullet_array[i].move();
        }
    }
}
function ufo_bullet_out_of_screen(){
    for(var i=0;i<ufo_bullet_array.length;i++){
        if(typeof  ufo_bullet_array[i]!== "undefined"){
            if(ufo_bullet_array[i].y>canvas.height||ufo_bullet_array[i].x>canvas.width||ufo_bullet_array[i].x+ufo_bullet_img_width<0){
                delete ufo_bullet_array[i];
            }
        }
    }
}
