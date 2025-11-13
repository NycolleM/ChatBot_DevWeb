import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BiUser, BiLock, BiEnvelope, BiArrowBack } from 'react-icons/bi';
import axios from 'axios';

const TelaLoginAdmin = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroLogin, setErroLogin] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErroLogin('');

    try {
      const { data } = await axios.post('http://localhost:3000/api/admin/login', {
        email: email,
        senha: senha
      });

      console.log('Login de Admin bem-sucedido:', data);
      localStorage.setItem('adminInfo', JSON.stringify(data));

      navigate('/telaperfiladmin');

    } catch (error) {
      const msg = error.response?.data?.msg || "Erro desconhecido ao logar";
      console.error('Erro no login do Admin:', msg);
      setErroLogin(msg);
    }
  };

  return (
    <div className={`relative w-[850px] h-[550px] bg-white rounded-[30px] shadow-lg overflow-hidden ${isActive ? 'active' : ''}`}>
      <div className={`absolute right-0 w-1/2 h-full bg-white flex items-center text-gray-800 text-center p-10 z-10 transition-all duration-600 ease-in-out delay-[1.2s] ${isActive ? 'visible left-[0%]' : 'visible right-0'}`}>
        <form onSubmit={handleLoginSubmit} className="w-full">
          <h1 className="text-4xl mb-[-10px]">Login</h1>
          <div className="relative my-8">
            <input 
              type="email" 
              placeholder="Email" 
              required
              className="w-full py-3 px-5 pr-[50px] bg-gray-100 rounded-lg border-none outline-none text-base text-gray-800 font-medium" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <BiEnvelope className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
          <div className="relative my-8">
            <input 
              type="password" 
              placeholder="Senha" 
              required
              className="w-full py-3 px-5 pr-[50px] bg-gray-100 rounded-lg border-none outline-none text-base text-gray-800 font-medium" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <BiLock className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>

          {erroLogin && (
            <p className="text-red-500 text-sm mb-4">{erroLogin}</p>
          )}

          <button type="submit" className="w-full h-12 rounded-lg border-none shadow-md text-[#5e5e5e] bg-gray-100 hover:bg-gray-200 cursor-pointer">
            Login
          </button>

          <div className="text-[#5e5e5e] mt-4">
                    <Link to="/recuperar-senha" className="text-blue-600 hover:underline">
                      Esqueceu a senha?
                    </Link>
                    </div>
        </form>
      </div>

      <div className="absolute w-full h-full">
        <div className={`absolute w-[300%] h-full bg-primary rounded-[150px] z-20 transition-all duration-[1.8s] ease-in-out ${isActive ? 'left-[50%]' : 'left-[-250%]'}`} />
        
        <div className={` absolute w-1/2 h-full flex flex-col justify-center items-center text-white z-20 transition-all duration-[1s] ease-in-out ${isActive ? "visible left-[50%] invisible" : "left-[0%] "}`}>
          <div className="-mt-[270px] py-[120px]">
            <button onClick={() => navigate(-1)} >
              <BiArrowBack size={30} />
            </button>
          </div>
          <h1 className="text-3xl font-semibold [text-shadow:_0_2px_4px_rgb(15_37_115_/_0.6)]">Bem vindo de volta!</h1>
          <p className="text-sm my-4">Faça sua autenticação como admin</p>
        </div>
      </div>
    </div>
  )
}

export default TelaLoginAdmin;