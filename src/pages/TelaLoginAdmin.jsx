import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiUser, BiLock, BiEnvelope,BiArrowBack } from 'react-icons/bi'


const TelaLoginAdmin = () => {
  const [isActive, setIsActive] = useState(false)
  const navigate = useNavigate()

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    navigate('/telaperfiladmin')
  }

  return (
    <div className={`relative w-[850px] h-[550px] bg-white rounded-[30px] shadow-lg overflow-hidden ${isActive ? 'active' : ''}`}>   {/* .container */}

      <div className={`absolute right-0 w-1/2 h-full bg-white flex items-center text-gray-800 text-center p-10 z-10 transition-all duration-600 ease-in-out delay-[1.2s] ${isActive ? 'visible left-[0%]' : 'visible right-0'}`}>
        <form className="w-full">
          <h1 className="text-4xl mb-[-10px]">Login</h1>
          <div className="relative my-8">
            <input type="text" placeholder="Nome" required
              className="w-full py-3 px-5 pr-[50px] bg-gray-100 rounded-lg border-none outline-none text-base text-gray-800 font-medium" />
            <BiUser className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
          <div className="relative my-8">
            <input type="email" placeholder="Email" required
              className="w-full py-3 px-5 pr-[50px] bg-gray-100 rounded-lg border-none outline-none text-base text-gray-800 font-medium" />
            <BiEnvelope className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
          <div className="relative my-8">
            <input type="password" placeholder="Senha" required
              className="w-full py-3 px-5 pr-[50px] bg-gray-100 rounded-lg border-none outline-none text-base text-gray-800 font-medium" />
            <BiLock className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
          <button onClick={handleLoginSubmit} type="submit" className="w-full h-12 rounded-lg border-none shadow-md text-[#5e5e5e] bg-gray-100 hover:bg-gray-200 cursor-pointer">
            Login   
          </button>
        </form>
      </div>

      <div className="absolute w-full h-full">
        <div className={`absolute w-[300%] h-full bg-primary rounded-[150px] z-20 transition-all duration-[1.8s] ease-in-out ${isActive ? 'left-[50%]' : 'left-[-250%]'}`} />   {/* togleleft) */}
       
        <div className={` absolute w-1/2 h-full flex flex-col justify-center items-center text-white z-20 transition-all duration-[1s] ease-in-out  ${isActive ? "visible left-[50%]  invisible" : "left-[0%] "}`}>
         <div className="-mt-[270px] py-[120px]">
         <button onClick={() => navigate(-1)} >
                    <BiArrowBack size={30}/> 
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