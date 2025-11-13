import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiSearch, BiTrash, BiChevronDown } from 'react-icons/bi';
import uniforlogo from '../imagens/uniforlogo.png';

export default function TelaHistorico() {
  const [busca, setBusca] = useState('');
  const [itens, setItens] = useState([]);
  const [openItemId, setOpenItemId] = useState(null);

  useEffect(()=>{
    const all = JSON.parse(localStorage.getItem('naf_chat_historico') || '[]');
    setItens(all);
  }, []);

  const filtrados = useMemo(()=>{
    if (!busca) return itens;
    const q = busca.toLowerCase();
    return itens.filter(s => 
      s.titulo?.toLowerCase().includes(q) || 
      s.usuarioNome?.toLowerCase().includes(q) ||
      s.mensagens?.some(m => m.text?.toLowerCase().includes(q))
    );
  }, [busca, itens]);

  const handleToggle = (id) => {
    setOpenItemId(prevId => (prevId === id ? null : id));
  };

  return (
    <div className="h-screen w-screen relative bg-background">
      <nav className="bg-[#e6e6e6ff] shadow-md sticky top-0 z-50">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4 mx-32">
            <img src={uniforlogo} alt="Logo NAF" className="h-10 w-10 drop-shadow-lg"/>
            <span className="[text-shadow:_0_2px_4px_rgb(168_168_168_/_0.5)] text-primary text-xl font-bold">NAF</span>
          </div>
          <div className="hidden md:flex items-center text-sm">
            <a href="/telaacesso" className="mx-6 p-2">Início</a>
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
          </div>
        </div>

        <div className="space-y-4 mt-6">
          {filtrados.map(s => {
            const isOpen = s.id === openItemId;
            return (
              <div key={s.id} className="bg-white rounded-2xl shadow p-4 transition-all duration-300">
                <button 
                  onClick={() => handleToggle(s.id)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <span className="font-semibold text-[#0d2385] flex-1 pr-4 truncate">
                    {s.titulo || 'Conversa NAF'}
                  </span>
                  <div className="flex items-center space-x-3 flex-shrink-0">
                    {s.usuarioNome && (
                      <div className="text-xs text-gray-500 font-normal"> 
                        Pergunta feita por: {s.usuarioNome}
                      </div>
                    )}
                    <BiChevronDown 
                      className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                      size={20}
                    />
                  </div>
                </button>
                {isOpen && (
                  <div className="mt-4 border-t pt-4">
                    {s.usuarioNome && (
                      <div className="text-xs text-gray-500 mb-2">
                        Chat de: <span className="font-medium text-gray-700">{s.usuarioNome}</span>
                      </div>
                    )}

                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                      {s.mensagens?.map((m, idx)=>(
                        <div key={idx} className={`text-sm rounded-xl px-3 py-2 ${m.role==='user' ? 'bg-primary text-white' : 'bg-gray-100'}`}>
                          {m.text}
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">Salvo em {new Date(s.createdAt).toLocaleString()}</div>
                  </div>
                )}
              </div>
            )
          })}
          
          {filtrados.length === 0 && (
            <div className="text-sm text-gray-500">Nenhuma conversa salva ainda.</div>
          )}
        </div>
      </main>
    </div>
  );
}