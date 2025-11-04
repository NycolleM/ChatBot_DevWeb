
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiSearch, BiTrash } from 'react-icons/bi';
import uniforlogo from '../imagens/uniforlogo.png';

export default function TelaHistorico() {
  const [busca, setBusca] = useState('');
  const [itens, setItens] = useState([]);

  useEffect(()=>{
    const all = JSON.parse(localStorage.getItem('naf_chat_historico') || '[]');
    setItens(all);
  }, []);

  function removerTudo() {
    localStorage.removeItem('naf_chat_historico');
    setItens([]);
  }

  const filtrados = useMemo(()=>{
    if (!busca) return itens;
    const q = busca.toLowerCase();
    return itens.filter(s => s.titulo?.toLowerCase().includes(q) || s.mensagens?.some(m => m.text?.toLowerCase().includes(q)));
  }, [busca, itens]);

  return (
    <div className="min-h-screen w-full bg-background">

      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4 mx-8">
            <img src={uniforlogo} alt="Logo NAF" className="h-12 w-12 drop-shadow-lg"/>
            <span className="text-primary text-2xl font-bold">NAF</span>
          </div>
          <div className="hidden md:flex items-center text-sm">
            <a href="/#inicio" className="mx-6 p-2">Início</a>
            <Link to="/telachat" className="mx-6 p-2">Chat</Link>
            <Link to="/telaperfil" className="mx-6 p-2">Perfil</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h1 className="text-2xl font-bold text-[#0d2385]">Histórico do Chat</h1>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 rounded-xl bg-white shadow px-3">
              <BiSearch/>
              <input placeholder="Buscar" value={busca} onChange={e=>setBusca(e.target.value)} className="p-2 outline-none"/>
            </div>
            <button onClick={removerTudo} className="rounded-xl bg-white shadow px-4"> <BiTrash className="inline mr-1"/> Limpar tudo</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filtrados.map(s => (
            <details key={s.id} className="bg-white rounded-2xl shadow p-4">
              <summary className="cursor-pointer font-semibold text-[#0d2385]">{s.titulo || 'Conversa NAF'}</summary>
              <div className="mt-3 space-y-2 max-h-64 overflow-y-auto pr-1">
                {s.mensagens?.map((m, idx)=>(
                  <div key={idx} className={`text-sm rounded-xl px-3 py-2 ${m.role==='user' ? 'bg-primary text-white' : 'bg-gray-100'}`}>
                    {m.text}
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-2">Salvo em {new Date(s.createdAt).toLocaleString()}</div>
            </details>
          ))}
          {filtrados.length === 0 && (
            <div className="col-span-full text-sm text-gray-500">Nenhuma conversa salva ainda.</div>
          )}
        </div>
      </main>
    </div>
  );
}
