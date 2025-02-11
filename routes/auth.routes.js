import { Router } from 'express';

const authRouter = Router();

authRouter.post('/sign-up', (req, res) => res.send({ title: 'Sign Up' })); // Send a plain object
authRouter.post('/sign-in', (req, res) => res.send({ title: 'Sign In' })); // Send a plain object
authRouter.post('/sign-out', (req, res) => res.send({ title: 'Sign Out' })); // Send a plain object

export default authRouter;