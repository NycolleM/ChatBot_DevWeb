import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BiEnvelope, BiLock, BiArrowBack } from 'react-icons/bi';
import uniforlogo from '../imagens/uniforlogo.png'; 

export default function TelaRecuperarSenha() {
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState(1);
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log("Solicitação de recuperação para:", email);
    setMensagem('Se o e-mail estiver correto, um link de recuperação foi enviado.');
    setEtapa(2);
  };

  const handleNovaSenhaSubmit = (e) => {
    e.preventDefault();
    if (novaSenha !== confirmarSenha) {
      setMensagem('As senhas não batem.');
      return;
    }
    if (novaSenha.length < 6) {
      setMensagem('A senha precisa ter no mínimo 6 caracteres.');
      return;
    }
    console.log("Nova senha definida para:", email);
    navigate('/telalogin');
  };

  return (
    <div className="h-screen w-screen bg-background flex items-center justify-center">
      <div className="relative w-[850px] h-[550px] bg-white rounded-[30px] shadow-lg p-10 flex items-center justify-center">
        <div className="w-full max-w-md">

          <div className="flex items-center justify-center space-x-3 mb-6">
            <img src={uniforlogo} alt="Logo NAF" className="h-10 w-10" />
            <span className="text-primary text-xl font-bold">NAF - Recuperar Senha</span>
          </div>
          
          {etapa === 1 && (
            <form onSubmit={handleEmailSubmit}>
              <h2 className="text-lg font-semibold text-center text-[#0d2385] mb-4">
                Esqueceu sua senha?
              </h2>
              <p className="text-sm text-gray-600 text-center mb-6">
                Por favor, digite seu e-mail abaixo para receber um link de recuperação.
              </p>
              <label className="flex flex-col text-sm">
                E-mail
                <div className="relative mt-1">
                  <input 
                    className="w-full rounded-xl border p-3 pl-10" 
                    type="email" 
                    placeholder="seu.email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                  <BiEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </label>

              {mensagem && (
                <p className="text-green-600 text-sm mt-4 text-center">{mensagem}</p>
              )}

              <button 
                type="submit" 
                className="mt-6 w-full px-4 py-3 rounded-xl bg-primary text-white shadow hover:opacity-90 transition"
              >
                Enviar link de recuperação
              </button>
            </form>
          )}

          {etapa === 2 && (
            <form onSubmit={handleNovaSenhaSubmit}>
              <h2 className="text-lg font-semibold text-center text-[#0d2385] mb-4">
                Crie sua nova senha
              </h2>
              <p className="text-sm text-gray-600 text-center mb-6">
                Por favor, digite sua nova senha abaixo.
              </p>

              <label className="flex flex-col text-sm mb-4">
                Nova Senha
                <div className="relative mt-1">
                  <input 
                    className="w-full rounded-xl border p-3 pl-10" 
                    type="password" 
                    placeholder="••••••••"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    required 
                  />
                  <BiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </label>

              <label className="flex flex-col text-sm">
                Confirmar Nova Senha
                <div className="relative mt-1">
                  <input 
                    className="w-full rounded-xl border p-3 pl-10" 
                    type="password" 
                    placeholder="••••••••"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    required 
                  />
                  <BiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </label>

              {mensagem && (
                <p className="text-red-500 text-sm mt-4 text-center">{mensagem}</p>
              )}

              <button 
                type="submit" 
                className="mt-6 w-full px-4 py-3 rounded-xl bg-primary text-white shadow hover:opacity-90 transition"
              >
                Alterar Senha
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link 
              to="/telalogin" 
              className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              <BiArrowBack /> Voltar para o Login
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}