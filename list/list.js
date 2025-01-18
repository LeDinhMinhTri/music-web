let current = localStorage.getItem('current');
let list = document.getElementById('songList')
let playlist = [];
if(!current){
    alert('Please log in')
    window.location.href = '../login/login.html'
}
else{
    if(localStorage.getItem('playlist')){
        playlist = JSON.parse(localStorage.getItem('playlist'))
        for (let i = 0;i < playlist.length; i++){
            if (playlist[i] == "APT."){
                let song = document.createElement('li')
                let img = document.createElement('img')
                song.classList.add("abc")
                img.classList.add("cover")
                song.innerHTML = "APT."
                img.src = "https://i.pinimg.com/736x/7d/a3/ed/7da3ed3054dbc5397c5489680ede3fb3.jpg"
                song.appendChild(img)
                list.appendChild(song)
            }
            if (playlist[i] == "Die with a smile"){
                let song = document.createElement('li')
                let img = document.createElement('img')
                song.classList.add("abc")
                img.classList.add("cover")
                song.innerHTML = "Die with a smile"
                img.src = "https://i.pinimg.com/736x/80/10/3d/80103dcd20fb23f94c46b9433e5bfd26.jpg"
                song.appendChild(img)
                list.appendChild(song)
            }
            if (playlist[i] == "Like him"){
                let song = document.createElement('li')
                let img = document.createElement('img')
                song.classList.add("abc")
                img.classList.add("cover")
                song.innerHTML = "Like him"
                img.src = "https://i.pinimg.com/736x/48/e1/3c/48e13c48d41bd0461502639ea3dcfc1e.jpg"
                song.appendChild(img)
                list.appendChild(song)
            }
            if (playlist[i] == "Espresso"){
                let song = document.createElement('li')
                let img = document.createElement('img')
                song.classList.add("abc")
                img.classList.add("cover")
                song.innerHTML = "Espresso"
                img.src = "https://i.pinimg.com/736x/6f/a0/b1/6fa0b1ceffc7ef78df318e2f720a4331.jpg"
                song.appendChild(img)
                list.appendChild(song)
            }
            if (playlist[i] == "We can't be friend"){
                let song = document.createElement('li')
                let img = document.createElement('img')
                song.classList.add("abc")
                img.classList.add("cover")
                song.innerHTML = "We can't be friend"
                img.src = "https://i.pinimg.com/736x/35/6e/44/356e44f10315459a61c8cbba2ef6ac1d.jpg"
                song.appendChild(img)
                list.appendChild(song)
            }
            if (playlist[i] == "MILLION DOLLAR BABY"){
                let song = document.createElement('li')
                let img = document.createElement('img')
                song.classList.add("abc")
                img.classList.add("cover")
                song.innerHTML = "MILLION DOLLAR BABY"
                img.src = "https://i.pinimg.com/736x/2c/ec/0f/2cec0f076ed87ae61714c4682e75f27b.jpg"
                song.appendChild(img)
                list.appendChild(song)
            }
            if (playlist[i] == "Not like us"){
                let song = document.createElement('li')
                let img = document.createElement('img')
                song.classList.add("abc")
                img.classList.add("cover")
                song.innerHTML = "Not like us"
                img.src = "https://i.pinimg.com/736x/e0/50/ea/e050eac01c3d4f5f057d0189f633d4c4.jpg"
                song.appendChild(img)
                list.appendChild(song)
            }
            if (playlist[i] == "Saturn"){
                let song = document.createElement('li')
                let img = document.createElement('img')
                song.classList.add("abc")
                img.classList.add("cover")
                song.innerHTML = "Saturn"
                img.src = "https://i.pinimg.com/736x/f2/1d/5d/f21d5d429358378e1e98d91dff41acfe.jpg"
                song.appendChild(img)
                list.appendChild(song)
            }
            if (playlist[i] == "Like that"){
                let song = document.createElement('li')
                let img = document.createElement('img')
                song.classList.add("abc")
                img.classList.add("cover")
                song.innerHTML = "Like that"
                img.src = "https://i.pinimg.com/736x/2f/29/54/2f2954a2bb2666a8b7d2ce7c64a3f187.jpg"
                song.appendChild(img)
                list.appendChild(song)
            }
            if (playlist[i] == "redrum"){
                let song = document.createElement('li')
                let img = document.createElement('img')
                song.classList.add("abc")
                img.classList.add("cover")
                song.innerHTML = "redrum"
                img.src = "https://i.pinimg.com/736x/72/af/6c/72af6c6f75f64e471dd387108fe29068.jpg"
                song.appendChild(img)
                list.appendChild(song)
            }
            if (playlist[i] == "That's so true"){
                let song = document.createElement('li')
                let img = document.createElement('img')
                song.classList.add("abc")
                img.classList.add("cover")
                song.innerHTML = "That's so true"
                img.src = "https://i.pinimg.com/736x/b6/d2/16/b6d2161236ce63d467a2c0078331def4.jpg"
                song.appendChild(img)
                list.appendChild(song)
            }
            if (playlist[i] == "Timeless"){
                let song = document.createElement('li')
                let img = document.createElement('img')
                song.classList.add("abc")
                img.classList.add("cover")
                song.innerHTML = "Timeless"
                img.src = "https://i.pinimg.com/736x/6f/8b/cf/6f8bcfdd3c4e97de6ee01822fdf2d353.jpg"
                song.appendChild(img)
                list.appendChild(song)
            }
        }
    }
}   