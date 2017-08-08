import { Router } from 'express';

export default () => {
  const router = Router();
  router.post('/login', (req, res) => {
    res.redirect('/chat');
  });
  return router;
};
