let txtPassword = document.getElementById("txt-password");
let txtUsername = document.getElementById("txt-username");

document.getElementById("login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    var isCredentialsValid =
        txtUsername.value === "admin" &&
        CryptoJS.SHA256(txtPassword.value)
            .toString(CryptoJS.enc.Base64) === "6PAQ3WdNc2xsyjy3S07LnO273PrMSPydhXUORe6pelI=";
    if (!isCredentialsValid) { return; }
    window.location.replace("home.html")
});

