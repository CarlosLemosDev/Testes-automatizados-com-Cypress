const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota padrão para teste
app.get('/', (req, res) => {
    res.json({ message: 'Mock server is running' });
});

// Rota para a página de login
app.get('/index.php', (req, res) => {
    if (req.query.controller === 'authentication') {
        res.send(`
            <!DOCTYPE html>
            <html>
                <body>
                    <form id="login_form" method="post">
                        <input type="email" name="email" />
                        <input type="password" name="passwd" />
                        <button type="submit">Sign in</button>
                    </form>
                </body>
            </html>
        `);
    }
});

// Rota para autenticação
app.post('/index.php', (req, res) => {
    if (req.query.controller === 'authentication') {
        const { email, passwd } = req.body;
        
        if (email === 'user@test.com' && passwd === 'password123') {
            res.json({
                authenticated: true,
                customer: {
                    id: 1,
                    email: 'user@test.com',
                    firstname: 'John',
                    lastname: 'Doe',
                    logged: 1
                },
                hasError: false
            });
        } else {
            res.status(400).json({
                authenticated: false,
                errors: ['Authentication failed.'],
                hasError: true
            });
        }
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor mock rodando em http://localhost:${PORT}`);
});
