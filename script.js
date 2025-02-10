const container = document.querySelector('.container');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const buttonPopUp = document.querySelector('.LoginButton');
const iconClose = document.querySelector('.icon-close');


registerLink.addEventListener('click', ()=>{
    container.classList.add('active');
});

loginLink.addEventListener('click', () => {
    container.classList.remove('active');
});

buttonPopUp.addEventListener('click', () => {
    container.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
    container.classList.remove('active-popup');
});

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.querySelector(".form-box-register form");
    const loginForm = document.querySelector(".form-box-login form");

    if (registerForm) {
        registerForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            
            const username = registerForm.querySelector("input[placeholder='Username']").value;
            const email = registerForm.querySelector("input[placeholder='Email']").value;
            const password = registerForm.querySelector("input[placeholder='Password']").value;
            const isAdmin = registerForm.querySelector("input[type='checkbox']").checked;
            
            const role = isAdmin ? "admin" : "member";

            try {
                const response = await fetch("http://localhost:3000/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: username, password, role })
                });

                const data = await response.json();
                alert(data.message);
            } catch (error) {
                console.error("Error:", error);
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            
            const username = loginForm.querySelector("input[placeholder='Username']").value;
            const password = loginForm.querySelector("input[placeholder='Password']").value;

            try {
                const response = await fetch("http://localhost:3000/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: username, password })
                });

                const data = await response.json();
                if (response.ok) {
                    alert("Login successful!");
                    localStorage.setItem("user", JSON.stringify(data.user));
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        });
    }
});

function handleAdminRedirect() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user.password == "superadmin" && user.name == "superadmin") {
        alert("Welcome, Admin! Redirecting to Super Admin Dashboard...");
        setTimeout(() => {
            window.location.href = "super-admin.html";
        }, 1000);
    }
}

//to verify
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".form-box-login form");

    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            
            const username = loginForm.querySelector("input[placeholder='Username']").value;
            const password = loginForm.querySelector("input[placeholder='Password']").value;

            try {
                const response = await fetch("http://localhost:3000/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: username, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert(data.message);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    handleAdminRedirect();
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        });
    }
});
