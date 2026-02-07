// admin/script.js  

// Function to switch tabs in the admin panel  
function switchTab(tabId) {  
    const tabs = document.querySelectorAll('.tab');  
    tabs.forEach(tab => {  
        tab.style.display = 'none';  
    });  
    document.getElementById(tabId).style.display = 'block';  
}  

// Function to load dashboard data  
async function loadDashboardData() {  
    try {  
        const response = await fetch('/api/dashboard');  
        const data = await response.json();  
        document.getElementById('dashboard').innerText = JSON.stringify(data);  
    } catch (error) {  
        console.error('Error loading dashboard data:', error);  
    }  
}  

// Function to manage orders  
async function manageOrders() {  
    try {  
        const response = await fetch('/api/orders');  
        const orders = await response.json();  
        console.log('Orders:', orders);  
    } catch (error) {  
        console.error('Error fetching orders:', error);  
    }  
}  

// Function to manage payments  
async function managePayments() {  
    try {  
        const response = await fetch('/api/payments');  
        const payments = await response.json();  
        console.log('Payments:', payments);  
    } catch (error) {  
        console.error('Error fetching payments:', error);  
    }  
}  

// Function to configure settings  
async function configureSettings(settings) {  
    try {  
        const response = await fetch('/api/settings', {  
            method: 'POST',  
            headers: { 'Content-Type': 'application/json' },  
            body: JSON.stringify(settings)  
        });  
        const result = await response.json();  
        console.log('Settings updated:', result);  
    } catch (error) {  
        console.error('Error updating settings:', error);  
    }  
}  

// Example usage:  
switchTab('dashboard');  
loadDashboardData();  
manageOrders();  
managePayments();  
configureSettings({ theme: 'dark' });  
