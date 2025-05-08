// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app)

let songId = null;

async function getSong() {
    const querySnapshot = await getDocs(collection(db, "song"));
    const songs = [];
    console.log(querySnapshot)
    querySnapshot.forEach((doc)=>{
        songs.push({ id : doc.id, ...doc.data()});
    });
    return products;
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
            <img class="img" src="${song.img}" alt ="${song.name}" width = "100">

            <button class="delete-btn" data-id="${song.id}">Delete</button>
        </div>`;
        songDiv.addEventListener('click', ()=>{
            window.location.href = `../detail/detail.html?id=${song.id}`;
        });
        songList.appendChild(songDiv);
    });
    document.querySelectorAll('.delete-btn').forEach((button)=>{
        button.addEventListener('click', async (event)=>{
            const songId = event.target.getAttribute('data-id');
            await deleteProduct(songId);
        })
    })
}

async function deleteSong(songId){
    await deleteDoc(doc(db, "song", songId));
    alert("Song deleted successfully");
    displaySongs();
}



displaySongs();

