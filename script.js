// Utility: Debounce function to limit rapid event triggers
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart display
function updateCart(container = document.querySelector('.cart-items'), totalElement = document.querySelector('.cart-total'), countElement = document.querySelector('.cart-count')) {
    if (!container || !totalElement || !countElement) return;
    container.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>₹${(item.price * item.quantity).toFixed(2)}</span>
            <button class="remove-item" data-name="${item.name}" aria-label="Remove ${item.name}">Remove</button>
        `;
        container.appendChild(cartItem);
    });

    countElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    totalElement.textContent = `Total: ₹${total.toFixed(2)}`;

    // Remove item
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', debounce(() => {
            const name = button.dataset.name;
            cart = cart.filter(item => item.name !== name);
            saveCart();
            updateCart(container, totalElement, countElement);
        }, 200));
    });
}

// Common page initialization
function initializePage() {
    const cartCount = document.querySelector('.cart-count');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    // Update cart count
    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    // Highlight active nav
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Mobile menu toggle
    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', debounce(() => {
            navLinksContainer.classList.toggle('active');
        }, 200));
    }

    // Modal controls
    document.querySelectorAll('.modal-link').forEach(link => {
        link.addEventListener('click', debounce((e) => {
            e.preventDefault();
            const modalClass = link.dataset.modal;
            const modal = document.querySelector(`.${modalClass}`);
            modal.style.display = 'flex';
            modal.classList.add('active');
        }, 200));
    });

    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', debounce(() => {
            const modal = closeBtn.closest('.modal');
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }, 200));
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            }
        });
    });
}

// Index page
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    const shopNowBtn = document.querySelector('.shop-now');
    const contactForm = document.querySelector('.contact-form');
    const categoryFilter = document.querySelector('#category-filter');
    const priceFilter = document.querySelector('#price-filter');
    const productGrid = document.querySelector('.product-grid');
    const loader = document.querySelector('#loader');

    // Populate products
    function loadProducts() {
        productGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.dataset.category = product.category;
            productCard.dataset.price = product.price;
            productCard.innerHTML = `
                <a href="product-details.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </a>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>₹${product.price}</p>
                    <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}" aria-label="Add ${product.name} to cart">Add to Cart</button>
                </div>
            `;
            productGrid.appendChild(productCard);
        });

        // Add to cart
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', debounce(() => {
                const name = button.dataset.name;
                const price = parseFloat(button.dataset.price);
                const item = cart.find(i => i.name === name);

                if (item) {
                    item.quantity++;
                } else {
                    cart.push({ name, price, quantity: 1 });
                }

                saveCart();
                updateCart();
            }, 200));
        });

        // Image fallback
        document.querySelectorAll('.product-card img').forEach(img => {
            img.onerror = () => {
                img.src = 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg';
            };
        });
    }

    // Product filtering
    function filterProducts() {
        const category = categoryFilter.value;
        const priceRange = priceFilter.value;
        const products = document.querySelectorAll('.product-card');

        loader.style.display = 'block';
        productGrid.style.opacity = '0.5';

        setTimeout(() => {
            products.forEach(product => {
                const productCategory = product.dataset.category;
                const productPrice = parseFloat(product.dataset.price);
                let show = true;

                if (category !== 'all' && productCategory !== category) {
                    show = false;
                }

                if (priceRange !== 'all') {
                    if (priceRange === '0-5000' && (productPrice < 0 || productPrice > 5000)) {
                        show = false;
                    } else if (priceRange === '5000-10000' && (productPrice < 5000 || productPrice > 10000)) {
                        show = false;
                    } else if (priceRange === '10000+' && productPrice <= 10000) {
                        show = false;
                    }
                }

                product.style.display = show ? 'block' : 'none';
            });

            loader.style.display = 'none';
            productGrid.style.opacity = '1';
        }, 500);
    }

    // Event listeners
    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', debounce(() => {
            const productsSection = document.getElementById('products');
            window.scrollTo({
                top: productsSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }, 200));
    }

    if (contactForm) {
        contactForm.addEventListener('submit', debounce((e) => {
            e.preventDefault();
            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            if (!name || !email) {
                alert('Please fill in all required fields.');
                return;
            }
            alert('Thank you for your message! We will respond within 24 hours.');
            contactForm.reset();
        }, 200));
    }

    if (categoryFilter && priceFilter) {
        categoryFilter.addEventListener('change', filterProducts);
        priceFilter.addEventListener('change', filterProducts);
    }

    // Initialize
    loadProducts();
    filterProducts();
    initializePage();
}

// Product Details page
if (window.location.pathname.includes('product-details.html')) {
    const productId = new URLSearchParams(window.location.search).get('id');
    const product = products.find(p => p.id === parseInt(productId));
    const productDetails = document.querySelector('.product-details');

    if (product && productDetails) {
        productDetails.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-details-info">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p class="price">₹${product.price}</p>
                <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}" aria-label="Add ${product.name} to cart">Add to Cart</button>
            </div>
        `;

        // Add to cart
        document.querySelector('.add-to-cart').addEventListener('click', debounce(() => {
            const name = product.name;
            const price = product.price;
            const item = cart.find(i => i.name === name);

            if (item) {
                item.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            saveCart();
            updateCart();
            alert(`${product.name} added to cart!`);
        }, 200));

        // Image fallback
        document.querySelector('.product-details img').onerror = () => {
            this.src = 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg';
        };
    }

    initializePage();
}

// Cart page
if (window.location.pathname.includes('cart.html')) {
    const checkoutBtn = document.querySelector('.checkout');

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', debounce(() => {
            if (cart.length === 0) {
                alert('Your cart is empty. Add some products to proceed!');
                return;
            }
            const orders = getOrders();
            const order = {
                id: orders.length + 1,
                date: new Date().toLocaleDateString(),
                items: [...cart],
                total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
            };
            orders.push(order);
            saveOrders(orders);
            cart = [];
            saveCart();
            updateCart();
            alert('Thank you for your purchase! Your order has been placed.');
            window.location.href = 'orders.html';
        }, 200));
    }

    updateCart();
    initializePage();
}

// Orders page
if (window.location.pathname.includes('orders.html')) {
    const ordersTable = document.querySelector('.orders-table tbody');
    const orders = getOrders();

    if (ordersTable) {
        ordersTable.innerHTML = '';
        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.date}</td>
                <td>₹${order.total.toFixed(2)}</td>
                <td><a href="order-details.html?id=${order.id}" aria-label="View order ${order.id} details">View Details</a></td>
            `;
            ordersTable.appendChild(row);
        });
    }

    initializePage();
}

// Order Details page
if (window.location.pathname.includes('order-details.html')) {
    const orderId = new URLSearchParams(window.location.search).get('id');
    const order = getOrders().find(o => o.id === parseInt(orderId));
    const orderDetails = document.querySelector('.order-details');

    if (order && orderDetails) {
        orderDetails.innerHTML = `
            <h2>Order #${order.id}</h2>
            <p><strong>Date:</strong> ${order.date}</p>
            <p><strong>Total:</strong> ₹${order.total.toFixed(2)}</p>
            <div class="order-details-items">
                <h3>Items</h3>
                <ul>
                    ${order.items.map(item => `<li>${item.name} (x${item.quantity}) - ₹${(item.price * item.quantity).toFixed(2)}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    initializePage();
}

// Profile page
if (window.location.pathname.includes('profile.html')) {
    const profileForm = document.querySelector('.profile-form');
    const profile = getUserProfile();

    if (profileForm) {
        profileForm.querySelector('#name').value = profile.name;
        profileForm.querySelector('#email').value = profile.email;
        profileForm.querySelector('#address').value = profile.address;

        profileForm.addEventListener('submit', debounce((e) => {
            e.preventDefault();
            const newProfile = {
                name: profileForm.querySelector('#name').value.trim(),
                email: profileForm.querySelector('#email').value.trim(),
                address: profileForm.querySelector('#address').value.trim()
            };
            if (!newProfile.name || !newProfile.email) {
                alert('Please fill in all required fields.');
                return;
            }
            saveUserProfile(newProfile);
            alert('Profile updated successfully!');
        }, 200));
    }

    initializePage();
}