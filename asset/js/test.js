fetch(new Request("./asset/data/user_credentials.json"))
    .then(response => {
        return response.json();
    })
    .then(json => {
        var users = json.users;
        users.forEach(user => {
            console.log(user.username)
        });
    });