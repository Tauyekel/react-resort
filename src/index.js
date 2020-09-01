import React from 'react'
import {render} from 'react-dom'
// import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App'
import {RoomProvider} from './context'

render(
  <RoomProvider>
    <Router>
      <App />
    </Router>
  </RoomProvider>,
  document.getElementById('root')
);
