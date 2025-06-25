let btn =  document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');

btn.onclick = function(){
    sidebar.classList.toggle('active');
}

let signupBtn = document.getElementById('3');
let loginBtn = document.getElementById('4');
let logoutBtn = document.getElementById('5');

function checkUserLogin() {
    let current = localStorage.getItem('current');
    if (current) {
        signupBtn.style.display = 'none';
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';

    } else {
        signupBtn.style.display = 'block';
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
    }
}
checkUserLogin();

logoutBtn.addEventListener('click', function() {
    localStorage.removeItem('current');
    localStorage.removeItem('currentEmail');
    alert("Logout successfully")
    checkUserLogin();
    window.location.href = "../home/home.html";
});
