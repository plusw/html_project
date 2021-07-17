class animation{
    constructor(picture_array,interval_time,x,y){
        this.picture_array=picture_array;
        this.interval_time=interval_time;
        this.x=x;
        this.y=y;
        this.output_picture_id=0;
        this.animation_time=0;
        this.img=new Image();
    }
    processing(){
        (this.img).src=this.picture_array[this.output_picture_id];
        ctx.drawImage(this.img, this.x,this.y,(this.img).width/2,(this.img).height/2); 
        this.animation_time++; 
        if(this.animation_time>this.interval_time){
            this.animation_time=0;
            this.output_picture_id++;
            if(this.output_picture_id===this.picture_array.length){
                this.output_picture_id=0;
                 return 'over';
            }
            else {
                return 'not_over';
            }
        }
    }
}
function set_animation(){
    for(var i=have_set_animation;i<animation_position.length;i++){
        animation_array[i]=new animation(picture_explosion_array,4,animation_position[i].x,animation_position[i].y);
        have_set_animation++;
    }
}
function start_animation(){
    for(var i=0;i<have_set_animation;i++){
        if(typeof animation_array[i]!=='undefined'){
            if(animation_array[i].processing()==='over'){
                delete animation_position[i];
                delete animation_array[i];
            }
        }
    }
}
function all_animation(){
    set_animation();
    start_animation();
}
