import { useState } from 'react'
import './App.css'
import Navigation from './Navigation'
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Articles from './pages/Articles';
import Topics from './pages/Topics';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/articles" element={<Articles />}/>
        <Route path="/topics" element={<Topics />}/>
      </Routes>
    </>
  )
}

export default App
