let itemsSection = document.getElementById('items-section');
let items;

function generateBurgers() {
    var burgers = items.burgers;
    var burgerCardsHTML = "";

    burgers.forEach(burger => {
        burgerCardsHTML += `<div class="col-lg-4 col-md-6 col-sm-6">
            <div class="card w-100 h-100" id="`+ burger.code + `">
                <img src="`+ burger.image + `" class="card-img-top w-100 h-50 object-fit-cover"
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
}

function generateSubmarines() {
    var submarines = items.submarines;
    var submarineCardsHTML = "";

    submarines.forEach(submarine => {
        submarineCardsHTML += `<div class="col-lg-4 col-md-6 col-sm-6">
            <div class="card w-100 h-100" id="`+ submarine.code + `">
                <img src="`+ submarine.image + `" class="card-img-top w-100 h-50 object-fit-cover"
                    alt="burger">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h6 class="card-title mb-2">`+ submarine.name + `</h6>
                        <h6 class="fw-bolder">`+ submarine.price + `</h6>
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
    itemsSection.innerHTML = submarineCardsHTML;
}

fetch(new Request("./asset/data/items.json"))
    .then(response => {
        return response.json();
    })
    .then(json => {
        items = json.items;
        generateBurgers();
    });

document.getElementById('nav-burgers').addEventListener('click', () => generateBurgers());
document.getElementById('nav-submarines').addEventListener('click', () => generateSubmarines());