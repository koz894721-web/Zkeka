// Function to select a diamond package
function selectPackage(diamonds, amount) {
    document.getElementById('diamondAmount').textContent = diamonds;
    document.getElementById('amountValue').textContent = amount.toFixed(2);
    document.getElementById('checkout').style.display = 'block';
    document.querySelector('.packages').style.display = 'none';
    document.querySelector('.checkout-section').style.display = 'block';
    window.scrollTo(0, 0);
}

// Function to cancel checkout
function cancelCheckout() {
    document.getElementById('checkout').style.display = 'block';
    document.querySelector('.packages').style.display = 'block';
    document.querySelector('.checkout-section').style.display = 'none';
}

// Function to scroll to packages section
function scrollToPackages() {
    document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
}

// Handle checkout form submission
document.getElementById('checkoutForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const playerId = document.getElementById('playerId').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const diamonds = document.getElementById('diamondAmount').textContent;
    const amount = document.getElementById('amountValue').textContent;
    
    try {
        const response = await fetch('/top-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                playerId: playerId,
                email: email,
                phone: phone,
                diamonds: diamonds,
                amount: amount
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            alert('Order placed successfully! Redirecting to payment...');
            // Redirect to payment gateway
            window.location.href = data.paymentUrl;
        } else {
            alert('Error placing order. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error placing order. Please check your connection and try again.');
    }
});

// Display notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem;
        background-color: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease-in-out;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);