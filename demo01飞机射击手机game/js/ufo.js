class ufo{
    constructor(id,ufo_x,ufo_y,ufo_width,ufo_height,img,bullet_img){
        this.ufo_img=new Image();
        this.id=id;
        this.x=ufo_x;
        this.y=ufo_y;
        this.width=ufo_width;
        this.height=ufo_height;
        this.Vx=0;
        this.Vy=0;
        this.a_x=0;
        this.a_y=0;
        this.image=img;
        this.bullet_img=bullet_img;
        this.ufoLastChangeDirectionTime=0;
        this.ufoMoveTowarADeirectionTime=50;
        this.last_fire_time=0;
        this.fire_intervals_time=1000;
    }
    draw_ufo(){
        this.ufo_img.src=this.image;
        ctx.drawImage(this.ufo_img,this.x,this.y,this.width,this.height);
    }
    move(){
        this.x+=this.Vx;
        this.y+=this.Vy;
        /*if(judge_if_in_the_screen(this.x,this.y,this.width,this.height)==='outside'){
            this.x-=this.Vx;
            this.y-=this.Vy;
        }
         * 
         */
       if(this.x+this.width>canvas.width||this.x<0){
            this.x-=this.Vx;
            this.Vx=-this.Vx;
            
       }
       if(this.y<0||this.y+this.height>canvas.height){
           this.y-=this.Vy;
           this.Vy=-this.Vy;
       }
        
        if(game_time-this.ufoLastChangeDirectionTime>this.ufoMoveTowarADeirectionTime){          
            this.ufoMoveTowarADeirectionTime=getRndInteger(500,2000);
            this.ufoLastChangeDirectionTime=game_time;
            this.Vx=getRndInteger(-3, 3);;
            this.Vy=getRndInteger(-3,3);
        }
        if(this.Vx>5){
            this.Vx=5;
        }
        else if(this.Vy>5)
        {
            this.Vy=5;
        }
    }
    fire(){
        if(judge_if_in_the_screen(this.x,this.y,ufo_width,ufo_height)==='inside'){
            if(game_time-this.last_fire_time>this.fire_intervals_time){
                this.fire_intervals_time=getRndInteger(3000,5000);
                this.last_fire_time=game_time;
                var ufo_bullet={x:this.x,y:this.y,img:this.bullet_img,Vx:calculate_bullet_trajectory(this.x,this.y,player1.x,player1.y,ufo_bullet_speed).Vx,Vy:calculate_bullet_trajectory(this.x,this.y,player1.x,player1.y,ufo_bullet_speed).Vy};
                ufo_bullet_begin_array.push(ufo_bullet);
            }
        }
    }
    out_of_screen(){
        if(this.x+ufo_width<-300||this.x>canvas.width+300||this.y>canvas.height){
            delete this;
        }
    }
}
class space_ship{
    constructor(id,ufo_x,ufo_y,ufo_width,ufo_height,img_src,bullet_img){
        this.img=new Image();
        this.img.src=img_src;
        this.id=id;
        this.x=ufo_x;
        this.y=ufo_y;
        this.width=ufo_width;
        this.height=ufo_height;
        this.Vx=getRndInteger(-1.5,1.5);
        this.Vy=getRndInteger(-1.5,1.5);
        this.bullet_img=bullet_img;
        this.ufoLastChangeDirectionTime=0;
        this.ufoMoveTowarADeirectionTime=50;
        this.last_fire_time=0;
        this.fire_intervals_time=1000;
        this.rolate_angle=0;
    }
    draw_ufo(){
        this.rolate_angle+=1;
        picture_rolate(this.img,this.x,this.y,this.width,this.height,this.rolate_angle);
    }
    move(){
        this.x+=this.Vx;
        this.y+=this.Vy;
        if(this.x+this.width>canvas.width||this.x<0){
            this.x-=this.Vx;
            this.Vx=-this.Vx;
            
       }
       if(this.y<0||this.y+this.height>canvas.height){
           this.y-=this.Vy;
           this.Vy=-this.Vy;
       }
    }
    fire(){
        if(game_time-this.last_fire_time>this.fire_intervals_time){
            this.fire_intervals_time=getRndInteger(3000,5000);
            this.last_fire_time=game_time;
            for(var i=0;i<20;i++){
                var ufo_bullet={x:this.x,y:this.y,img:this.bullet_img,Vx:Math.sin(i*3.14159/10)*2,Vy:Math.cos(i*3.14159/10)*2};
                ufo_bullet_begin_array.push(ufo_bullet);
            }
        }
    }
}
function all_ufo(){
     for(var i=0;i<ufo_number;i++){
        if(typeof ufo_array[i]!=='undefined'){
            ufo_array[i].draw_ufo();
            ufo_array[i].move();
            ufo_array[i].fire();
            //ufo_array[i].out_of_screen();
        }
    }
}