import { Router } from 'express';
import React from 'react';
import Chat from '../components/chat';
import { auth } from '../middlewares/';
import render, { getFileName } from '../render/';

export default () => {
  const router = Router();
  router.get('/chat', auth, (req, res) => {
    render({
      title: 'chat',
      component: <Chat user={req.user}/>,
      jsPath: getFileName('bundle'),
      initial: {
        user: req.user,
      },
    })(req, res);
  });
  return router;
};
