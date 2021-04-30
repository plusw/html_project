function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
function judge_if_in_the_screen(x,y,width,height){
    if(x>0&&x+width<canvas.width&&y+height<canvas.height&&y>0){
        return 'inside';
    }
    else{
        return 'outside';
    }
}
function if_two_balls_collide(a_x,a_y,a_r, b_x,b_y,b_r) {
    if((a_x-b_x)*(a_x-b_x)+(a_y-b_y)*(a_y-b_y)<=(a_r+b_r)*(a_r+b_r)){
        return true;
    }
    else{
        return false;
    }
}
function get_time(){
    var dt=new Date();
    var now_time=dt.getTime();
    return now_time;
}
function calculate_bullet_trajectory(a,b,x,y,speed){//a,b  fire begin
    var V_x=(x-a)*speed/Math.sqrt((a-x)*(a-x)+(b-y)*(b-y));
    var V_y=(y-b)*speed/Math.sqrt((a-x)*(a-x)+(b-y)*(b-y));
    var result={Vx:V_x,Vy:V_y};
    return result;
}
function picture_rolate(img,x,y,width,height,angle){
    ctx.beginPath();
    ctx.translate(x+width/2,y+height/2);
    ctx.rotate(angle * Math.PI / 180);
    ctx.drawImage(img,-width/2,-height/2,width,height);
    ctx.closePath();
    ctx.setTransform(1, 0, 0, 1, 0, 0); 
}