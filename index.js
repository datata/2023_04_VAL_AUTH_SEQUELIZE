const express = require('express');
const cors = require('cors');
const db = require('./db');
const router = require('./router');
const auth = require('./middlewares/verifyToken')

const authController = require('./controllers/authController');

const app = express();

const PORT = 4000;;
app.use(cors())
app.use(express.json());

app.get('/health', auth, (req, res) => {
    return res.send('healthy');
});

// gestiona las rutas de router.js
app.use(router);

db.then(() =>
    {
        app.listen(PORT, () => {
            console.log('Server is running on port: ' + PORT);
        })
    }
).catch((error) => {
    console.error('Error starting server', error.message);
})

