
import React, { useState } from 'react';
import { BiArrowBack, BiLogOut, BiEdit } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import uniforlogo from '../imagens/uniforlogo.png';

export default function TelaPerfilAdmin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: 'Admin NAF',
    email: 'admin@unifor.edu.br',
    cargo: 'Administrador(a)',
    telefone: '(85) 99999-9999',
    horario: 'Seg a Sex, 8h às 17h',
    local: 'Bloco X - Sala NAF',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleLogout() {
    navigate('/login');
  }

  return (
    <div className="h-screen w-screen">

      <nav className="bg-[#e6e6e6ff] shadow-md sticky top-0 z-50">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4 mx-32">
            <img src={uniforlogo} alt="Logo NAF" className="h-10 w-10 drop-shadow-lg"/>
            <span className="[text-shadow:_0_2px_4px_rgb(168_168_168_/_0.3)] text-primary text-xl font-bold">NAF</span>
          </div>
          <div className="hidden md:flex items-center text-sm">
            <a href="/telaacesso" className="mx-6 p-2">Início</a>
            <Link to="/telaperfil" className="mx-6 p-2">Perfil (Usuário)</Link>
            <Link to="/telahistorico" className="mx-6 p-2">Histórico</Link>
            <Link to="/telachat" className="mx-6 p-2">Chat</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow hover:scale-[1.01] transition">
            <BiArrowBack/> Voltar
          </button>
          <button onClick={handleLogout} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow hover:scale-[1.01] transition">
            <BiLogOut/> Sair
          </button>
        </div>

        <section className="grid md:grid-cols-3 gap-6">

          {/* Perfil */}

          <div className="md:col-span-1 bg-white rounded-2xl shadow p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full bg-primary/10 grid place-items-center text-primary text-3xl font-bold">A</div>
              <h2 className="mt-4 text-xl font-semibold text-[#0d2385]">{form.nome}</h2>
              <p className="text-sm text-gray-600">{form.cargo}</p>
            </div>
            <div className="mt-6 space-y-3 text-sm">
              <div><span className="font-medium">E-mail: </span>{form.email}</div>
              <div><span className="font-medium">Telefone: </span>{form.telefone}</div>
              <div><span className="font-medium">Local: </span>{form.local}</div>
              <div><span className="font-medium">Horário: </span>{form.horario}</div>
            </div>
          </div>

          {/* Configurações do Adm NAF, amgs */}

          <div className="md:col-span-2 bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold text-[#0d2385] flex items-center gap-2"><BiEdit/> Configurações do NAF</h3>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <label className="flex flex-col text-sm"> Nome <input className="mt-1 rounded-xl border p-2" name="nome" value={form.nome} onChange={handleChange}/></label>
              <label className="flex flex-col text-sm"> E-mail <input className="mt-1 rounded-xl border p-2" name="email" value={form.email} onChange={handleChange}/></label>
              <label className="flex flex-col text-sm"> Telefone <input className="mt-1 rounded-xl border p-2" name="telefone" value={form.telefone} onChange={handleChange}/></label>
              <label className="flex flex-col text-sm"> Local <input className="mt-1 rounded-xl border p-2" name="local" value={form.local} onChange={handleChange}/></label>
              <label className="flex flex-col text-sm md:col-span-2"> Horário de atendimento <input className="mt-1 rounded-xl border p-2" name="horario" value={form.horario} onChange={handleChange}/></label>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <Link to="/telachat" className="rounded-2xl p-4 bg-primary/10 hover:bg-primary/15 transition shadow text-[#0d2385] text-sm">Gerenciar FAQs do Chat</Link>
              <a href="#" className="rounded-2xl p-4 bg-primary/10 hover:bg-primary/15 transition shadow text-[#0d2385] text-sm">Agenda & Plantões</a>
              <a href="#" className="rounded-2xl p-4 bg-primary/10 hover:bg-primary/15 transition shadow text-[#0d2385] text-sm">Categorias de atendimento</a>
            </div>
          </div>
        </section>

        {/* Ideias de métricas que poderiam ter, não sei */}

        <section className="mt-6 grid md:grid-cols-3 gap-6">
          {['Atendimentos Hoje','Tempo Médio','Satisfação'].map((t,i)=>(
            <div key={i} className="bg-white rounded-2xl shadow p-6">
              <div className="text-sm text-gray-500">{t}</div>
              <div className="mt-2 text-3xl font-bold text-[#0d2385]">{i===0?'23':i===1?'7 min':'4.8/5'}</div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
