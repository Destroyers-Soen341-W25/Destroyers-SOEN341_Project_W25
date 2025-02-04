import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

app.get('/', (req,res) => res.send('Hello from homepage.'));

app.post('/message', (req, res) => {
    const { message } = req.body;
    console.log(`Received message: ${message}`);
    res.json({ response: `Message received: ${message}` });
});


app.listen(PORT, () => console.log(`Server running on Port: http://localhost${PORT}`))

localStorage