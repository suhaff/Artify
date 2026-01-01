// TEMP CART DATA (will come from catalogue later)
let cart = JSON.parse(localStorage.getItem("cart")) || [
    {
        id: 1,
        title: "Moonlit Valley",
        price: 120,
        image: "images/painting_1.jpg"
    }
];

const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info">
                <h3>${item.title}</h3>
                <p class="cart-item-price">$${item.price}</p>
                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
        `;

        cartItemsContainer.appendChild(div);
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

renderCart();
