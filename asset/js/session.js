fetch(new Request("./asset/data/user_credentials.json"))
    .then(response => {
        return response.json();
    })
    .then(json => {
        var users = json.users;
        var isPasswordFound = false;
        users.forEach(user => {
            if (CryptoJS.SHA256(localStorage.getItem('loggedIn')).toString(CryptoJS.enc.Base64) === user.password) {
                isPasswordFound = true;
            }
        });
        if (!isPasswordFound) {
            window.location.replace('index.html');
        }
    });

/* add localstorage clear on browser window closing logic here */