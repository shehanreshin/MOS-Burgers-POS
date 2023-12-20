let itemsSection = document.getElementById('items-section');
let items, burgers, submarines, fries, pasta, chicken, beverages;
let navBurgers = document.getElementById('nav-burgers'),
    navSubmarines = document.getElementById('nav-submarines'),
    navFries = document.getElementById('nav-fries'),
    navPasta = document.getElementById('nav-pasta'),
    navChicken = document.getElementById('nav-chicken'),
    navBeverages = document.getElementById('nav-beverages');


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
                    alt="submarine">
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
                    alt="fries">
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

function generatePasta() {
    var pastaCardsHTML = "";
    pasta.forEach(pastaItem => {
        pastaCardsHTML += `<div class="col-lg-4 col-md-6 col-sm-6">
            <div class="card w-100 h-100" id="${pastaItem.code}">
                <img src="${pastaItem.image}" class="card-img-top w-100 h-50 object-fit-cover"
                    alt="pasta">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h6 class="card-title mb-2">${pastaItem.name}</h6>
                        <h6 class="fw-bolder">Rs. ${(pastaItem.price).toFixed(2)}</h6>
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
    itemsSection.innerHTML = pastaCardsHTML;
}

function generateChicken() {
    var chickenCardsHTML = "";
    chicken.forEach(chickenItem => {
        chickenCardsHTML += `<div class="col-lg-4 col-md-6 col-sm-6">
            <div class="card w-100 h-100" id="${chickenItem.code}">
                <img src="${chickenItem.image}" class="card-img-top w-100 h-50 object-fit-cover"
                    alt="chicken">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h6 class="card-title mb-2">${chickenItem.name}</h6>
                        <h6 class="fw-bolder">Rs. ${(chickenItem.price).toFixed(2)}</h6>
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
    itemsSection.innerHTML = chickenCardsHTML;
}

function generateBeverages() {
    var beverageCardsHTML = "";
    beverages.forEach(beverage => {
        var isExpired = new Date() >= new Date(beverage.expiry_date);
        beverageCardsHTML += `<div class="col-lg-4 col-md-6 col-sm-6">
            <div class="card w-100 h-100" id="${beverage.code}">
                <img src="${beverage.image}" class="card-img-top w-100 h-50 object-fit-cover"
                    alt="beverage">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h6 class="card-title mb-2">${beverage.name}</h6>
                        <h6 class="fw-bolder">Rs. ${(beverage.price).toFixed(2)}</h6>
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <div class="expiry-status color-text-danger">
                            ${isExpired ? "Expired" : ""}
                        </div>
                        <div><button
                                class="btn ${isExpired ? "color-bg-danger" : "color-bg-primary"} color-txt-white pe-4 ps-4">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    });
    itemsSection.innerHTML = beverageCardsHTML;
}

function intializeItemArrays(items) {
    burgers = items.burgers;
    submarines = items.submarines;
    fries = items.fries;
    pasta = items.pasta;
    chicken = items.chicken;
    beverages = items.beverages;
}

fetch(new Request("./asset/data/items.json"))
    .then(response => {
        return response.json();
    })
    .then(json => {
        items = json.items;
        intializeItemArrays(items);
        generateBurgers();
    });

function resetActiveNavSelection() {
    navBurgers.classList.remove('color-txt-primary');
    navSubmarines.classList.remove('color-txt-primary');
    navFries.classList.remove('color-txt-primary');
    navPasta.classList.remove('color-txt-primary');
    navChicken.classList.remove('color-txt-primary');
    navBeverages.classList.remove('color-txt-primary');
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

navPasta.addEventListener('click', () => {
    resetActiveNavSelection();
    navPasta.classList.add('color-txt-primary');
    generatePasta();
});

navChicken.addEventListener('click', () => {
    resetActiveNavSelection();
    navChicken.classList.add('color-txt-primary');
    generateChicken();
});

navBeverages.addEventListener('click', () => {
    resetActiveNavSelection();
    navBeverages.classList.add('color-txt-primary');
    generateBeverages();
});