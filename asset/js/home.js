let itemsSection = document.getElementById('items-section'),
    orderSection = document.getElementById('accordionExample');
let items, burgers = [], submarines = [], fries = [], pasta = [], chicken = [], beverages = [];

const navBurgers = document.getElementById('nav-burgers'),
    navSubmarines = document.getElementById('nav-submarines'),
    navFries = document.getElementById('nav-fries'),
    navPasta = document.getElementById('nav-pasta'),
    navChicken = document.getElementById('nav-chicken'),
    navBeverages = document.getElementById('nav-beverages');

const subtotalSelector = document.getElementById('subtotal'),
    totalDiscountSelector = document.getElementById('total-discount'),
    payableAmountSelector = document.getElementById('payable-amount');

let orders = [], selectedItems = [];

function generateOrderId() {
    if (orders.length == 0) {
        return (1).toString().padStart(9, '0');
    }
    return (Number(orders[orders.length - 1].orderId) + 1).toString().padStart(9, '0');
}

function updateBill() {
    var subtotal = 0, totalDiscount = 0;
    selectedItems.forEach(selectedItem => {
        subtotal += selectedItem.totalPrice;
        totalDiscount = subtotal * (selectedItem.discount == "" ? 0 : selectedItem.discount / 100);
    });
    subtotalSelector.innerHTML = `Rs. ${subtotal.toFixed(2)}`;
    totalDiscountSelector.innerHTML = `Rs. ${totalDiscount.toFixed(2)}`;
    payableAmountSelector.innerHTML = `Rs. ${(subtotal - totalDiscount).toFixed(2)}`;
}

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
                        <p class="color-txt-primary">${burger.maxDiscount == "" ? "" : "Max discount: " + burger.maxDiscount + "%"}</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="expiry-status color-text-danger">

                        </div>
                        <div><button
                                class="btn color-bg-primary color-txt-white pe-4 ps-4" onclick="addItemToOrder('${burger.code}')">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    });
    itemsSection.innerHTML = burgerCardsHTML;
}

function addItemToOrder(code) {
    var item = getItem(code);
    var itemDTO = {
        code: item.code,
        name: item.name,
        qty: 1,
        unitPrice: item.price,
        maxDiscount: item.maxDiscount,
        expiry_date: item.expiry_date,
        discount: 0,
        get totalPrice() {
            return this.unitPrice * this.qty;
        }
    }
    for (var selectedItem of selectedItems) {
        if (selectedItem.code == code) {
            selectedItem.qty += 1;
            updateSelectedItemsDisplay();
            updateBill();
            return;
        }
    }
    selectedItems.push(itemDTO);
    updateSelectedItemsDisplay();
    updateBill();
}

function updateSelectedItemsDisplay() {
    orderSection.innerHTML = "";
    var collapseCounter = 0;
    for (var selectedItem of selectedItems) {
        var placeHolder = selectedItem.maxDiscount != "" ? "placeholder = 'Max: " +
            selectedItem.maxDiscount + "%'" : "";
        var isExpired = selectedItem.expiry_date != undefined && new Date() >= new Date(selectedItem.expiry_date);
        var accordionColorBody = isExpired ? 'color-bg-danger' : 'color-bg-light';
        var accordionColorText = isExpired ? 'color-txt-white' : 'color-txt-dark';
        orderSection.innerHTML +=
            `<div class="accordion-item">
        <h2 class="accordion-header">
            <button class="accordion-button fs-14 ${accordionColorBody}" type="button"
                data-bs-toggle="collapse" data-bs-target="#collapse${collapseCounter}" aria-expanded="true"
                aria-controls="collapse${collapseCounter}">
                <div class="me-2  ${accordionColorText}" id="quantity-header-${collapseCounter}">${selectedItem.qty}</div>
                <div class="d-flex justify-content-between w-100">
                    <div>
                        <div class="${accordionColorText}">${selectedItem.name}</div>
                    </div>
                    <div class="d-flex align-items-center">
                        <div class="fw-bold me-2 ${accordionColorText}" id="total-price-${collapseCounter}">Rs. ${selectedItem.totalPrice.toFixed(2)}</div>
                        <div class="cancel-selected-item"><img src="asset/img/home/cancel-b.png" alt="cancel"></div>
                    </div>
                </div>
            </button>
        </h2>
        <div id="collapse${collapseCounter}" class="accordion-collapse collapse "
            data-bs-parent="#accordionExample">
            <div class="accordion-body color-bg-light">
                <div class="d-flex align-items-center">
                    <div class="d-flex flex-column">
                        <label class="color-txt-black" for="txt-quantity">Quantity</label>
                        <input class="txt-quantity form-control w-75 color-txt-black" type="number"
                            id="txt-quantity-${collapseCounter}" value="${selectedItem.qty}">
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                        <label class="color-txt-black" for="txt-discount">Discount(%)</label>
                        <input class="txt-discount form-control w-75 color-txt-black" type="number"
                             ${placeHolder} ${selectedItem.maxDiscount == "" ? "value = '0'" : ""}  ${selectedItem.maxDiscount == "" ? "readonly" : ""}>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
        collapseCounter++;
    }
    for (var i = 0; i < collapseCounter; i++) {
        var quantitySelector = document.getElementById(`txt-quantity-${i}`);
        var quantityHeaderSelector = document.getElementById(`quantity-header-${i}`);
        var totalPriceSelector = document.getElementById(`total-price-${i}`);
        quantitySelector.addEventListener('input', event => {
            var newQuantity = parseInt(event.target.value, 10);
            selectedItem.qty = newQuantity;
            quantitySelector.value = selectedItem.qty;
            quantityHeaderSelector.innerHTML = selectedItem.qty;
            selectedItem.totalPrice = selectedItem.unitPrice * selectedItem.qty;
            totalPriceSelector.innerHTML = `Rs. ${selectedItem.totalPrice.toFixed(2)}`;
            updateBill();
        });
    }
    attachCancelButtonListeners();
}

function getItem(code) {
    for (var item of items) {
        if (item.code == code) {
            return item;
        }
    }
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
                        <p class="color-txt-primary">${submarine.maxDiscount == "" ? "" : "Max discount: " + submarine.maxDiscount + "%"}</p>
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <div class="expiry-status color-text-danger">
                            
                        </div>
                        <div><button
                                class="btn color-bg-primary color-txt-white pe-4 ps-4" onclick="addItemToOrder('${submarine.code}')">Add</button>
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
                        <p class="color-txt-primary">${friedItem.maxDiscount == "" ? "" : "Max discount: " + friedItem.maxDiscount + "%"}</p>
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <div class="expiry-status color-text-danger">
                            
                        </div>
                        <div><button
                                class="btn color-bg-primary color-txt-white pe-4 ps-4" onclick="addItemToOrder('${friedItem.code}')">Add</button>
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
                        <p class="color-txt-primary">${pastaItem.maxDiscount == "" ? "" : "Max discount: " + pastaItem.maxDiscount + "%"}</p>
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <div class="expiry-status color-text-danger">
                            
                        </div>
                        <div><button
                                class="btn color-bg-primary color-txt-white pe-4 ps-4" onclick="addItemToOrder('${pastaItem.code}')">Add</button>
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
                        <p class="color-txt-primary">${chickenItem.maxDiscount == "" ? "" : "Max discount: " + chickenItem.maxDiscount + "%"}</p>
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <div class="expiry-status color-text-danger">
                            
                        </div>
                        <div><button
                                class="btn color-bg-primary color-txt-white pe-4 ps-4" onclick="addItemToOrder('${chickenItem.code}')">Add</button>
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
                        <p class="color-txt-primary">${beverage.maxDiscount == "" ? "" : "Max discount: " + beverage.maxDiscount + "%"}</p>
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <div class="expiry-status color-text-danger">
                            ${isExpired ? "Expired" : ""}
                        </div>
                        <div><button
                                class="btn ${isExpired ? "color-bg-danger" : "color-bg-primary"} color-txt-white pe-4 ps-4" onclick="addItemToOrder('${beverage.code}')">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    });
    itemsSection.innerHTML = beverageCardsHTML;
}

function intializeItemArrays(items) {
    items.forEach(item => {
        switch (item.type) {
            case "burgers":
                burgers.push(item);
                break;
            case "submarines":
                submarines.push(item);
                break;
            case "fries":
                fries.push(item);
                break;
            case "pasta":
                pasta.push(item);
                break;
            case "chicken":
                chicken.push(item);
                break;
            case "beverages":
                beverages.push(item);
                break;
        }
    });
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

document.getElementById('btn-logout').addEventListener('click', () => {
    localStorage.clear();
    window.location.replace("../../index.html");
});

document.getElementById('btn-cancel').addEventListener('click', () => {
    emptySelectedItems();
});

document.getElementById('btn-reset').addEventListener('click', () => {
    emptySelectedItems();
});

document.getElementById('btn-add-existing-customer').addEventListener('click', () => {
    console.log("clicked");
});

function emptySelectedItems() {
    selectedItems = [];
    updateSelectedItemsDisplay();
    updateBill();
}

document.getElementById('btn-proceed').addEventListener('click', () => {
    var subtotal = 0, totalDiscount = 0;
    selectedItems.forEach(selectedItem => {
        subtotal += selectedItem.totalPrice;
        totalDiscount = subtotal * (selectedItem.discount == "" ? 0 : selectedItem.discount / 100);
    });
    let order = {
        orderId: generateOrderId(),
        customerId: getCustomerId(),
        date: new Date(),
        itemsInOrder: selectedItems,
        payableAmount: subtotal - totalDiscount
    }
    orders.push(order);
    emptySelectedItems();
});

function getCustomerId() {
    return document.getElementById('customer').innerText;
}

function attachCancelButtonListeners() {
    document.querySelectorAll('.cancel-selected-item').forEach((cancelButton) => {
        cancelButton.addEventListener('click', (event) => {
            event.stopPropagation();
            var accordionItem = cancelButton.closest('.accordion-item');
            var index = Array.from(accordionItem.parentElement.children).indexOf(accordionItem);
            selectedItems.splice(index, 1);
            updateBill();
            updateSelectedItemsDisplay();
        });
    });
}

function submitCustomerNumber() {
    var modalCustomer = new bootstrap.Modal(document.getElementById('mdl-customer'));
    var customerNumber = document.getElementById('txt-existing-customer').value;
    if (customerNumber !== '') {
        document.getElementById('customer').innerText = customerNumber;
        modalCustomer.hide();
    }
}

document.getElementById('btn-add-existing-customer').addEventListener('click', () => {
    var modalCustomer = new bootstrap.Modal(document.getElementById('mdl-customer'));
    modalCustomer.show();
});
