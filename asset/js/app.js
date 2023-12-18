let txtPassword = document.getElementById("txt-password");
let txtUsername = document.getElementById("txt-username");
let msgInvalidCredentials = document.getElementById("msg-invalid-credentials");

function validateCredentials() {
    return txtUsername.value === "admin" &&
        CryptoJS.SHA256(txtPassword.value)
            .toString(CryptoJS.enc.Base64) === "6PAQ3WdNc2xsyjy3S07LnO273PrMSPydhXUORe6pelI=";
}

document.getElementById("login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    var isCredentialsValid = validateCredentials();
    if (!isCredentialsValid) {
        msgInvalidCredentials.style.removeProperty('display');
        return;
    }
    localStorage.setItem('loggedIn', true);
    window.location.replace("home.html")
});