function select_level(){
    switch(level) {
        case 0:
            ufo_number=1;
            function set_ufo(){
                for(var i=0;i<ufo_number;i++){
                    ufo_array[i]=new ufo(i,100,50,ufo_width,ufo_height,'source/ufo.png','source/ufo_bullet.png');
                }
            }
            set_ufo();
            break;
            
        case 1:
            ufo_number=5;
            function set_ufo2(){
                for(var i=0;i<ufo_number;i++){
                    ufo_array[i]=new space_ship(i,100,50,spaceship_width,spaceship_height,'source/spaceShip.png','source/ufo_bullet.png');
                }
            }
            set_ufo2();
            break;
       
    }
} 