if (CryptoJS.SHA256(localStorage.getItem('loggedIn')).toString(CryptoJS.enc.Base64) != "6PAQ3WdNc2xsyjy3S07LnO273PrMSPydhXUORe6pelI=") {
    window.location.replace('index.html');
}