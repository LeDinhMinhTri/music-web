let btn =  document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');
let progress = document.getElementById('progress');
let song = document.getElementById('song');
let playbtn = document.getElementById('playbtn');

btn.onclick = function(){
    sidebar.classList.toggle('active');
}

song.onloadedmetadata = function(){
    progress.max = song.duration;
    progress.value = song.currentTime;
}



function playPause(){
    if(playbtn.classList.contains('bx-pause')){
        song.pause();
        playbtn.classList.remove('bx-pause')
        playbtn.classList.add('bx-play')
    }
    else{
        song.play();
        playbtn.classList.add('bx-pause')
        playbtn.classList.remove('bx-play')
    }
}
if(song.play()){
    setInterval(()=>{
        progress.value = song.currentTime;
    },900);
}
progress.onchange = function(){
    song.play();
    song.currentTime = progress.value;
    playbtn.classList.add('bx-pause');
    playbtn.classList.remove('bx-play');
}