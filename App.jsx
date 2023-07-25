import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './src/pages/Home/Home.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </>
  )
}

export default App
