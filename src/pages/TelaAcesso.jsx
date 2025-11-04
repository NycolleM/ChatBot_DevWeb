import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiArrowBack, BiEdit, BiLogOut } from 'react-icons/bi';
// import ModalInput from '../components/ModalInput'; 
import uniforlogo from '/src/imagens/uniforlogo.png';
import iconchat from '/src/imagens/chatinho.png';
import agenda from '/src/imagens/agenda.png';
import luz from '/src/imagens/luz.png';

const TelaAcesso = () => {


  return (
    <div className="h-screen w-full">
      <nav className="bg-[#e6e6e6ff] fixed top-0 shadow-md px-8 py-4 text-left relative padding-4">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4 mx-32">
            <a><img src={uniforlogo} alt="Logo NAF" class="h-12 w-12 drop-shadow-lg" /></a>
            <a className="[text-shadow:_0_2px_4px_rgb(168_168_168_/_0.5)] text-[#004af7] text-2xl font-bold "> NAF </a>
          </div>

          <div class="w-full flex-grow md: inline-flex md:w-auto">
            <div class="md:inline-flex md:flex-row md:ml-auto">
              <a href='#inicio' class="mx-6 p-2"> Inicio </a>
              <a href="/telaperfil" class="mx-6 p-2"> Perfil </a>
              {/* <a href="/telaperfil" class="mx-6 p-2"> </a> */}
            </div>
          </div>

        </div>
      </nav>

      <div class="flex items-center bg-[#004af7] justify-center py-4 space-x-40 shadow-md">
        <p class="text-white font-bold">Agendamento</p>
        <a href="/telachat"><p class="text-white font-bold">Consulta com ChatBot</p></a>
        <p class="text-white font-bold">Precificação</p>
      </div>

      <div class="text-center justify-center mt-12">
        <a><h1 id="servicos" class="[text-shadow:_0_2px_4px_rgb(168_168_168_/_0.9)] text-3xl font-bold text-[#004af7]">Conheça nossos Serviços abaixo!</h1></a>
      </div>

      <div class="flex justify-center mt-20 px-20 space-x-40">

        <div class="w-1/4 h-64 bg-gray-500/10 rounded-2xl shadow-md hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer">
          <div class="flex ">
            <a><img src={agenda} alt="Logo NAF" class="h-13 w-16 drop-shadow-lg translate-x-3 translate-y-5" /></a>
            <a><p class="mx-9 mt-9 text-xl font-semibold text-gray-600">Agendamento Direto</p></a>
          </div>
          <div class="text-justify">
            <p class="ml-4 mr-4 mt-8 text-gray-600"> Clique na aba <span class="font-bold">"Agendamento"</span> para marcar uma consulta direta com a nossa equipe do NAF! </p>
          </div>
        </div>

        <div class="w-1/4 h-64 bg-gray-500/10 rounded-2xl shadow-md hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer">
          <div class="flex ">
            <a><img src={iconchat} alt="Logo NAF" class="h-13 w-20 drop-shadow-lg translate-x-4 translate-y-2" /></a>
            <a><p class="mx-14 mt-9 text-xl font-semibold text-gray-600">CHAT BOT</p></a>
          </div>
          <div class="text-justify">
            <p class="ml-4 mr-4 mt-4 text-gray-600">O Chat Bot do NAF é uma Inteligência Artificial capaz de responder perguntas relacionadas ao <span class="font-bold">Imposto de Renda</span>. Se possui alguma dúvida referente ao IRPF, clique na aba <span class="font-bold">"Consulta com ChatBot"</span> e inicie sua conversa!</p>
          </div>
        </div>

        <div class="w-1/4 h-64 bg-gray-500/10 rounded-2xl shadow-md hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer">
          <div class="flex ">
            <a><img src={luz} alt="Logo NAF" class="h-13 w-20 drop-shadow-lg translate-x-4 translate-y-4" /></a>
            <a><p class="mx-10 mt-7 text-xl font-semibold text-gray-600">Sugestão de Precificação</p></a>
          </div>
          <div class="text-justify">
            <p class="ml-4 mr-4 mt-4 text-gray-600"> Clique na aba <span class="font-bold">"Precificação"</span> e determine o valor de venda de um produto ou serviço conosco! </p>
          </div>
        </div>

      </div>



      <footer class="bg-[#004af7] text-white mt-96">
        <div class="max-w-5xl mx-auto px-2 py-8 md:flex md:items-center md:justify-between ">

          {/* <div class="text-center md:text-left mb-4 md:mb-0"> */}
          <p class="text-sm">NAF | Núcleo de Apoio Contábil e Fiscal </p>

          {/* </div> */}

          <div class="flex justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 2 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <a class="text-sm">Bloco R | Sala 3A</a>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            <a class="text-sm">(85) 3477-3193</a>
          </div>

        </div>
      </footer>


    </div>
  );
};

export default TelaAcesso;