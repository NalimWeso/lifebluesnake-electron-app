setTimeout(change1, 1000);

setTimeout(change2, 2000);

setTimeout(goToWelcome, 3000);

function change1() {
    document.querySelector('body')
        .innerHTML = `<img src="../logos/logo-high-1.png" class="logo-welcome">`;
}

function change2() {
    document.querySelector('body')
        .innerHTML = `<img src="../logos/logo-high-2.png" class="logo-welcome">`;
}

function goToWelcome() {
    window.location.href = 'login.html';
}