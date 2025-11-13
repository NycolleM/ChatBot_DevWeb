import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiSend, BiBookmark, BiTrash, BiHistory } from 'react-icons/bi';
import uniforlogo from '../imagens/uniforlogo.png';

const FAQ = [
  'Como emitir CPF pela primeira vez?',
  'Como faço a declaração do Imposto de Renda?',
  'Quem tem direito à isenção de MEI?',
  'Como agendar atendimento no NAF?',
  'Quais documentos levar para orientação fiscal?'
];

function respostaSimulada(pergunta) {
  const p = pergunta.toLowerCase();
  if (p.includes('cpf')) return 'Para primeira via do CPF, leve documento oficial com foto e certidão de nascimento. No NAF, orientamos o passo a passo e o agendamento.';
  if (p.includes('imposto') || p.includes('renda')) return 'A declaração do IR depende de sua renda e bens. No NAF, orientamos gratuitamente: traga informes de rendimento, comprovantes de despesas e documentos pessoais.';
  if (p.includes('mei')) return 'MEI possui isenção de tributos federais (exceto INSS/ISS/ICMS conforme atividade). Podemos orientar a formalização e as obrigações mensais (DAS).';
  if (p.includes('agend')) return 'O agendamento do NAF ocorre via portal da Unifor ou presencialmente no balcão do NAF. Horário: seg-sex, 8h-17h.';
  if (p.includes('document')) return 'Documentos básicos: RG/CPF, comprovante de residência, e materiais relacionados à demanda (ex.: informes, notas, recibos).';
  return 'Registro sua dúvida! Um(a) aluno(a) do NAF responderá com orientação conforme sua necessidade. Para casos específicos, recomendaremos atendimento presencial.';
}
function salvarOuAtualizarHistorico(session) {
  const all = JSON.parse(localStorage.getItem('naf_chat_historico') || '[]');
  const existingIndex = all.findIndex(item => item.id === session.id);

  if (existingIndex > -1) {
    all[existingIndex] = session;
  } else {
    all.unshift(session);
  }
  
  localStorage.setItem('naf_chat_historico', JSON.stringify(all.slice(0, 100)));
}

export default function TelaChat() {
  const [msg, setMsg] = useState('');
  const [mensagens, setMensagens] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const endRef = useRef(null);

  useEffect(() => {
    const info = localStorage.getItem('userInfo');
    if (info) {
      setUserInfo(JSON.parse(info));
    }
  }, []);

  useEffect(() => {
    if (mensagens.length === 0) {
      return;
    }
    const currentSessionId = sessionId ?? Date.now();
    if (!sessionId) {
      setSessionId(currentSessionId);
    }
    const titulo = mensagens.find(m => m.role === 'user')?.text?.slice(0, 60) || 'Conversa NAF';
    const session = { 
      id: currentSessionId, 
      titulo, 
      createdAt: new Date().toISOString(), 
      mensagens,
      usuarioNome: userInfo ? userInfo.nome : 'Usuário'
    };
    salvarOuAtualizarHistorico(session);

  }, 

  [mensagens, userInfo]);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens]);

  function enviar(texto) {
    const pergunta = (texto ?? msg).trim();
    if (!pergunta) return;
    const nova = { role: 'user', text: pergunta, ts: Date.now() };
    const resposta = { role: 'bot', text: respostaSimulada(pergunta), ts: Date.now() + 1 };
    setMensagens(prev => [...prev, nova, resposta]);
    setMsg('');
  }
  function limpar() {
    setMensagens([]);
    setSessionId(null);
  }

  return (
    <div className="h-screen w-screen bg-background">

      <nav className="bg-[#e6e6e6ff] shadow-md sticky top-0 z-50">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4 mx-32">
            <img src={uniforlogo} alt="Logo NAF" className="h-10 w-10 drop-shadow-lg" />
            <span className="text-primary text-xl font-bold [text-shadow:_0_2px_4px_rgb(168_168_168_/_0.5)]">NAF</span>
          </div>
          <div className="hidden md:flex items-center text-sm">
            <a href="/telaacesso" className="mx-6 p-2">Início</a>
            <Link to="/telahistorico" className="mx-6 p-2">Histórico</Link>
            <Link to="/telaperfil" className="mx-6 p-2">Perfil</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-6 grid md:grid-cols-3 gap-6">

        <aside className="bg-[#fcfcfc] rounded-2xl shadow p-4 h-fit md:sticky md:top-20">
          <h2 className="text-[#0d2385] font-semibold mb-3">Dúvidas frequentes</h2>
          <div className="space-y-2">
            {FAQ.map((f, i) => (
              <button key={i} onClick={() => enviar(f)} className="w-full text-left rounded-xl px-3 py-2 bg-primary/10 hover:bg-primary/15 transition text-sm">{f}</button>
            ))}
          </div>
          <div className="mt-4 text-xs text-gray-500">As respostas são simuladas para fins acadêmicos.</div>
        </aside>

        <section className="md:col-span-2 bg-[#fcfcfc] rounded-2xl shadow flex flex-col min-h-[70vh]">
          <div className="flex items-center justify-between p-3 border-b">
            <div className="font-semibold text-[#0d2385]">Assistente NAF</div>
            <div className="flex gap-2">
              <button onClick={limpar} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-[#dcdcdc] text-sm shadow"><BiTrash /> Limpar</button>
              <Link to="/telahistorico" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/15 text-sm shadow"><BiHistory /> Histórico</Link>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {mensagens.length === 0 && (
              <div className="text-sm text-gray-500">Digite sua dúvida abaixo ou escolha uma pergunta frequente.</div>
            )}
            {mensagens.map((m, idx) => (
              <div key={idx} className={`max-w-[80%] rounded-2xl px-4 py-2 shadow ${m.role === 'user' ? 'bg-primary text-white self-end ml-auto' : 'bg-gray-100 text-gray-800'}`}>
                {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <form className="p-3 border-t flex gap-2" onSubmit={(e) => { e.preventDefault(); enviar(); }}>
            <input className="flex-1 rounded-xl border p-3" placeholder="Escreva sua dúvida..." value={msg} onChange={e => setMsg(e.target.value)} />
            <button type="submit" className="rounded-xl px-4 py-2 bg-primary hover:bg-[#003bc7] text-white shadow inline-flex items-center gap-2"><BiSend /> Enviar</button>
          </form>

        </section>
      </main>
    </div>
  );
}