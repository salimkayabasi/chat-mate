import { Router } from 'express';
import React from 'react';
import Chat from '../components/chat';
import { auth } from '../middlewares/';
import render from '../render/';

export default () => {
  const router = Router();
  router.get('/chat', auth, render({
    title: 'chat',
    component: <Chat />,
    jsPath: 'bundle.js',
  }));
  return router;
};
