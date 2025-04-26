let current = localStorage.getItem('current');
let list = document.getElementById('songList')
let playlist = [];
if(!current){
    alert('Please log in')
    window.location.href = '../login/login.html'
}

function addSongToPlaylist(songId) {
    let song = localStorage.getItem(songId);
    if (song) {
        playlist.push(JSON.parse(song));
        renderPlaylist();
    } else {
        alert('Song not found in local storage');
    }
}

function renderPlaylist() {
    list.innerHTML = '';
    playlist.forEach((song, index) => {
        let listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${song.title} by ${song.artist}`;
        list.appendChild(listItem);
    });
}