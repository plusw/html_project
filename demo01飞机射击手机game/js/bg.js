function draw_lives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+player_lives, 8, 20);
}
function draw_bg(){
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
}