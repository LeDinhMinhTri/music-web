// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
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

function getSongIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function getSongById(songId) {
    const songRef = doc(db, "song", songId);
    const songSnap = await getDoc(songRef);
    if (songSnap.exists()) {
        return { id: songSnap.id, ...songSnap.data() };
    } else {
        console.error("No such song!");
        return null;
    }
}
console.log(getSongById(getSongIdFromUrl()))

async function displaySong() {
    const song = await getSongById(getSongIdFromUrl());
    let name = document.getElementById("item1");
    name.innerHTML = song.name;
    let img = document.getElementById("item3");
    img.src = song.img;
    let MV = document.getElementById("MV");
    let embed = song.MV.split('?v=')[1];
    MV.src = "https://www.youtube.com/embed/" + embed +"?autoplay=1&rel=0"; ;
}

function setupSearchBar() {
    const searchBar = document.getElementById("search-bar");
    if (!searchBar) {
        console.error("Search bar element not found!");
        return;
    }

    searchBar.addEventListener("keypress", async function (event) {
        if (event.key === "Enter") {
            const query = searchBar.value.trim().toLowerCase();
            try {
                const songsSnapshot = await getDocs(collection(db, "song"));
                let foundSong = null;

                songsSnapshot.forEach((doc) => {
                    const songData = doc.data();
                    if (songData.name.toLowerCase() === query) {
                        foundSong = { id: doc.id, ...songData };
                    }
                });

                if (foundSong) {
                    window.location.href = `../song detail/detail.html?id=${foundSong.id}`;
                } else {
                    alert("Song not found!");
                }
            } catch (error) {
                console.error("Error fetching songs:", error);
                alert("An error occurred while searching for the song.");
            }
        }
    });
}

setupSearchBar();
displaySong()