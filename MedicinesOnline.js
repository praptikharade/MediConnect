let total = 0;

function addToCart(button) {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    
    const cartItemsList = document.querySelector('.cart-items');
    const totalElement = document.querySelector('.total span');

    const li = document.createElement('li');
    li.textContent = `${name} - ₹${price.toFixed(2)}`;
    cartItemsList.appendChild(li);

    total += price;
    totalElement.textContent = total.toFixed(2);
}

function checkout() {
    alert(`Total amount to pay: ₹${total.toFixed(2)}`);
}
