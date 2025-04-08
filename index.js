import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Replace this with your actual Google Apps Script URL
const GAS_URL = 'https://script.google.com/macros/s/AKfycbykK3QZ8vXRgZrkKWTr6tEd82FQoHQikEFciSAVY8xXZCwZc412Qg1zaKypIT5i-PAQ/exec';

app.use(cors());
app.use(express.json());

app.get('/tasks', async (req, res) => {
  try {
    const response = await fetch(GAS_URL);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('GET error:', err);
    res.status(500).json({ error: 'Failed to fetch tasks from Google Apps Script' });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('POST error:', err);
    res.status(500).json({ error: 'Failed to send tasks to Google Apps Script' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
