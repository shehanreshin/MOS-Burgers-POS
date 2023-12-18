let itemsSection = document.getElementById('items-section');

fetch(new Request("./asset/data/items.json"))
    .then(response => {
        return response.json();
    })
    .then(json => {
        var items = json.items;
        var burgers = items.burgers;
        var burgerCardsHTML = "";

        burgers.forEach(burger => {
            burgerCardsHTML += `<div class="col-lg-4 col-md-6 col-sm-6">
            <div class="card w-100 h-100">
                <img src="`+ burger.image + `" class="card-img-top"
                    alt="burger">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h6 class="card-title mb-2">`+ burger.name + `</h6>
                        <h6 class="fw-bolder">`+ burger.price + `</h6>
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <div class="expiry-status color-text-danger">
                            
                        </div>
                        <div><button
                                class="btn color-bg-primary color-txt-white pe-4 ps-4">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        });

        itemsSection.innerHTML = burgerCardsHTML;
    });