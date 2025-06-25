import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

let btn = document.querySelector(".google-btn");
btn.addEventListener("click", function () {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user);
            alert("Login success");
            localStorage.setItem('current',user.displayName);
            localStorage.setItem('currentEmail',user.email);
            window.location.href = '../home/home.html';
        })
})


let form = document.querySelector('form');

async function login(e){
    e.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert(`Đăng nhập thành công: ${userCredential.user.email}`);
        localStorage.setItem('current', userCredential.user.email.split('@')[0]);
        localStorage.setItem('currentEmail', userCredential.user.email);
        window.location.href = '../home/home.html';
      } catch (error) {
        alert(`Lỗi đăng nhập: ${error.message}`);
      }
    };
    // let users = JSON.parse(localStorage.getItem("users"))
    // for (let i = 0; i<users.length; i++){
    //     if(username === users[i].username && password === users[i].password){
    //         alert("Login successfully")
    //         window.location.href = '../home/home.html'
    //         localStorage.setItem('current',username)
    //         return;
    //     }
    // }
    // alert('Wrong username or password')

form.addEventListener('submit',login)


    