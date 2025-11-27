import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate,Link} from 'react-router-dom'
import { BiUser, BiLock, BiEnvelope } from 'react-icons/bi'


const TelaLogin = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');
  const [erroLogin, setErroLogin] = useState('');

  // Form de Cadastro
  const [usernameCadastro, setUsernameCadastro] = useState('');
  const [emailCadastro, setEmailCadastro] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');
  const [erroCadastro, setErroCadastro] = useState('');
 
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErroLogin('');

    try {

      const { data } = await axios.post('http://localhost:3000/api/usuarios/login', {
        email: emailLogin,
        senha: senhaLogin
      });

      console.log('Login bem-sucedido:', data);

      localStorage.setItem('userInfo', JSON.stringify(data));

      navigate('/telaacesso');

    } catch (error) {

      const msg = error.response?.data?.msg || "Erro desconhecido ao logar";
      console.error('Erro no login:', msg);
      setErroLogin(msg);
    }
  };

  const handleCadastroSubmit = async (e) => {
    e.preventDefault();
    setErroCadastro('');

    if (senhaCadastro.length < 6) {
        setErroCadastro("Senha deve ter no mínimo 6 caracteres.");
        return;
    }

    try {

      const { data } = await axios.post('http://localhost:3000/api/usuarios', {
        nome: usernameCadastro,
        email: emailCadastro,
        senha: senhaCadastro
      });

      console.log('Cadastro bem-sucedido:', data);


      setUsernameCadastro('');
      setEmailCadastro('');
      setSenhaCadastro('');
      setIsActive(false);

    } catch (error) {
      const msg = error.response?.data?.msg || "Erro desconhecido no cadastro";
      console.error('Erro no cadastro:', msg);
      setErroCadastro(msg);
    }
  };

  return (
    <div className={`relative w-[850px] h-[550px] bg-white rounded-[30px] shadow-lg overflow-hidden ${isActive ? 'active' : ''}`}> {/* .container */}

      <div className={`absolute right-0 w-1/2 h-full bg-white flex items-center text-gray-800 text-center p-10 z-10 transition-all duration-600 ease-in-out delay-[1.2s] ${isActive ? 'invisible ' : ''}`}>
        <form onSubmit={handleLoginSubmit} className="w-full">
          <h1 className="text-4xl mb-[-10px]">Login</h1>
          <div className="relative my-8">
            <input 
              type="email"
              placeholder="Email" 
              required
              className="w-full py-3 px-5 pr-[50px] bg-gray-100 rounded-lg border-none outline-none text-base text-gray-800 font-medium" 
              value={emailLogin}
              onChange={(e) => setEmailLogin(e.target.value)}
            />
            <BiUser className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
          <div className="relative my-8">
            <input 
              type="password" 
              placeholder="Senha" 
              required
              className="w-full py-3 px-5 pr-[50px] bg-gray-100 rounded-lg border-none outline-none text-base text-gray-800 font-medium" 
              value={senhaLogin}
              onChange={(e) => setSenhaLogin(e.target.value)}
            />
            <BiLock className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
          {erroLogin && (
            <p className="text-red-500 text-sm mb-4">{erroLogin}</p>
          )}

          <div className="pb-5 text-sm text-[#5e5e5e]">
             <Link to="/telaloginadmin" className="mx-6 p-2">Administrador</Link>
          </div>

          <button type="submit" className="w-full h-12 rounded-lg border-none shadow-md text-[#5e5e5e] bg-gray-100 hover:bg-gray-200 cursor-pointer">
            Login
          </button>

           <div className="text-[#5e5e5e] mt-4">
          <Link to="/recuperar" className="text-blue-600 hover:underline">
            Esqueceu a senha?
          </Link>
          </div>
        </form>
      </div>

      <div className={`absolute right-0 w-1/2 h-full bg-white flex items-center text-gray-800 text-center p-10 z-10 transition-all duration-600 ease-in-out delay-[1.2s] ${isActive ? 'visible left-[0%]' : 'invisible'}`}>
        <form onSubmit={handleCadastroSubmit} className="w-full">
          <h1 className="text-4xl mb-[-10px]">Cadastro</h1>
          <div className="relative my-8">
            <input 
              type="text" 
              placeholder="Nome" 
              required
              className="w-full py-3 px-5 pr-[50px] bg-gray-100 rounded-lg border-none outline-none text-base text-gray-800 font-medium" 
              value={usernameCadastro}
              onChange={(e) => setUsernameCadastro(e.target.value)}
            />
            <BiUser className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
          <div className="relative my-8">
            <input 
              type="email" 
              placeholder="Email" 
              required
              className="w-full py-3 px-5 pr-[50px] bg-gray-100 rounded-lg border-none outline-none text-base text-gray-800 font-medium" 
              value={emailCadastro}
              onChange={(e) => setEmailCadastro(e.target.value)}
            />
            <BiEnvelope className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
          <div className="relative my-8">
            <input 
              type="password" 
              placeholder="Senha" 
              required
              className="w-full py-3 px-5 pr-[50px] bg-gray-100 rounded-lg border-none outline-none text-base text-gray-800 font-medium" 
              value={senhaCadastro}
              onChange={(e) => setSenhaCadastro(e.target.value)}
            />
            <BiLock className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>

          {erroCadastro && (
            <p className="text-red-500 text-sm mb-4">{erroCadastro}</p>
          )}

          <button type="submit" className="w-full h-12 rounded-lg border-none shadow-md text-[#5e5e5e] bg-gray-100 hover:bg-gray-200 cursor-pointer">
            Fazer Cadastro
          </button>
        </form>
      </div>

      <div className="absolute w-full h-full">
        <div className={`absolute w-[300%] h-full bg-primary rounded-[150px] z-20 transition-all duration-[1.8s] ease-in-out ${isActive ? 'left-[50%]' : 'left-[-250%]'}`} /> {/* togleleft) */}

        <div className={`absolute w-1/2 h-full flex flex-col justify-center items-center text-white z-20 transition-all duration-[1s] ease-in-out ${isActive ? "visible left-[50%] invisible" : "left-[0%] "}`}>
          <h1 className="text-3xl font-semibold [text-shadow:_0_2px_4px_rgb(15_37_115_/_0.6)]">Olá, Seja Bem vindo!</h1>
          <p className="text-sm my-4">Não possui conta?</p>
          <button onClick={() => setIsActive(true)}
            className="w-40 h-[46px] bg-green-600 border-2 border-white rounded-lg text-base hover:bg-blue-700">
            Fazer Cadastro
          </button>
        </div>

        <div className={`absolute w-1/2 h-full flex flex-col justify-center items-center text-white z-20 transition-all duration-[1.2s] ease-in-out ${isActive ? 'right-0 delay-[1.2s]' : 'right-[-50%] delay-[0.6s]'}`}> {/* togle right */}
          <h1 className="[text-shadow:_0_2px_4px_rgb(15_37_115_/_0.6)] text-3xl font-semibold ">Faça seu Cadastro</h1>
          
          <p className="[text-shadow:_0_2px_4px_rgb(15_37_115_/_0.6)] text-lg font-semibold my-4"> e se torne parte do nosso time!</p>
        </div>
      </div>
    </div>
  )
}

export default TelaLogin;