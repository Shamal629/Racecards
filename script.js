// Card Data
const cardData = [
    {
        id: 1,
        title: "LA FERRARI",
        category: "racecard",
        subtitle: "Limited Edition Hypercar",
        year: "2023",
        engine: "V12 Hybrid",
        power: "950 HP",
        price: "1.8 ETH",
        description: "The LaFerrari represents the pinnacle of Ferrari's engineering and design. This limited edition hypercar features a 6.3L V12 engine paired with a HY-KERS electric motor, delivering a combined 950 horsepower.",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600",
        stats: [
            { label: "HP", value: "950" },
            { label: "0-60", value: "2.4s" },
            { label: "MPH", value: "217" }
        ]
    },
    {
        id: 2,
        title: "BUGATTI CHIRON",
        category: "luxcard",
        subtitle: "Ultimate Speed Machine",
        year: "2024",
        engine: "W16 8.0L",
        power: "1500 HP",
        price: "3.2 ETH",
        description: "The Bugatti Chiron represents the ultimate expression of automotive engineering. With its quad-turbocharged 8.0L W16 engine producing 1,500 horsepower.",
        image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600",
        stats: [
            { label: "HP", value: "1500" },
            { label: "0-60", value: "2.3s" },
            { label: "MPH", value: "261" }
        ]
    },
    {
        id: 3,
        title: "FERRARI 250 GTO",
        category: "classiccard",
        subtitle: "Most Valuable Car",
        year: "1962",
        engine: "V12 3.0L",
        power: "300 HP",
        price: "8.5 ETH",
        description: "The Ferrari 250 GTO is the most valuable car in history. With only 36 units ever produced, it represents the golden era of sports car racing.",
        image: "https://images.unsplash.com/photo-1502164980785-f8aa41d53611?auto=format&fit=crop&w=600",
        stats: [
            { label: "HP", value: "300" },
            { label: "0-60", value: "6.1s" },
            { label: "MPH", value: "152" }
        ]
    },
    {
        id: 4,
        title: "MCLAREN F1 GTR",
        category: "racecard",
        subtitle: "Le Mans Winner",
        year: "1995",
        engine: "V12 6.1L",
        power: "600 HP",
        price: "4.7 ETH",
        description: "Le Mans 24h winner. Road car transformed into racing legend with carbon fiber construction.",
        image: "https://images.unsplash.com/photo-1617654116851-8daa20b8f349?auto=format&fit=crop&w=600",
        stats: [
            { label: "HP", value: "600" },
            { label: "0-60", value: "3.2s" },
            { label: "MPH", value: "215" }
        ]
    },
    {
        id: 5,
        title: "NISSAN GT-R R34",
        category: "specialcard",
        subtitle: "The Legendary Godzilla",
        year: "1999",
        engine: "RB26DETT",
        power: "276 HP",
        price: "2.1 ETH",
        description: "The legendary Godzilla. Japanese domestic market icon with advanced ATTESA E-TS all-wheel drive.",
        image: "https://images.unsplash.com/photo-1563720223484-21c6c2d3c340?auto=format&fit=crop&w=600",
        stats: [
            { label: "HP", value: "276" },
            { label: "0-60", value: "4.9s" },
            { label: "MPH", value: "155" }
        ]
    },
    {
        id: 6,
        title: "RIMAC NEVERA",
        category: "ecard",
        subtitle: "Electric Hypercar",
        year: "2023",
        engine: "Electric",
        power: "1914 HP",
        price: "3.8 ETH",
        description: "All-electric hypercar with 1,914HP. World's fastest accelerating production car with four independent motors.",
        image: "https://images.unsplash.com/photo-1624702046625-6247c5f4d56a?auto=format&fit=crop&w=600",
        stats: [
            { label: "HP", value: "1914" },
            { label: "0-60", value: "1.85s" },
            { label: "MPH", value: "258" }
        ]
    }
];

// DOM Elements
const cardsContainer = document.getElementById('cardsContainer');
const cardModal = document.getElementById('cardModal');
const modalClose = document.getElementById('modalClose');
const connectWalletBtn = document.getElementById('connectWallet');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
const filterButtons = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contactForm');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderCards();
    setupEventListeners();
    setupImageLoading();
    
    // Add smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
});

// Render cards to the gallery
function renderCards(filter = 'all') {
    cardsContainer.innerHTML = '';
    
    const filteredCards = filter === 'all' 
        ? cardData 
        : cardData.filter(card => card.category === filter);
    
    filteredCards.forEach(card => {
        const cardElement = createCardElement(card);
        cardsContainer.appendChild(cardElement);
    });
}

// Create card HTML element
function createCardElement(card) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.setAttribute('data-category', card.category);
    cardDiv.setAttribute('data-id', card.id);
    
    // Category color mapping
    const categoryColors = {
        'racecard': 'var(--racecard)',
        'classiccard': 'var(--classiccard)',
        'specialcard': 'var(--specialcard)',
        'luxcard': 'var(--luxcard)',
        'ecard': 'var(--ecard)'
    };
    
    const categoryColor = categoryColors[card.category] || 'var(--primary)';
    
    cardDiv.innerHTML = `
        <div class="card-image">
            <img src="${card.image}" alt="${card.title}" loading="lazy" 
                 onload="this.classList.add('loaded'); this.parentElement.classList.add('loaded')">
            <div class="card-category ${card.category}" style="background: ${categoryColor}">
                ${card.category.charAt(0).toUpperCase() + card.category.slice(1)}
            </div>
            <div class="nft-badge">
                <i class="fab fa-ethereum"></i> NFT
            </div>
        </div>
        <div class="card-content">
            <div class="card-header">
                <h3 class="card-title">${card.title}</h3>
                <div class="card-price">
                    <i class="fab fa-ethereum"></i> ${card.price}
                </div>
            </div>
            <h4 class="card-subtitle">${card.subtitle}</h4>
            <div class="card-year">${card.year} • ${card.engine}</div>
            <p class="card-description">${card.description}</p>
            
            <div class="card-stats">
                ${card.stats.map(stat => `
                    <div class="stat-item">
                        <span class="stat-value">${stat.value}</span>
                        <span class="stat-label">${stat.label}</span>
                    </div>
                `).join('')}
            </div>
            
            <button class="card-button" onclick="openCardModal(${card.id})">
                <i class="fas fa-eye"></i> View Card
            </button>
        </div>
    `;
    
    return cardDiv;
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
    
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Apply filter
            const filter = button.getAttribute('data-filter');
            renderCards(filter);
            
            // Add animation to cards
            animateCards();
        });
    });
    
    // Modal close button
    if (modalClose) {
        modalClose.addEventListener('click', closeCardModal);
    }
    
    // Close modal when clicking outside
    cardModal.addEventListener('click', (e) => {
        if (e.target === cardModal) {
            closeCardModal();
        }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cardModal.style.display === 'flex') {
            closeCardModal();
        }
    });
    
    // Wallet connection
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('click', connectWallet);
    }
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

// Setup image loading with intersection observer
function setupImageLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Animate cards on filter
function animateCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate');
        
        setTimeout(() => {
            card.classList.remove('animate');
        }, 1000);
    });
}

// Open card modal
function openCardModal(cardId) {
    const card = cardData.find(c => c.id === cardId);
    if (!card) return;
    
    // Update modal content
    document.getElementById('modalTitle').textContent = card.title;
    document.getElementById('modalSubtitle').textContent = card.subtitle;
    document.getElementById('modalYear').textContent = `${card.year} • ${card.engine}`;
    document.getElementById('modalDescription').textContent = card.description;
    document.getElementById('modalPrice').innerHTML = `<i class="fab fa-ethereum"></i> ${card.price}`;
    
    // Update category
    const modalCategory = document.getElementById('modalCategory');
    modalCategory.textContent = card.category.charAt(0).toUpperCase() + card.category.slice(1);
    
    // Category color mapping
    const categoryColors = {
        'racecard': 'var(--racecard)',
        'classiccard': 'var(--classiccard)',
        'specialcard': 'var(--specialcard)',
        'luxcard': 'var(--luxcard)',
        'ecard': 'var(--ecard)'
    };
    
    const categoryColor = categoryColors[card.category] || 'var(--primary)';
    modalCategory.style.background = categoryColor;
    
    if (card.category === 'luxcard') {
        modalCategory.style.color = '#000';
    } else {
        modalCategory.style.color = '#fff';
    }
    
    // Update image
    const modalImage = document.getElementById('modalCarImage');
    modalImage.style.backgroundImage = `url('${card.image}')`;
    
    // Update stats
    const modalStats = document.getElementById('modalStats');
    modalStats.innerHTML = card.stats.map(stat => `
        <div class="stat">
            <span class="stat-label">${stat.label}</span>
            <span class="stat-value">${stat.value}</span>
        </div>
    `).join('');
    
    // Set up purchase button
    const purchaseBtn = document.getElementById('purchaseBtn');
    if (purchaseBtn) {
        purchaseBtn.onclick = () => purchaseCard(card);
    }
    
    // Set up trade button
    const tradeBtn = document.getElementById('tradeBtn');
    if (tradeBtn) {
        tradeBtn.onclick = () => tradeCard(card);
    }
    
    // Show modal
    cardModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close card modal
function closeCardModal() {
    cardModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Connect wallet function
function connectWallet() {
    // Simulate wallet connection
    connectWalletBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
    connectWalletBtn.disabled = true;
    
    setTimeout(() => {
        const connected = Math.random() > 0.5; // Simulate 50% success rate
        
        if (connected) {
            connectWalletBtn.innerHTML = '<i class="fas fa-wallet"></i> Connected';
            connectWalletBtn.style.background = 'linear-gradient(90deg, var(--success), #2ecc71)';
            connectWalletBtn.onclick = null;
            
            // Show success notification
            showNotification('Wallet connected successfully!', 'success');
        } else {
            connectWalletBtn.innerHTML = '<i class="fas fa-wallet"></i> Connect Wallet';
            connectWalletBtn.disabled = false;
            
            // Show error notification
            showNotification('Failed to connect wallet. Please try again.', 'error');
        }
    }, 1500);
}

// Purchase card function
function purchaseCard(card) {
    showNotification(`Initiating purchase of ${card.title} for ${card.price}...`, 'info');
    
    // Simulate transaction
    setTimeout(() => {
        const success = Math.random() > 0.3; // 70% success rate
        
        if (success) {
            showNotification(`Successfully purchased ${card.title}! Transaction confirmed.`, 'success');
            closeCardModal();
        } else {
            showNotification('Transaction failed. Please try again.', 'error');
        }
    }, 2000);
}

// Trade card function
function tradeCard(card) {
    showNotification(`Making offer for ${card.title}...`, 'info');
    
    // Simulate trade offer
    setTimeout(() => {
        showNotification(`Offer submitted for ${card.title}. The owner will be notified.`, 'success');
    }, 1500);
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simulate form submission
    showNotification('Sending your message...', 'info');
    
    setTimeout(() => {
        e.target.reset();
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
    }, 2000);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Type-based icon and color
    const icons = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'info': 'fa-info-circle'
    };
    
    const colors = {
        'success': 'linear-gradient(90deg, var(--success), #2ecc71)',
        'error': 'linear-gradient(90deg, var(--primary), #e74c3c)',
        'info': 'linear-gradient(90deg, var(--secondary), #3498db)'
    };
    
    notification.innerHTML = `
        <i class="fas ${icons[type] || 'fa-info-circle'}"></i>
        <span>${message}</span>
        <button class="close-notification">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: var(--shadow);
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        font-family: var(--font-subheading);
        font-weight: 500;
    `;
    
    // Add keyframes animation
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            .close-notification {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                margin-left: 10px;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add close functionality
    notification.querySelector('.close-notification').addEventListener('click', function() {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    document.body.appendChild(notification);
}

// Add CSS for animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .card {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.5s ease forwards;
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .card.animate {
        animation: cardPop 0.3s ease;
    }
    
    @keyframes cardPop {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(styleSheet);

// Initialize with all cards
renderCards();
