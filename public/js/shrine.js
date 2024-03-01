let open = false
let audio = new Audio('images/shrine/royaltyfree.mp3')

function shrineswap(){
    element= document.getElementById("shrine");
    open = !open
    switch(open) {
        case true:
            element.src = "/images/shrine/shrine_open.png";
            audio.play()
            break
        default:
            element.src = "images/shrine/shrine.png";
            audio.pause()
            break
    }
    audio.volume = 0.1;
    audio.loop = true;
}