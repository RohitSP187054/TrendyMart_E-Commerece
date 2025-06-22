const products = [
    { id: 1, name: "Wireless Headphones", category: "electronics", price: 1799, image: "https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg", description: "High-quality wireless headphones with noise cancellation." },
    { id: 2, name: "Trendy Sneakers", category: "fashion", price: 1999, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", description: "Stylish and comfortable sneakers for everyday wear." },
    { id: 3, name: "Smartwatch", category: "electronics", price: 1399, image: "assets/SmartWatch.jpg", description: "Track your fitness and stay connected with this smartwatch." },
    { id: 4, name: "Stylish Backpack", category: "accessories", price: 1099, image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg", description: "Durable and fashionable backpack for all your needs." },
    { id: 5, name: "Leather Wallet", category: "accessories", price: 499, image: "assets/Wallet.jpg", description: "Premium leather wallet with multiple compartments." },
    { id: 6, name: "Wireless Earbuds", category: "electronics", price: 1499, image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg", description: "Compact wireless earbuds with superior sound quality." },
    { id: 7, name: "Polarized Sunglasses", category: "accessories", price: 499, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f", description: "Stylish sunglasses with UV protection." },
    { id: 8, name: "Ultra-Slim Laptop", category: "electronics", price: 69999, image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45", description: "Powerful and lightweight laptop for professionals." },
    { id: 9, name: "DSLR Camera", category: "electronics", price: 75999, image: "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg", description: "Capture stunning photos with this professional DSLR." },
    { id: 10, name: "Smartphone Pro", category: "electronics", price: 21999, image: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg", description: "Advanced smartphone with a high-resolution camera." },
    { id: 11, name: "Gaming Console", category: "electronics", price: 3499, image: "assets/Console.jpg", description: "Next-gen gaming console for immersive experiences." },
    { id: 12, name: "Fitness Tracker", category: "accessories", price: 1499, image: "https://plus.unsplash.com/premium_photo-1681433383783-661b519b154a?q=80&w=2660&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "Monitor your health and activity with this tracker." }
];

const getOrders = () => {
    return JSON.parse(localStorage.getItem('orders')) || [];
};

const saveOrders = (orders) => {
    localStorage.setItem('orders', JSON.stringify(orders));
};

const getUserProfile = () => {
    return JSON.parse(localStorage.getItem('userProfile')) || {
        name: "John Doe",
        email: "john.doe@example.com",
        address: "Jai Bhawani Nagar, N-4, Cidco, Chh. Sambhaji Nagar, MH-431001, India"
    };
};

const saveUserProfile = (profile) => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
};


