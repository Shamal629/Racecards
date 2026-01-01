// Filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const artCards = document.querySelectorAll('.art-card');
    
    // Initialize filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter cards
            artCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Add hover effects with 3D tilt
    artCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mousemove', function(e) {
            const cardRect = this.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            const rotateY = mouseX * 0.02;
            const rotateX = -mouseY * 0.02;
            
            this.querySelector('.card-inner').style.transform = 
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
            this.querySelector('.card-inner').style.transform = 
                'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // Wallet connection functionality
    const connectWalletBtn = document.getElementById('connectWallet');
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simulate wallet connection
            const walletConnected = Math.random() > 0.5;
            
            if (walletConnected) {
                this.innerHTML = '<i class="fas fa-check-circle"></i> Connected';
                this.style.background = 'linear-gradient(45deg, #00b09b, #96c93d)';
                this.style.cursor = 'default';
                
                // Show success message
                showNotification('Wallet connected successfully!', 'success');
            } else {
                showNotification('Please install MetaMask or another Web3 wallet.', 'error');
            }
        });
    }
    
    // Simple smooth scroll for navigation
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
            }
        });
    });
    
    // Add parallax effect to header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        if (header) {
            header.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });
    
    // Initialize Web3 modal if needed
    initializeWeb3Modal();
});

// View Card Detail Function
function viewCardDetail(cardId) {
    window.location.href = `card-detail.html?id=${cardId}`;
}

// Show notification function
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="close-notification">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #00b09b, #96c93d)' : 'linear-gradient(45deg, #ff416c, #ff4b2b)'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    // Add keyframes animation
    const style = document.createElement('style');
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
        .close-notification {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: 10px;
        }
    `;
    document.head.appendChild(style);
    
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

// Initialize Web3 modal
function initializeWeb3Modal() {
    // This is where you would initialize Web3Modal or similar library
    // For now, we'll just log to console
    console.log('Web3 modal initialization would happen here');
    
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        console.log('Ethereum wallet detected');
        
        // Request account access if needed
        // ethereum.request({ method: 'eth_requestAccounts' })
        //   .then(accounts => {
        //     console.log('Connected account:', accounts[0]);
        //   })
        //   .catch(error => {
        //     console.error('User denied account access:', error);
        //   });
    } else {
        console.log('Please install MetaMask!');
    }
}

// NFT purchase simulation
function simulateNFTPurchase(cardId, price) {
    showNotification(`Initiating purchase of Card #${cardId} for ${price}...`, 'info');
    
    // Simulate transaction
    setTimeout(() => {
        const success = Math.random() > 0.3; // 70% success rate
        if (success) {
            showNotification(`Successfully purchased Card #${cardId}! Transaction confirmed.`, 'success');
        } else {
            showNotification('Transaction failed. Please try again.', 'error');
        }
    }, 2000);
}

// Search functionality (optional enhancement)
function initSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search cards...';
    searchInput.id = 'cardSearch';
    searchInput.style.cssText = `
        padding: 10px 20px;
        border-radius: 25px;
        border: 2px solid #00D4FF;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        font-family: 'Rajdhani', sans-serif;
        font-size: 1rem;
        margin-left: 20px;
        width: 200px;
    `;
    
    // Add to navigation if needed
    // document.querySelector('.nav-links').appendChild(searchInput);
}

// Initialize when page loads
window.onload = function() {
    // Add any initialization code here
    console.log('Racecards Web3 loaded successfully');
};
