 // Cart functionality
        let cart = [];
        let cartCount = 0;

        function addToCart(productId) {
            cart.push(productId);
            cartCount++;
            
            // Show success message
            showNotification('Product added to cart!', 'success');
            
            // Update cart count if there's a cart counter element
            updateCartDisplay();
        }

        function updateCartDisplay() {
            // This would update a cart counter if one existed
            console.log(`Cart items: ${cartCount}`);
        }

        // Product filtering
        function filterProducts(category) {
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Update active category
            updateActiveCategory(category);
            showNotification(`Showing ${category.replace('-', ' ')} products`, 'info');
        }

        function updateActiveCategory(category) {
            const categoryItems = document.querySelectorAll('.category-item');
            categoryItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked category
            const activeItem = document.querySelector(`[onclick="filterProducts('${category}')"]`);
            if (activeItem) {
                activeItem.classList.add('active');
            }
        }

        // Notification system
        function showNotification(message, type = 'info') {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            
            // Style the notification
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                z-index: 1000;
                animation: slideIn 0.3s ease-out;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            `;
            
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }

        // Scroll to products section
        function scrollToProducts() {
            const productsSection = document.getElementById('productGrid');
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Navigation functionality
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const text = this.textContent;
                
                if (text === 'SHOP') {
                    scrollToProducts();
                } else if (text === 'ABOUT') {
                    document.querySelector('.about-section').scrollIntoView({ behavior: 'smooth' });
                } else if (text === 'CONTACT') {
                    document.querySelector('.footer').scrollIntoView({ behavior: 'smooth' });
                } else {
                    showNotification(`Navigating to ${text} page...`, 'info');
                }
            });
        });

        // Login functionality
        document.querySelector('.login-btn').addEventListener('click', function(e) {
            e.preventDefault();
            showLoginModal();
        });

        function showLoginModal() {
            // Create modal overlay
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 2000;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            // Create modal content
            const modal = document.createElement('div');
            modal.style.cssText = `
                background: white;
                padding: 40px;
                border-radius: 12px;
                width: 400px;
                max-width: 90vw;
                text-align: center;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            `;
            
            modal.innerHTML = `
                <h2 style="color: #be6e6e; margin-bottom: 20px; font-family: 'Inter', sans-serif;">Welcome to Veluvia</h2>
                <form id="loginForm">
                    <input type="email" placeholder="Email" required style="width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #ffc0cb; border-radius: 8px; font-size: 16px;">
                    <input type="password" placeholder="Password" required style="width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #ffc0cb; border-radius: 8px; font-size: 16px;">
                    <button type="submit" style="width: 100%; padding: 12px; margin: 20px 0 10px; background: #ffc0cb; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; color: #744a33; font-weight: 500;">Login</button>
                </form>
                <p style="margin: 10px 0; color: #666;">Don't have an account? <a href="#" style="color: #be6e6e;">Sign up</a></p>
                <button onclick="closeModal()" style="background: none; border: none; color: #999; cursor: pointer; margin-top: 10px;">Close</button>
            `;
            
            overlay.appendChild(modal);
            document.body.appendChild(overlay);
            
            // Handle form submission
            document.getElementById('loginForm').addEventListener('submit', function(e) {
                e.preventDefault();
                showNotification('Login successful! Welcome to Veluvia!', 'success');
                closeModal();
            });
            
            // Close modal function
            window.closeModal = function() {
                document.body.removeChild(overlay);
            };
            
            // Close on overlay click
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    closeModal();
                }
            });
        }

        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .category-item.active {
                transform: translateY(-5px);
                box-shadow: 0 10px 25px rgba(190, 110, 110, 0.2);
            }
        `;
        document.head.appendChild(style);

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            showNotification('Welcome to Veluvia! 💄', 'success');
            
            // Add smooth scrolling to all internal links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
        });

         // Social media links
        function openSocialLink(platform) {
            let url = '';
            switch(platform) {
                case 'facebook':
                    url = 'https://www.facebook.com/share/15ifE8FHE6/';
                    break;
                case 'instagram':
                    url = 'https://www.instagram.com/soketthoung?igsh=OGxqeWV5andpMGZu';
                    break;
            }
            if (url) {
                window.open(url, '_blank');
            }
        }
        // Search functionality (if search bar is added)
        function searchProducts(query) {
            const productCards = document.querySelectorAll('.product-card');
            const searchTerm = query.toLowerCase();
            
            productCards.forEach(card => {
                const productName = card.querySelector('.product-name').textContent.toLowerCase();
                if (productName.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Wishlist functionality
        let wishlist = [];

        function toggleWishlist(productId) {
            const index = wishlist.indexOf(productId);
            if (index > -1) {
                wishlist.splice(index, 1);
                showNotification('Removed from wishlist', 'info');
            } else {
                wishlist.push(productId);
                showNotification('Added to wishlist! 💖', 'success');
            }
        }

        // Product quick view functionality
        function quickView(productId) {
            showNotification('Opening quick view...', 'info');
            // This would open a product quick view modal
        }

        // Newsletter signup
        function subscribeNewsletter(email) {
            if (email && email.includes('@')) {
                showNotification('Thank you for subscribing! 💌', 'success');
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        }