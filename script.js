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
    } else {
        alert(data.error);
    }
});

async function registerUser() {
    const userData = {
        name: "JohnDoe",
        email: "john@example.com",
        password: "123456",
        isAdmin: false
    };

    const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });

    const data = await response.json();
    console.log("Registration Response:", data);
}

async function loginUser() {
    const credentials = {
        email: "john@example.com",
        password: "123456"
    };

    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });

    const data = await response.json();
    console.log("Login Response:", data);
    
    // Store JWT token for future requests
    if (data.token) {
        localStorage.setItem("jwt", data.token);
    }
}

async function getUser(name) {
    const token = localStorage.getItem("jwt"); // Retrieve token

    const response = await fetch(`http://localhost:3000/users/${name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Send token for authentication
        }
    });

    const data = await response.json();
    console.log("User Info:", data);
}


registerUser();
loginUser();
getUser("JohnDoe");

