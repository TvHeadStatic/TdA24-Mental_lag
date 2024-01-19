function shrineswap(){
    element= document.getElementById("shrine");
    if (element.src.match("/images/shrine/shrine.png")){
        element.src = "/images/shrine/shrine_open.png";
    } else {
        element.src = "images/shrine/shrine.png";
    }
    var audio = new Audio('images/shrine/royaltyfree.mp3')
    audio.play()
    audio.loop = true;
    audio.volume = 0.2;
}