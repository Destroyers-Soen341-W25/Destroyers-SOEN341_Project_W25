document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.login-button').addEventListener('click', async (e) => {
        e.preventDefault();
        const email = document.querySelector('.form-box-login input[type="email"]').value;
        const password = document.querySelector('.form-box-login input[type="password"]').value;
        
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            alert('Login successful!');
            window.location.reload();
        } else {
            alert(data.error);
        }
    });

    document.querySelector('.form-box-register .login-button').addEventListener('click', async (e) => {
        e.preventDefault();
        const name = document.querySelector('.form-box-register input[type="text"]').value;
        const email = document.querySelector('.form-box-register input[type="email"]').value;
        const password = document.querySelector('.form-box-register input[type="password"]').value;
        const isAdmin = document.querySelector('.form-box-register input[type="checkbox"]').checked;

        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, isAdmin })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Registration successful! Please log in.');
        } else {
            alert(data.error);
        }
    });

    async function getUser(name) {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to view user data.");
            return;
        }

        const response = await fetch(`http://localhost:3000/users/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        console.log("User Info:", data);
    }

    // Example Usage (Replace "JohnDoe" with actual username to fetch)
    // getUser("JohnDoe");
});
