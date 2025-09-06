// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
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


let addBtn = document.getElementById('add');
let addArtist = document.getElementById('add-artist');
let closeBtn = document.getElementById('save-song');
let popup = document.getElementById('popup');
let popupA = document.getElementById('popupA');
let blur = document.getElementById('blur');

function openPopup() {
    popup.classList.add('open-popup');
    blur.classList.add('active');
}
function openPopupA() {
    popupA.classList.add('open-popup');
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

let lastVisible = null; // lưu document cuối cùng của trang hiện tại
const pageSize = 4;     // số bài mỗi trang
let currentSearchTerm = "";

async function loadSongs(searchTerm, isNextPage = false) {
    let q;
    debugger

    // Nếu là trang đầu tiên
    if (!isNextPage) {
        lastVisible = null;
        currentSearchTerm = searchTerm.toLowerCase();
    }

    // Query Firestore có điều kiện
    if (lastVisible) {
        q = query(
            collection(db, "song"),
            orderBy("name"),
            startAfter(lastVisible),
            limit(pageSize)
        );
    } else {
        q = query(
            collection(db, "song"),
            orderBy("name"),
            limit(pageSize)
        );
    }

    const querySnapshot = await getDocs(q);

    // Lọc theo searchTerm ở client (nếu cần)
    const filteredSongs = [];
    querySnapshot.forEach((doc) => {
        const song = { id: doc.id, ...doc.data() };
        if (song.name && song.name.toLowerCase().includes(currentSearchTerm)) {
            filteredSongs.push(song);
        }
    });

    // Cập nhật lastVisible cho trang tiếp theo
    if (!querySnapshot.empty) {
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    }

    renderSongs(filteredSongs, isNextPage);
}

function renderSongs(songs, append = false) {
    const songList = document.getElementById("song-list");
    if (!append) songList.innerHTML = ""; // clear nếu không append

    songs.forEach((song) => {
        const songDiv = document.createElement("div");
        songDiv.classList.add("border");
        songDiv.innerHTML = `
            <div class="song-item">
                <h2 class="name" >${song.name}</h2>
                <img class="img" src="${song.img}" width = "100">
                <button class="delete-btn" data-id="${song.id}">Delete</button>
                <i class='bx bx-play'></i>
                <div class="blur"></div>
            </div>`;
        songDiv.addEventListener("click", () => {
            window.location.href = `../song detail/detail.html?id=${song.id}`;
        });
        songList.appendChild(songDiv);
    });
}

function searchSongs() {
    const searchInput = document.getElementById("search-bar");
    searchInput.addEventListener("input", (event) => {
        const searchTerm = event.target.value;
        loadSongs(searchTerm, false); // tải trang đầu tiên khi search
    });

    // Nút "Tải thêm"
    document.getElementById("load-more").addEventListener("click", () => {
        loadSongs(currentSearchTerm, true); // tải tiếp trang mới
    });
}


function checkAdmin() {
    const adminEmail = "mtokito362@gmail.com";
    let current = localStorage.getItem('currentEmail');
    let addBtn = document.getElementById('add');
    let addBtnSpan = document.getElementById('add-span');
    // Show/hide add button and its span
    if (current === adminEmail) {
        addBtn.style.display = "block";
        if (addBtnSpan) addBtnSpan.style.display = "inline";
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.style.display = "inline-block";
        });
    } else {
        addBtn.style.display = "none";
        if (addBtnSpan) addBtnSpan.style.display = "none";
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.style.display = "none";
        });
    }
}


displaySongs = async function() {
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
            <button class="delete-btn" data-id="${song.id}" style="display:none;">Delete</button>
            <i class='bx bx-play'></i>
            <div class="blur"></div>
        </div>`;
        songDiv.addEventListener('click', (e)=>{
            if (!e.target.classList.contains('delete-btn')) {
                window.location.href = `../song detail/detail.html?id=${song.id}`;
            }
        });
        songList.appendChild(songDiv);
    });
    document.querySelectorAll('.delete-btn').forEach((button)=>{
        button.addEventListener('click', async (event)=>{
            event.stopPropagation();
            const songId = event.target.getAttribute('data-id');
            await deleteSong(songId);
        })
    });
    checkAdmin();
};
let current = localStorage.getItem('current');
if(!current){
    alert('Please log in')
    window.location.href = '../login/login.html'
}

async function saveArtist() {
    const name = document.getElementById("artist-name").value;
    const img = document.getElementById("artist-img").value;
    const bday = document.getElementById("artist-bday").value;

    const docRef = await addDoc(collection(db, "artist"), {
        name: name,
        img: img,
        bday: bday
    });
    alert("Artist added successfully with ID: " + docRef.id);
    popupA.classList.remove('open-popup');
    blur.classList.remove('active');
    window.location.reload();
}

async function getArtists() {
    const querySnapshot = await getDocs(collection(db, "artist"));
    const artists = [];
    querySnapshot.forEach((doc) => {
        artists.push({ id: doc.id, ...doc.data() });
    });
    return artists;
}

async function displayArtists() {
    const artistList = document.getElementById("artist-list");
    if (!artistList) return;
    artistList.innerHTML = "";

    const artists = await getArtists();

    artists.forEach((artist) => {
        const artistDiv = document.createElement("div");
        artistDiv.classList.add("border");
        artistDiv.innerHTML = `
            <div class="artist-item">
                <img class="artist-img" src="${artist.img}" width="100">
                <h2 class="artist-name">${artist.name}</h2>
                <button class="delete-artist-btn" data-id="${artist.id}" style="display:none;">Delete</button>
            </div>`;
        artistDiv.addEventListener('click', (e) => {
            if (!e.target.classList.contains('delete-artist-btn')) {
                window.location.href = `../artist detail/artist_detail.html?id=${artist.id}`;
            }
        });
        artistList.appendChild(artistDiv);
    });

    document.querySelectorAll('.delete-artist-btn').forEach((button) => {
        button.addEventListener('click', async (event) => {
            event.stopPropagation();
            const artistId = event.target.getAttribute('data-id');
            await deleteArtist(artistId);
        });
    });
    checkAdminArtist();
}

async function deleteArtist(artistId) {
    await deleteDoc(doc(db, "artist", artistId));
    alert("Artist deleted successfully");
    displayArtists();
}

function checkAdminArtist() {
    const adminEmail = "mtokito362@gmail.com";
    let current = localStorage.getItem('currentEmail');
    document.querySelectorAll('.delete-artist-btn').forEach(btn => {
        btn.style.display = (current === adminEmail) ? "inline-block" : "none";
    });
}

let saveArtistBtn = document.getElementById('save-artist');
if (saveArtistBtn) {
    saveArtistBtn.addEventListener('click', saveArtist);
}

if (document.getElementById("artist-list")) {
    displayArtists();
}

loadSongs("", false);


searchSongs();
addBtn.addEventListener('click', openPopup);
addArtist.addEventListener('click', openPopupA);
closeBtn.addEventListener('click', saveSongs);
//displaySongs();
