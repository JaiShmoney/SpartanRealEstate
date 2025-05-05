console.log("script.js loaded");

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDL2XkuYgEwE7A1Dfy_9v35AGbAXK8LmG4",
    authDomain: "spartanre-378f6.firebaseapp.com",
    projectId: "spartanre-378f6",
    storageBucket: "spartanre-378f6.firebasestorage.app",
    messagingSenderId: "654260858712",
    appId: "1:654260858712:web:6d1ddd71a006a7f2057f2d",
    measurementId: "G-1K8Q9YJ7YG"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
console.log("Firebase initialized:", app);
const analytics = firebase.analytics();
const db = firebase.firestore();
console.log("Firestore initialized:", db);

// Mobile Navigation Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Form Submission Handler
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    console.log("Form data to be submitted:", data);
    
    try {
        // Add a new document to the "contacts" collection
        const docRef = await db.collection("Contacts").add({
            name: data.name,
            email: data.email,
            phone: data.phone || "Not provided",
            message: data.message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        console.log("Document written with ID: ", docRef.id);
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    } catch (error) {
        console.error("Error adding document: ", error);
        alert('There was an error sending your message. Please try again later.');
    }
});

// Property Search Handler
const searchBar = document.querySelector('.search-bar');
searchBar.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchInput = searchBar.querySelector('input');
    
    // Here you would typically handle the search functionality
    console.log('Searching for:', searchInput.value);
    
    // For demo purposes, show a message
    alert(`Searching for properties matching: ${searchInput.value}`);
}); 