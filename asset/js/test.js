fetch(new Request("./asset/data/items.json"))
    .then(response => {
        return response.json();
    })
    .then(json => {
        var items = json.items;
        console.log(items.burgers);
    });