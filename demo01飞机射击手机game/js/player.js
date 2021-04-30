var player=function(){
    this.width=40;
    this.height=40;
    this.x=canvas.width/2;
    this.y=canvas.height-this.height-1;
    this.Vx=0;
    this.Vy=0;
    this.img=new Image();
    (this.img).src='source/player.png';
    this.draw=function(){
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
    };
    this.move=function(){
        this.change_v();
        this.x=this.x+this.Vx;
        this.y=this.y+this.Vy;
        if(judge_if_in_the_screen(this.x,this.y,this.width,this.height)==='outside'){
            this.x-=this.Vx;
            this.y-=this.Vy;
        }
    };
    this.change_v=function(){
        if(rightPressed===true){
            this.Vx=player_Vx;
        }
        else if(leftPressed===true){
            this.Vx=-player_Vx;
        }
        else{
            this.Vx=0;
        }
         if(upPressed===true){
            this.Vy=-player_Vy;
        }
        else if(downPressed===true){
            this.Vy=player_Vy;
        }
        else{
            this.Vy=0;
        }
        
    }
}
function handleStart(evt){
    const touches = evt.changedTouches;
    if(touches[0].pageX>canvas.width*2/3){
        rightPressed = true;
        leftPressed=false;
    }
    if(touches[0].pageX<canvas.width/3){
        leftPressed = true;
        rightPressed=false;
    }
    /*
    if(touches[0].pageX>canvas.width/3&&touches[0].pageX<canvas.width*2/3&&touches[0].pageY<canvas.height/2){
        upPressed=true;
        //upPressed=false;
    }
    if(touches[0].pageX>canvas.width/3&&touches[0].pageX<canvas.width*2/3&&touches[0].pageY>canvas.height/2){
        //downPressed=false;
        downPressed=true;
    }
     * 
     */
    
}
function handleEnd(evt){
    const touches = evt.changedTouches;
    if(touches[0].pageX>canvas.width*2/3){
        rightPressed = false;
    }
    if(touches[0].pageX< canvas.width/3){
        leftPressed = false;
    }
    /*
    if(touches[0].pageX>canvas.width/3&&touches[0].pageX<canvas.width*2/3&&touches[0].pageY<canvas.height/2){
        
        upPressed=false;
    }
    if(touches[0].pageX>canvas.width/3&&touches[0].pageX<canvas.width*2/3&&touches[0].pageY>canvas.height/2){
        downPressed=false;
    }
     * 
     */
}

function keyDownHandler(e) {
    if(e.key == "d"||e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "a" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if(e.key=='w'||e.key=='ArrowUp'){
        upPressed=true;
    }
    else if(e.key=='s'||e.key=='ArrowDown'){
        downPressed=true;
    }
     
}


function keyUpHandler(e) {
    if(e.key == "d" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "a" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    else if(e.key=='w'||e.key=='ArrowUp'){
        upPressed=false;
    }
    else if(e.key=='s'||e.key=='ArrowDown'){
        downPressed=false;
    }
}

