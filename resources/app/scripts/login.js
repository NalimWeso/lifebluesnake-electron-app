const login = {
    login: 'Nalim',
    password: '1234'
}

let mistakeNumber = 0;

document.querySelector('.login-button').addEventListener('click', (event) => {
    event.preventDefault();

    const log = document.querySelector('.login').value;
    const pass = document.querySelector('.password').value;


    if (log === login.login && pass === login.password) {
        window.location.href = 'search.html';
    }
    else {
        const mistake = document.querySelector('.mistake');
        if (mistakeNumber < 2) {
            mistakeNumber++;
            mistake.innerHTML = `Invalid login or password. You have ${3 - mistakeNumber} more trials.`;
        }
        else {
            document.querySelector('body').innerHTML = `<p class="police">Too many login attempts!<br>Calling the police!</p>`;
        }
    }
});