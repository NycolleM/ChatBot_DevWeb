import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TelaInicial from './pages/TelaInicial'
import TelaLogin from './pages/TelaLogin'
import TelaChat from './pages/TelaChat'

function App() {
  return (
    <Routes>
      <Route path="/" element={<TelaLogin />} />
      <Route path="/telainicial" element={<TelaInicial />} />
      <Route path="/telachat" element={<TelaChat />} />
    </Routes>
  )
}

export default App