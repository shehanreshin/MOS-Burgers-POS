let txtPassword = document.getElementById("txt-password");
let txtUsername = document.getElementById("txt-username");
let msgInvalidCredentials = document.getElementById("msg-invalid-credentials");

function validateCredentials(username, password) {
    return txtUsername.value === username &&
        CryptoJS.SHA256(txtPassword.value)
            .toString(CryptoJS.enc.Base64) === password;
}

document.getElementById("login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    fetch(new Request("./asset/data/user_credentials.json"))
        .then(response => {
            return response.json();
        })
        .then(json => {
            var users = json.users;
            users.forEach(user => {
                var isCredentialsValid = validateCredentials(user.username, user.password);
                if (!isCredentialsValid) {
                    msgInvalidCredentials.style.removeProperty('display');
                    return;
                }
                localStorage.setItem('loggedIn', txtPassword.value);
                window.location.replace("home.html")
            });
        });
});