import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TelaInicial from './pages/TelaInicial'
import TelaLogin from './pages/TelaLogin'
import TelaChat from './pages/TelaChat'
import TelaAcesso from './pages/TelaAcesso'
import TelaPerfil from './pages/TelaPerfil'
import TelaPerfilAdmin from './pages/TelaPerfilAdmin'
import TelaHistorico from './pages/TelaHistorico'
import TelaLoginAdmin from './pages/TelaLoginAdmin'
import TelaRecuperarSenha from './pages/TelaRecuperarSenha';
function App() {
  return (
    <Routes>
      <Route path="/" element={<TelaInicial />} />
      <Route path="/telalogin" element={<TelaLogin />} />
      <Route path="/telaacesso" element={<TelaAcesso />} /> 
      <Route path="/telachat" element={<TelaChat />} />
      <Route path="/telaperfil" element={<TelaPerfil />} />
      <Route path="/telahistorico" element={<TelaHistorico />} />
      <Route path="/telaloginadmin" element={<TelaLoginAdmin />} />
      <Route path="/telaperfiladmin" element={<TelaPerfilAdmin />} />
      <Route path="/recuperar-senha" element={<TelaRecuperarSenha />} />
    </Routes>
  )
}

export default App