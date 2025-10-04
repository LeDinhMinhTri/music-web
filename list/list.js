// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { query, orderBy, limit, startAfter} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
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

let current = localStorage.getItem('current');
let list = document.getElementById('songList')
let playlist = [];
if(!current){
    alert('Please log in')
    window.location.href = '../login/login.html'
}



displayFavoriteSongs();

function displayCurrentUserName() {
    let currentUser = localStorage.getItem('current');
    if (currentUser) {
        let authorElement = document.getElementById('playlist-author');
        if (authorElement) {
            authorElement.textContent = `${currentUser}`;
            authorElement.style.color = 'white';
        } else {
            console.error('Element with class "playlist-author" not found');
        }
    } else {
        console.error('No current user found in local storage');
    }
}

async function displayFavoriteSongs() {
    try {
        const querySnapshot = await getDocs(collection(db, "fav"));
        list.innerHTML = ''; 
        querySnapshot.forEach((doc) => {
            const songData = doc.data();
            console.log(songData)
            if (songData.user === current) {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <div class="song-item">
                        <img id="song-icon" src="${songData.img}" alt="${songData.name}" width="100">
                        <h2 id="song-name">${songData.name}</h2>
                        <button class="detail-btn"> Detail</button>
                        <button class="delete-btn"> Delete </button>
                    </div>`;
            
                listItem.classList.add('song-item');
                list.appendChild(listItem);
            }
        });
    } catch (error) {
        console.error("Error fetching songs: ", error);
    }
}

list.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const songItem = event.target.closest('.song-item');
        const songName = songItem.querySelector('#song-name').textContent;

        try {
            const querySnapshot = await getDocs(collection(db, "fav"));
            querySnapshot.forEach(async (docSnapshot) => {
                const songData = docSnapshot.data();
                if (songData.name === songName && songData.user === current) {
                    await deleteDoc(doc(db, "fav", docSnapshot.id));
                    songItem.remove();

                    

                    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                    console.log(`Song "${songName}" deleted successfully.`);
                }
            });
        } catch (error) {
            console.error("Error deleting song: ", error);
        }
    }
});

list.addEventListener('click', async (event) => {
    if (event.target.classList.contains('detail-btn')) {
        const songItem = event.target.closest('.song-item');
        const songName = songItem.querySelector('#song-name').textContent;

        try {
            const querySnapshot = await getDocs(collection(db, "fav"));
            querySnapshot.forEach((docSnapshot) => {
                const songData = docSnapshot.data();
                if (songData.name === songName && songData.user === current) {
                    songId = songData.songId;
                    localStorage.setItem('songId', songId);
                    window.location.href = `../song detail/detail.html?id=${songId}`;
                }
            });
        } catch (error) {
            console.error("Error fetching song details: ", error);
        }
    }
});
let pageSize = 5;
let lastVisible = null;

async function loadFavoriteSongs(initial = false) {
    try {
        let favRef = collection(db, "fav");
        let queryRef;
        if (initial || !lastVisible) {
            queryRef = firebase.firestore().collection("fav")
                .where("user", "==", current)
                .orderBy("name")
                .limit(pageSize);
        } else {
            queryRef = firebase.firestore().collection("fav")
                .where("user", "==", current)
                .orderBy("name")
                .startAfter(lastVisible)
                .limit(pageSize);
        }

        const querySnapshot = await queryRef.get();
        if (initial) list.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const songData = doc.data();
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="song-item">
                    <img id="song-icon" src="${songData.img}" alt="${songData.name}" width="100">
                    <h2 id="song-name">${songData.name}</h2>
                    <button class="detail-btn"> Detail</button>
                    <button class="delete-btn"> Delete </button>
                </div>`;
            listItem.classList.add('song-item');
            list.appendChild(listItem);
        });
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        if (querySnapshot.size < pageSize) {
            showMoreBtn.style.display = 'none';
        } else {
            showMoreBtn.style.display = 'block';
        }
    } catch (error) {
        console.error("Error fetching songs: ", error);
    }
}

const showMoreBtn = document.createElement('button');
showMoreBtn.textContent = 'Show More';
showMoreBtn.style.display = 'none';
showMoreBtn.className = 'show-more-btn';
list.parentNode.appendChild(showMoreBtn);

showMoreBtn.addEventListener('click', () => {
    loadFavoriteSongs(false);
});

// Initial load
loadFavoriteSongs(true);