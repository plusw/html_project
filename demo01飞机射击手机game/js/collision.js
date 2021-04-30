function isCollision_playerBullet_and_ufo(){
    for(var j=0;j<ufo_number;j++){
        if(typeof ufo_array[j]!=='undefined'){
            for(var i=bullet_out_number;i<bullet_number;i++){
                if(bullet_that_hit_ufo.includes(i)===false){
                    var result=if_two_balls_collide(bullet_array[i].x+9,bullet_array[i].y+9,9,ufo_array[j].x+40.5,ufo_array[j].y+21,21);
                    if(result===true){
                        //animation(picture_explosion_array,6,bullet_array[i].x,bullet_array[i].y,1,1);
                        var animation_begin_position={x:ufo_array[j].x+40.5-24.5,y:ufo_array[j].y+21-22};
                        if(sound_open===true){
                            play_sound('explosion.wav');
                        }
                        animation_position.push(animation_begin_position);
                       
                        delete ufo_array[j];
                        delete_number+=1;
                        if(delete_number===ufo_number){
                            delete_number=0;
                            ufo_array=[];
                            level+=1;
                            select_level();
                        }
                        bullet_that_hit_ufo.push(i);
                        break;
                    }
                }
            }
        }
    }
}
function isCollision_player_and_ufo_bullet(){
     for(var i=0;i<ufo_bullet_array.length;i++){
         if(typeof ufo_bullet_array[i]!=='undefined'){
             var result=if_two_balls_collide(player1.x+player1.width/2,player1.y+player1.height/2,16,ufo_bullet_array[i].x+4,ufo_bullet_array[i].y+4,4);
             if(result===true){
                 delete ufo_bullet_array[i];
                 player_lives-=1;
            }
        }
    }
}
