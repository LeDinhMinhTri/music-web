// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
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

let productId = null;

async function getProduct() {
    const querySnapshot = await getDocs(collection(db, "product"));
    const products = [];
    console.log(querySnapshot)
    querySnapshot.forEach((doc)=>{
        products.push({ id : doc.id, ...doc.data()});
    });
    return products;
}

async function displayProducts(){
    const productList =  document.getElementById("product-list");
    productList.innerHTML = "";

    const products = await getProduct();

    products.forEach((product) =>{
        const productDiv = document.createElement("div");
        productDiv.classList.add("border")
        productDiv.innerHTML = `
        <div class="product-item">
            <img class="img" src="${product.img}" alt ="${product.name}" width = "100">
            <h2 class="name" >${product.name}</h2>
            <p class="price" ><strong>Price:</strong> ${product.price} VND</p>
            <button class="delete-btn" data-id="${product.id}">Delete</button>
        </div>`;
        productList.appendChild(productDiv);
    })
    document.querySelectorAll('.delete-btn').forEach((button)=>{
        button.addEventListener('click', async (event)=>{
            const productId = event.target.getAttribute('data-id');
            await deleteProduct(productId);
        })
    })
}

async function deleteProduct(productId){
    await deleteDoc(doc(db, "product", productId));
    alert("Product deleted successfully");
    displayProducts();
}

displayProducts();




async function saveProducts(){
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const img = document.getElementById("img").value;

    const docRef = await addDoc(collection(db, "product"),{
        name: name,
        price: price,
        img: img
    });
    alert("Product added successfully with ID: "+docRef.id);
    window.location.reload();
}
document.getElementById("save-product").addEventListener('click',saveProducts);