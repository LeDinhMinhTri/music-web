import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

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
            alert("Sign up success");
            localStorage.setItem('current',user.displayName);
            window.location.href = '../home/home.html';
        })
})


let form = document.querySelector('form')
let users = []
function signUp(e){
    e.preventDefault();
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    if (username.length < 3){
        alert('Username must be at least 3 characters')
        return;
    }
    if (password !== confirmPassword){
        alert('Password does not match');
        return;
    }
    if (localStorage.getItem('users')){
        users = JSON.parse(localStorage.getItem('users'));
        for (let i = 0;i < users.length; i++){
            if (username == users[i].username){
                alert('Username already exists');
                return;
            }
        }
    }
    users.push({
        email: email,
        username: username,
        password: password,
    });
    localStorage.setItem('users', JSON.stringify(users));

    alert('User registered successfully');
    window.location.href = '../login/login.html';
}
form.addEventListener('submit', signUp)
