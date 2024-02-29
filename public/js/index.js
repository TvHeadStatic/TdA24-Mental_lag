var server_url = "http://4e6843e4cd0e2b27.app.tourdeapp.cz/"
// var server_url = "http://localhost:3000/"

function nav_bar_expand() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}