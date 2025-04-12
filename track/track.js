// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyCnXeEvTPKJTYxDj7ndWJTawsLnaYPEmaw",
authDomain: "music-web-a584a.firebaseapp.com",
projectId: "music-web-a584a",
storageBucket: "music-web-a584a.firebasestorage.app",
messagingSenderId: "738767681135",
appId: "1:738767681135:web:0cd1319b482a9e0d237f9a",
measurementId: "G-Q1G6GXC4ES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
const db = getFirestore(app)
let songId = null;


let addBtn = document.getElementById('add');
let closeBtn = document.getElementById('save-song');
let popup = document.getElementById('popup');
let blur = document.getElementById('blur');

function openPopup() {
    popup.classList.add('open-popup');
    blur.classList.add('active');
}

async function saveSongs(){
    const name = document.getElementById("name").value;
    const img = document.getElementById("img").value;
    const MV = document.getElementById("MV").value;
    

    const docRef = await addDoc(collection(db, "song"),{
        name: name,
        img: img,
        MV: MV,
        
    });
    alert("MV added successfully with ID: "+docRef.id);
    popup.classList.remove('open-popup');
    blur.classList.remove('active');
    window.location.reload();
}

async function getSong() {
    const querySnapshot = await getDocs(collection(db, "song"));
    const songs = [];
    console.log(querySnapshot)
    querySnapshot.forEach((doc)=>{
        songs.push({ id : doc.id, ...doc.data()});
    });
    return songs;
}

async function displaySongs(){
    const songList =  document.getElementById("song-list");
    songList.innerHTML = "";

    const songs = await getSong();

    songs.forEach((song) =>{
        const songDiv = document.createElement("div");
        songDiv.classList.add("border")
        songDiv.innerHTML = `
        <div class="song-item">
            <h2 class="name" >${song.name}</h2>
            <img class="img" src="${song.img}" width = "100">
        </div>`;
        songDiv.addEventListener('click', ()=>{
            window.location.href = `../song detail/detail.html?id=${song.id}`;
        });
        songList.appendChild(songDiv);
    });
    document.querySelectorAll('.delete-btn').forEach((button)=>{
        button.addEventListener('click', async (event)=>{
            const songId = event.target.getAttribute('data-id');
            await deleteSong(songId);
        })
    })
}

async function deleteSong(songId){
    await deleteDoc(doc(db, "song", songId));
    alert("Song deleted successfully");
    displaySongs();
}

function searchSongs() {
    const searchInput = document.getElementById("search-bar");
    searchInput.addEventListener("input", async (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const songs = await getSong();
        const filteredSongs = songs.filter((song) =>
            song.name.toLowerCase().includes(searchTerm)
        );

        const songList = document.getElementById("song-list");
        songList.innerHTML = "";

        filteredSongs.forEach((song) => {
            const songDiv = document.createElement("div");
            songDiv.classList.add("border");
            songDiv.innerHTML = `
            <div class="song-item">
                <h2 class="name">${song.name}</h2>
                <img class="img" src="${song.img}" width="100">
            </div>`;
            songDiv.addEventListener("click", () => {
                window.location.href = `../song detail/detail.html?id=${song.id}`;
            });
            songList.appendChild(songDiv);
        });
    });
}

searchSongs();
addBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', saveSongs);
displaySongs();
