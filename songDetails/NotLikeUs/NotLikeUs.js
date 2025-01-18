let us = localStorage.getItem("current")
let playlist = []
let add = document.getElementById('plus')
add.addEventListener('click',() =>{
    if(!us){
        alert("You haven't log in or sign up")
        window.location.href = '../../signup/signup.html'
    }else{
        if(localStorage.getItem('playlist')){
            playlist = JSON.parse(localStorage.getItem('playlist'))
            for (let i = 0;i < playlist.length; i++){
                if (playlist[i] == "Not like us"){
                    alert('Song already added');
                    return;
                }
            }
        }
        playlist.push("Not like us")
        alert('Song added')
        localStorage.setItem('playlist', JSON.stringify(playlist));

}})