import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiSend, BiTrash, BiHistory } from 'react-icons/bi';
import axios from 'axios';
import uniforlogo from '../imagens/uniforlogo.png';

const FAQ = [
  'Quem é obrigado a declarar imposto de renda?',
  'Quem posso colocar como dependente?',
  'Qual o prazo para entregar a declaração?',
  'Qual o limite de dedução com educação?',
];

export default function TelaChat() {
  const [msg, setMsg] = useState('');
  const [mensagens, setMensagens] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  useEffect(() => {
    const info = localStorage.getItem('userInfo');
    if (info) {
      setUserInfo(JSON.parse(info));
    }
  }, []);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens, loading]);
  async function enviar(texto) {
    const pergunta = (texto ?? msg).trim();
    if (!pergunta) return;
    const novaUsuario = { role: 'user', text: pergunta, ts: Date.now() };
    setMensagens(prev => [...prev, novaUsuario]);
    setMsg('');
    setLoading(true);

    try {
      const payload = {
        pergunta: pergunta,
        usuarioId: userInfo?._id || userInfo?.id,
        chatId: sessionId 
      };

      const response = await axios.post('http://localhost:3000/api/ia/chat', payload);
      
      const textoResposta = response.data.resposta || "Não recebi uma resposta válida.";

      if (response.data.chatId) {
        setSessionId(response.data.chatId);
      }
      const respostaBot = { role: 'bot', text: textoResposta, ts: Date.now() + 1 };
      setMensagens(prev => [...prev, respostaBot]);

    } catch (error) {
      console.error("Erro na requisição:", error);
      const erroBot = { 
        role: 'bot', 
        text: "⚠️ Desculpe, não consegui conectar ao servidor do NAF. Verifique se você está logado.", 
        ts: Date.now() + 1 
      };
      setMensagens(prev => [...prev, erroBot]);
    } finally {
      setLoading(false);
    }
  }
  function limpar() {
    setMensagens([]);
    setSessionId(null);
  }

  return (
    <div className="h-screen w-screen bg-background">

      <nav className="bg-[#e6e6e6ff] shadow-md sticky top-0 z-50">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4 mx-4 md:mx-32">
            <img src={uniforlogo} alt="Logo NAF" className="h-10 w-10 drop-shadow-lg" />
            <span className="text-primary text-xl font-bold [text-shadow:_0_2px_4px_rgb(168_168_168_/_0.5)]">NAF</span>
          </div>
          <div className="hidden md:flex items-center text-sm">
            <Link to="/telaacesso" className="mx-6 p-2 hover:text-blue-800 transition">Início</Link>
            <Link to="/telahistorico" className="mx-6 p-2 hover:text-blue-800 transition">Histórico</Link>
            <Link to="/telaperfil" className="mx-6 p-2 hover:text-blue-800 transition">Perfil</Link>
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-4 py-6 grid md:grid-cols-3 gap-6">

        <aside className="bg-[#fcfcfc] rounded-2xl shadow p-4 h-fit md:sticky md:top-24">
          <h2 className="text-[#0d2385] font-semibold mb-3">Dúvidas frequentes</h2>
          <div className="space-y-2">
            {FAQ.map((f, i) => (
              <button 
                key={i} 
                onClick={() => enviar(f)} 
                disabled={loading}
                className="w-full text-left rounded-xl px-3 py-2 bg-primary/10 hover:bg-primary/20 transition text-sm text-blue-900 disabled:opacity-50"
              >
                {f}
              </button>
            ))}
          </div>
          <div className="mt-4 text-xs text-gray-500 border-t pt-2">
            IA baseada no manual oficial do IRPF 2024.
          </div>
        </aside>
        <section className="md:col-span-2 bg-[#fcfcfc] rounded-2xl shadow flex flex-col h-[70vh] md:h-[80vh]">

          <div className="flex items-center justify-between p-4 border-b bg-white rounded-t-2xl">
            <div className="font-semibold text-[#0d2385] flex flex-col">
              <span>Assistente NAF</span>
              {userInfo && <span className="text-xs text-gray-400 font-normal">Olá, {userInfo.nome}</span>}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={limpar} 
                title="Começar nova conversa"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-sm text-gray-700 transition"
              >
                <BiTrash /> Nova Conversa
              </button>
              <Link 
                to="/telahistorico" 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-sm text-blue-700 transition"
              >
                <BiHistory /> Histórico
              </Link>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
            {mensagens.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
                <BiSend size={40} className="mb-2 opacity-20" />
                <p>Olá! Sou o assistente virtual do NAF.</p>
                <p>Tire suas dúvidas sobre Imposto de Renda.</p>
              </div>
            )}
            
            {mensagens.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm whitespace-pre-wrap text-sm leading-relaxed
                    ${m.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'}`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-50 border border-gray-100 text-gray-500 rounded-2xl rounded-bl-none px-4 py-2 shadow-sm w-fit text-xs italic flex items-center gap-2">
                  <span className="animate-pulse">●</span>
                  <span className="animate-pulse delay-75">●</span>
                  <span className="animate-pulse delay-150">●</span>
                  Digitando...
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <form className="p-4 border-t bg-white rounded-b-2xl flex gap-3" onSubmit={(e) => { e.preventDefault(); enviar(); }}>
            <input 
              className="flex-1 rounded-xl border border-gray-200 bg-gray-50 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition disabled:opacity-50" 
              placeholder={loading ? "Aguarde a resposta..." : "Digite sua dúvida aqui..."} 
              value={msg} 
              onChange={e => setMsg(e.target.value)}
              disabled={loading}
            />
            <button 
              type="submit" 
              disabled={loading || !msg.trim()}
              className="rounded-xl px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 inline-flex items-center gap-2 transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              <BiSend size={20} />
            </button>
          </form>

        </section>
      </main>
    </div>
  );
}