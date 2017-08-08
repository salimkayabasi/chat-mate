import { Router } from 'express';
import { auth } from '../middlewares/';
import render from '../render/';

export default () => {
  const router = Router();
  router.get('/chat', auth, render('chat'));
  return router;
};
