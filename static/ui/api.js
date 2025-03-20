export { register, login, is }
async function register(registerData, loginTab, loginForm, registerTab, registerForm) {
    try {
        const response = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData),
        });
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        console.log(response.ok)
        if (response.ok) {
            localStorage.setItem("success", data.success);
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
            return
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    }
}
async function login(loginData) {
    try {
        const response = await fetch("/sign-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        if (response.ok) {
            console.log("loggedwith succes")
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
const is = async () => {
    try {
        let resp = await fetch('/auth')
        return resp.ok
    } catch (error) {
        return false
    }

}