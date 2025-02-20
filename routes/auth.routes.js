import { Router } from 'express';

import { signUp, signIn, signOut } from '../controllers/auth.controllers.js';

const authRouter = Router();

authRouter.post('/sign-up', signUp); // Send a plain object
authRouter.post('/sign-in', signIn); // Send a plain object
authRouter.post('/sign-out', signOut); // Send a plain object

export default authRouter;