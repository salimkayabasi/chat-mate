import { Router } from 'express';
import render from '../render/';

export default () => {
  const router = Router();
  router.get('/chat', render('chat'));
  return router;
};
