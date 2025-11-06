
import React, { useState } from 'react';
import { BiArrowBack, BiLogOut, BiEdit } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import uniforlogo from '../imagens/uniforlogo.png';

export default function TelaPerfil() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    // nome: 'Maria Eduarda',
    // email: 'maria.ricoy@edu.unifor.br',
    // curso: 'Ciências Contábeis',
    // periodo: '4º semestre',
    // telefone: '(85) 90000-0000',
  });
  const [senha, setSenha] = useState({ atual:'', nova:'', confirmar:'' });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function salvar() {
    localStorage.setItem('perfil_usuario', JSON.stringify(form));
    alert('Perfil atualizado!');
  }

  return (
    <div className="h-screen w-screen bg-background">

      <nav className="bg-[#e6e6e6ff] shadow-md sticky top-0 z-50">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4 mx-32">
            <img src={uniforlogo} alt="Logo NAF" className="h-10 w-10 drop-shadow-lg"/>
            <span className="[text-shadow:_0_2px_4px_rgb(168_168_168_/_0.3)] text-primary text-xl font-bold">NAF</span>
          </div>
          <div className="hidden md:flex items-center text-sm">
            <a href="/telaacesso" className="mx-6 p-2">Início</a>
            <Link to="/telaloginadmin" className="mx-6 p-2">Administrador</Link>
            <Link to="/telahistorico" className="mx-6 p-2">Histórico</Link>
            <Link to="/telachat" className="mx-6 p-2">Chat</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#fcfcfc] shadow hover:scale-[1.01] transition">
            <BiArrowBack/> Voltar
          </button>
          <button onClick={()=>navigate('/telalogin')} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#fcfcfc] shadow hover:scale-[1.01] transition">
            <BiLogOut/> Sair
          </button>
        </div>

        <section className="grid md:grid-cols-3 gap-6">

          {/* Perfil */}

          <div className="md:col-span-1 bg-[#fcfcfc] rounded-2xl shadow p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full bg-primary/10 grid place-items-center text-primary text-3xl font-bold">
                {form.nome?.[0] || 'U'}
              </div>
              <h2 className="mt-4 text-xl font-semibold text-[#0d2385]">{form.nome}</h2>
              <p className="text-sm text-gray-600">{form.curso} • {form.periodo}</p>
            </div>
            <div className="mt-6 space-y-3 text-sm">
              <div><span className="font-medium">E-mail: </span>{form.email}</div>
              <div><span className="font-medium">Telefone: </span>{form.telefone}</div>
            </div>
          </div>

          {/* Informações do perfil gnt*/}

          <div className="md:col-span-2 bg-[#fcfcfc] rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold text-[#0d2385] flex items-center gap-2"><BiEdit/> Editar informações</h3>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <label className="flex flex-col text-sm"> Nome <input className="mt-1 rounded-xl border p-2" name="nome" value={form.nome} onChange={handleChange}/></label>
              <label className="flex flex-col text-sm"> E-mail <input className="mt-1 rounded-xl border p-2" name="email" value={form.email} onChange={handleChange}/></label>
              <label className="flex flex-col text-sm"> Curso <input className="mt-1 rounded-xl border p-2" name="curso" value={form.curso} onChange={handleChange}/></label>
              <label className="flex flex-col text-sm"> Período <input className="mt-1 rounded-xl border p-2" name="periodo" value={form.periodo} onChange={handleChange}/></label>
              <label className="flex flex-col text-sm md:col-span-2"> Telefone <input className="mt-1 rounded-xl border p-2" name="telefone" value={form.telefone} onChange={handleChange}/></label>
            </div>
            <div className="mt-4 flex gap-3">
              <button onClick={salvar} className="px-4 py-2 rounded-xl bg-primary text-white shadow hover:opacity-90 transition">Salvar</button>
              <Link to="/telahistorico" className="px-4 py-2 rounded-xl bg-primary/10 text-[#0d2385] shadow hover:bg-primary/15 transition">Ver histórico</Link>
            </div>

            <div className="mt-8">
              <h4 className="text-sm font-semibold text-[#0d2385]">Alterar senha</h4>
              <div className="grid md:grid-cols-3 gap-3 mt-2">
                <input className="rounded-xl border p-2" type="password" placeholder="Senha atual" value={senha.atual} onChange={e=>setSenha(s=>({...s,atual:e.target.value}))}/>
                <input className="rounded-xl border p-2" type="password" placeholder="Nova senha" value={senha.nova} onChange={e=>setSenha(s=>({...s,nova:e.target.value}))}/>
                <input className="rounded-xl border p-2" type="password" placeholder="Confirmar nova senha" value={senha.confirmar} onChange={e=>setSenha(s=>({...s,confirmar:e.target.value}))}/>
              </div>
              <button className="mt-3 px-4 py-2 rounded-xl bg-primary/10 text-[#0d2385] shadow hover:scale-[1.01] transition">Atualizar senha</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}