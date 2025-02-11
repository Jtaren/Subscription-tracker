import express from 'express';

import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the Subscription Tracker API!'); // Correct way to send a string
});

const hostname = 'localhost'; // Define hostname as a variable

app.listen(PORT, hostname, () => { // Correct way to use app.listen
    console.log(`Subscription Tracker API is running on http://${hostname}:${PORT}`); // Template literal for cleaner output
});

export default app;