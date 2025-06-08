document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const hasilElement = document.getElementById('hasil');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        cekLogin();
    });
    
    function cekLogin() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        
        if (!username || !password) {
            showResult('Username dan password harus diisi', false);
            return;
        }

        if (username === 'admin' && password === '1234') {
            showResult('Login berhasil!', true);
            // window.location.href = 'dashboard.html';
        } else {
            showResult('Username atau password salah', false);
        }
    }
    
    function showResult(message, isSuccess) {
        hasilElement.textContent = message;
        hasilElement.className = isSuccess ? 'result-message success' : 'result-message';
        
        setTimeout(() => {
            if (hasilElement.textContent === message) {
                hasilElement.textContent = '';
                hasilElement.className = 'result-message';
            }
        }, 3000);
    }
});