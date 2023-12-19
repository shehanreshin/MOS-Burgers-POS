let itemsSection = document.getElementById('items-section');
let items, burgers, submarines, fries, pasta, beverages;
let navBurgers = document.getElementById('nav-burgers');
let navSubmarines = document.getElementById('nav-submarines');
let navFries = document.getElementById('nav-fries');

function generateBurgers() {
    var burgerCardsHTML = "";
    burgers.forEach(burger => {
        burgerCardsHTML += `<div class="col-lg-4 col-md-6 col-sm-6">
            <div class="card w-100 h-100" id="${burger.code}">
                <img src="`+ burger.image + `" class="card-img-top w-100 h-50 object-fit-cover"
                    alt="burger">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h6 class="card-title mb-2">${burger.name}</h6>
                        <h6 class="fw-bolder">Rs. ${(burger.price).toFixed(2)}</h6>
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
    var submarineCardsHTML = "";
    submarines.forEach(submarine => {
        submarineCardsHTML += `<div class="col-lg-4 col-md-6 col-sm-6">
            <div class="card w-100 h-100" id="${submarine.code}">
                <img src="${submarine.image}" class="card-img-top w-100 h-50 object-fit-cover"
                    alt="burger">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h6 class="card-title mb-2">${submarine.name}</h6>
                        <h6 class="fw-bolder">Rs. ${(submarine.price).toFixed(2)}</h6>
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

function generateFries() {
    var friesCardsHTML = "";
    fries.forEach(friedItem => {
        friesCardsHTML += `<div class="col-lg-4 col-md-6 col-sm-6">
            <div class="card w-100 h-100" id="${friedItem.code}">
                <img src="${friedItem.image}" class="card-img-top w-100 h-50 object-fit-cover"
                    alt="burger">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h6 class="card-title mb-2">${friedItem.name}</h6>
                        <h6 class="fw-bolder">Rs. ${(friedItem.price).toFixed(2)}</h6>
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
    itemsSection.innerHTML = friesCardsHTML;
}

fetch(new Request("./asset/data/items.json"))
    .then(response => {
        return response.json();
    })
    .then(json => {
        items = json.items;
        burgers = items.burgers;
        submarines = items.submarines;
        fries = items.fries;
        generateBurgers();
    });

function resetActiveNavSelection() {
    navBurgers.classList.remove('color-txt-primary');
    navSubmarines.classList.remove('color-txt-primary');
    navFries.classList.remove('color-txt-primary');
}

navBurgers.addEventListener('click', () => {
    resetActiveNavSelection();
    navBurgers.classList.add('color-txt-primary');
    generateBurgers();
});

navSubmarines.addEventListener('click', () => {
    resetActiveNavSelection();
    navSubmarines.classList.add('color-txt-primary');
    generateSubmarines();
});

navFries.addEventListener('click', () => {
    resetActiveNavSelection();
    navFries.classList.add('color-txt-primary');
    generateFries();
});