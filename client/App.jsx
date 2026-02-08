import React from 'react'
// import QOTD from './pages/QOTD'
import Login from '../frontend/Login'

function App() {
  // return <QOTD />
  return <Login onLogin={(data) => console.log('Login submitted:', data)} />
}

export default App
