document.getElementById('show-register').addEventListener('click', function() {
            document.getElementById('login-form-container').style.display = 'none';
            document.getElementById('register-form-container').style.display = 'block';
        });

        document.getElementById('show-login').addEventListener('click', function() {
            document.getElementById('register-form-container').style.display = 'none';
            document.getElementById('login-form-container').style.display = 'block';
        });

        document.getElementById('register-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('register-email').value;
            const username = document.getElementById('register-username').value;
            const password = document.getElementById('register-password').value;
            const dob = document.getElementById('register-dob').value;
            const gender = document.getElementById('register-gender').value;

            try {
                const response = await fetch('http://192.168.1.146:8080/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, username, password, dob, gender })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                alert(result.message);

                // After successful registration, show the login form
                document.getElementById('register-form-container').style.display = 'none';
                document.getElementById('login-form-container').style.display = 'block';
                document.getElementById('login-username').value = username;
                document.getElementById('login-password').value = '';
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while registering the user.');
            }
        });