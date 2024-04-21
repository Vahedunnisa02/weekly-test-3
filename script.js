const Products = [
    {id: 1, name: 'Product-1', price:100},
    {id: 2, name: 'Product-2', price:200},
    {id: 3, name: 'Product-3', price:300},
  ];

  // Function to render product list
  function renderProductList() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '<h2>Product List</h2>';
    Products.forEach(product => {
      const item = document.createElement('div');
      item.classList.add('product-item');
      item.innerHTML = `
        <div>
          <span>${product.name}</span>
        </div>
        <div class="price">
          <span>${product.price}</span>
          <div>
            <button onclick="addToCart(${product.id})">+</button>
            <span id="qty-${product.id}">0</span>
            <button onclick="removeFromCart(${product.id})" disabled>-</button>
          </div>
        </div>
      `;
      productList.appendChild(item);
    });
  }

  // Function to add product to cart
  function addToCart(productId) {
    const qtySpan = document.getElementById(`qty-${productId}`);
    const qty = parseInt(qtySpan.innerText);
    qtySpan.innerText = qty + 1;
    toggleMinusButton(productId, true);
    updateCart();
  }

  // Function to remove product from cart
  function removeFromCart(productId) {
    const qtySpan = document.getElementById(`qty-${productId}`);
    const qty = parseInt(qtySpan.innerText);
    if (qty > 0) {
      qtySpan.innerText = qty - 1;
      toggleMinusButton(productId, qty - 1 > 0);
      updateCart();
    }
  }

  // Function to toggle the disabled attribute of "-" button
  function toggleMinusButton(productId, isEnabled) {
    const minusButton = document.querySelector(`#qty-${productId} + button`);
    if (minusButton) {
      minusButton.disabled = !isEnabled;
    }
  }

  // Function to update cart
  function updateCart() {
    const cart = document.getElementById('cart');
    cart.innerHTML = '<h2>Cart</h2>';
    let total = 0;
    Products.forEach(product => {
      const qty = parseInt(document.getElementById(`qty-${product.id}`).innerText);
      if (qty > 0) {
        const itemPrice = qty * product.price;
        total += itemPrice;
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <span>${product.name} x ${qty}</span>
          <span>${itemPrice}</span>
        `;
        cart.appendChild(cartItem);
      }
    });
    if (total === 0) {
      const emptyCart = document.createElement('p');
      emptyCart.textContent = 'No Product added to the cart';
      cart.appendChild(emptyCart);
    } else {
      const totalElement = document.createElement('div');
      totalElement.innerHTML = `<strong>Total: ${total}</strong>`;
      cart.appendChild(totalElement);
    }
  }

  // Initialize the product list
  renderProductList();