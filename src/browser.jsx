import React from 'react';
import { render } from 'react-dom';
import Chat from './components/chat';

// eslint-disable-next-line no-underscore-dangle
render(<Chat {...window.__APP_INITIAL_STATE__} />, document.getElementById('root'));
