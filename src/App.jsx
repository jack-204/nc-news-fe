import { useState } from 'react'
import './App.css'
import Navigation from './Navigation'
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Articles from './pages/Articles';
import Topics from './pages/Topics';
import IndividualArticle from './pages/IndividualArticle';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/articles" element={<Articles />}/>
        <Route path="/topics" element={<Topics />}/>
        <Route path="/articles/:article_id" element={<IndividualArticle />} />
      </Routes>
    </>
  )
}

export default App
