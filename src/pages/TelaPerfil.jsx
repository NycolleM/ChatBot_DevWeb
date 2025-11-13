import React, { useState, useEffect } from 'react';
import { BiArrowBack, BiLogOut, BiEdit } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import uniforlogo from '../imagens/uniforlogo.png';
import axios from 'axios';
import InputMask from 'react-input-mask';

export default function TelaPerfil() {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    nome: '',
    email: '',
    bairro: '',
    cnpj: '',
    telefone: '',
  });
  const [senha, setSenha] = useState({ atual: '', nova: '', confirmar: '' });
  
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const info = localStorage.getItem('userInfo');
    if (!info) {
      navigate('/telalogin');
      return;
    }

    const userData = JSON.parse(info);
    setUserInfo(userData);

    const fetchUsuario = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/usuarios/${userData._id}`);
        setForm({
          nome: data.nome,
          email: data.email,
          bairro: data.bairro || '',
          cnpj: data.cnpj || data.cpf || '',
          telefone: data.telefone || '',
        });
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUsuario();
  }, [navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  const handleSair = () => {
    localStorage.removeItem('userInfo');
    navigate('/telalogin');
  };

  const handleSalvar = async () => {
    if (!userInfo) return;

    try {
      const { data } = await axios.put(`http://localhost:3000/api/usuarios/${userInfo._id}`, form);
      
      setForm({
        nome: data.nome,
        email: data.email,
        bairro: data.bairro || '',
        cnpj: data.cnpj || data.cpf || '',
        telefone: data.telefone || '',
      });
    } catch (error) {
      const msg = error.response?.data?.msg || "Erro ao salvar perfil";
      console.error(msg);
      alert(`Erro: ${msg}`);
    }
  };

  const handleAtualizarSenha = async () => {
    if (!userInfo) return;

    if (senha.nova !== senha.confirmar) {
      return;
    }

    try {
      const { data } = await axios.put(`http://localhost:3000/api/usuarios/alterar-senha/${userInfo._id}`, {
        senhaAtual: senha.atual,
        novaSenha: senha.nova,
        confirmarNovaSenha: senha.confirmar
      });
      
      alert(data.msg);
      setSenha({ atual: '', nova: '', confirmar: '' });
    } catch (error) {
      const msg = error.response?.data?.msg || "Erro ao atualizar senha";
      console.error(msg);
      alert(`Erro: ${msg}`);
    }
  };

  const docLimpo = (form.cnpj || '').replace(/[^\d]/g, '');
  const mask = docLimpo.length > 11 
    ? '99.999.999/9999-99'
    : '999.999.999-99';

  return (
    <div className="h-screen w-screen bg-background">
      <nav className="bg-[#e6e6e6ff] shadow-md sticky top-0 z-50">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4 mx-32">
            <img src={uniforlogo} alt="Logo NAF" className="h-10 w-10 drop-shadow-lg"/>
            <span className="[text-shadow:_0_2px_4px_rgb(168_168_168_/_0.3)] text-primary text-xl font-bold">NAF</span>
          </div>
          <div className="hidden md:flex items-center text-sm">
            <a href="/telaacesso" className=" p-2">Início</a>
            <Link to="/telachat" className="mx-6 p-2">Chat</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#fcfcfc] shadow hover:scale-[1.01] transition">
            <BiArrowBack/> Voltar
          </button>
          <button onClick={handleSair} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#fcfcfc] shadow hover:scale-[1.01] transition">
            <BiLogOut/> Sair
          </button>
        </div>

        <section className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-[#fcfcfc] rounded-2xl shadow p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full bg-primary/10 grid place-items-center text-primary text-3xl font-bold">
                {form.nome?.[0]?.toUpperCase() || 'U'}
              </div>
              <h2 className="mt-4 text-xl font-semibold text-[#0d2385]">{form.nome}</h2>
              <p className="text-sm text-gray-600">{form.bairro} • {form.cnpj}</p>
            </div>
            <div className="mt-6 space-y-3 text-sm">
              <div><span className="font-medium">E-mail: </span>{form.email}</div>
              <div><span className="font-medium">Telefone: </span>{form.telefone}</div>
            </div>
          </div>

          <div className="md:col-span-2 bg-[#fcfcfc] rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold text-[#0d2385] flex items-center gap-2"><BiEdit/> Editar informações</h3>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <label className="flex flex-col text-sm"> Nome <input className="mt-1 rounded-xl border p-2" name="nome" value={form.nome} onChange={handleChange}/></label>
              <label className="flex flex-col text-sm"> E-mail <input className="mt-1 rounded-xl border p-2" name="email" value={form.email} onChange={handleChange}/></label>
              <label className="flex flex-col text-sm"> Bairro <input className="mt-1 rounded-xl border p-2" name="bairro" value={form.bairro} onChange={handleChange}/></label>
             <label className="flex flex-col text-sm"> CNPJ/CPF 
                <InputMask 
                  className="mt-1 rounded-xl border p-2"
                  name="cnpj"
                  value={form.cnpj} 
                  onChange={handleChange}
                  mask={mask}
                  maskChar={null}
                />
              </label>
              <label className="flex flex-col text-sm md:col-span-2"> Telefone <input className="mt-1 rounded-xl border p-2" name="telefone" value={form.telefone} onChange={handleChange}/></label>
            </div>
            <div className="mt-4 flex gap-3">
              <button onClick={handleSalvar} className="px-4 py-2 rounded-xl bg-primary text-white shadow hover:opacity-90 transition">Salvar</button>
              <Link to="/telahistorico" className="px-4 py-2 rounded-xl bg-primary/10 text-[#0d2385] shadow hover:bg-primary/15 transition">Ver histórico</Link>
            </div>

            <div className="mt-8">
              <h4 className="text-sm font-semibold text-[#0d2385]">Alterar senha</h4>
              <div className="grid md:grid-cols-3 gap-3 mt-2">
                <input className="rounded-xl border p-2" type="password" placeholder="Senha atual" value={senha.atual} onChange={e=>setSenha(s=>({...s,atual:e.target.value}))}/>
                <input className="rounded-xl border p-2" type="password" placeholder="Nova senha" value={senha.nova} onChange={e=>setSenha(s=>({...s,nova:e.target.value}))}/>
                <input className="rounded-xl border p-2" type="password" placeholder="Confirmar nova senha" value={senha.confirmar} onChange={e=>setSenha(s=>({...s,confirmar:e.target.value}))}/>
              </div>
              <button onClick={handleAtualizarSenha} className="mt-3 px-4 py-2 rounded-xl bg-primary/10 text-[#0d2385] shadow hover:scale-[1.01] transition">Atualizar senha</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}