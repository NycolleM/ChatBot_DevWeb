import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import uniforlogo from '/src/imagens/uniforlogo.png';

const TelaInicial = () => {


  return (
    <div className="h-screen w-screen]">

      <nav className="bg-[#e6e6e6ff] top-0 shadow-md px-8 py-3 text-left relative padding-4">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4 mx-32">
            <a><img src={uniforlogo} alt="Logo NAF" class="h-12 w-12 drop-shadow-lg" /></a>
            <a className="[text-shadow:_0_2px_4px_rgb(168_168_168_/_0.5)] text-[#004af7] text-2xl font-bold "> NAF </a>
          </div>

          <div class="w-full flex-grow md: inline-flex md:w-auto">
            <div class="md:inline-flex md:flex-row md:ml-auto">
              <a href='#sobrenaf' class="mx-6 p-2"> Sobre </a>
              <a href="/telalogin" class="mx-6 p-2"> Entrar </a>
            </div>
          </div>

        </div>
      </nav>

      <div class="text-center justify-center py-10">
        <a><h1 id="inicio" class="[text-shadow:_0_2px_4px_rgb(168_168_168_/_0.9)] text-4xl font-bold text-[#004af7]">NAF UNIFOR</h1></a>
        <p class="[text-shadow:_0_2px_4px_rgb(168_168_168_/_0.8)] mt-1">Núcleo de Apoio Contábil e Fiscal</p>
      </div>

      <div class="flex items-center text-justify justify-center py-8">

        <div class="w-2/3 h-48 bg-blue-500/15 rounded-2xl shadow-md justify-center text-center hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer">
          <h1 class="mt-5 mb-5 text-xl text-[#0d2385] font-bold">Melhor NAF do Nordeste pela Receita Federal</h1>
          <div class="text-justify">
            <p class="text-lg ml-5 mr-5">O Núcleo de Apoio Contábil e Fiscal (NAF) da Unifor é responsável por aprimorar o conhecimento
              e prestar assistência gratuita à população por meio da orientação sobre assuntos das áreas contábil e fiscal.
              O atendimento é realizado por alunos e supervisionado por professores do curso de Ciências Contábeis.
            </p>
          </div>
        </div>

      </div>

      <div class="text-center justify-center py-10">
        <a><h1 class="[text-shadow:_0_2px_4px_rgb(168_168_168_/_0.9)] text-2xl font-bold text-[#004af7]">Atendimento Integrado</h1></a>
      </div>

      <div class="flex space-x-20 justify-center py-3">
        <div class="w-1/5 h-32 bg-blue-500/15 shadow-md rounded-2xl text-center hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer">
          <div class="text-justify">
            <p class="text-xl ml-5 mr-5 mt-3 font-bold text-[#0d2385] ">Atendimentos realizados</p>
            <p class=" ml-12 mr-5 mt-3 text-xl font-bold text-[#292929]">+ de 4 mil</p>
          </div>

        </div>

        <div class="w-1/5 h-32 bg-blue-500/15 shadow-md rounded-2xl text-center hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer">
          <div class="text-justify">
            <p class="text-xl ml-5 mr-5 mt-3 font-bold text-[#0d2385] ">Declarações de IRPF</p>
            <p class=" ml-12 mr-5 mt-3 text-xl font-bold text-[#292929]">+ de 1 mil</p>
          </div>

        </div>
      </div>

      <div class="flex space-x-20 justify-center py-2">
        <div class="w-1/5 h-32 bg-blue-500/15 shadow-md rounded-2xl text-center hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer">
          <div class="text-justify">
            <p class="text-xl ml-5 mr-5 mt-3 font-bold text-[#0d2385] ">MEIs regularizados</p>
            <p class=" ml-12 mr-5 mt-3 text-xl font-bold text-[#292929]">+ de 600</p>
          </div>

        </div>
        <div class="w-1/5 h-32 bg-blue-500/15 shadow-md rounded-2xl text-center hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer">
          <div class="text-justify">
            <p class="text-xl ml-5 mr-5 mt-3 font-bold text-[#0d2385] ">Ações diferenciadas</p>
            <p class=" ml-12 mr-5 mt-3 text-xl font-bold text-[#292929]">+ de 40</p>
          </div>

        </div>
      </div>


      <div class="text-center justify-center py-16">
        <a><h1 class="[text-shadow:_0_2px_4px_rgb(168_168_168_/_0.9)] text-2xl font-bold text-[#004af7]">Benefícios para a Comunidade</h1></a>
        <p class="mt-8 text-xl text-justify mx-96">O atendimento prestado pelo Núcleo beneficia a comunidade em geral, incluindo contribuintes, pessoas físicas, microempreendedores individuais (MEIs),
          entre outros. No NAF, os contribuintes têm acesso a serviços como:</p>
      </div>

      <div class="flex space-x-12 justify-center py-3">

        <div class="w-1/4 h-48 bg-[#ebebeb] rounded-2xl text-justify shadow-md hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer">
          <ul class="list-disc list-inside list-outside ml-5">
            <li class="ml-5 mr-5 mt-6 text-lg"> Orientação para emissão de CNPJ</li>
            <li class="ml-5 mt-4 mr-12 text-lg">Preenchimento da declaração do Imposto de Renda Pessoa Física</li>

          </ul>
        </div>

        <div class="w-1/4 h-48 bg-[#ebebeb] rounded-2xl text-justify shadow-md hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer">
          <ul class="list-disc list-inside list-outside ml-5">
            <li class="ml-5 mt-6 mr-5 text-lg"> Verificação de regularidade de CPF</li>
            <li class="ml-5 mr-5 mt-4 text-lg"> Esclarecimento de dúvidas contábeis e tributárias</li>
          </ul>
        </div>


        <div class="w-1/4 h-48 bg-[#ebebeb] rounded-2xl text-justify shadow-md hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer">
          <ul class="list-disc list-inside list-outside ml-5">
            <li class="ml-5 mt-6 text-lg">Orientação para microempreendedores</li>
            <p class="ml-5 text-lg">individuais (MEIs)</p>
            <li class="ml-5 mt-4 mr-5 text-lg"> Suporte em questões fiscais em geral</li>
          </ul>
        </div>

      </div>

      <div class="text-center justify-center h-16 py-16">
        <a><h1 id="sobrenaf" class="[text-shadow:_0_2px_4px_rgb(168_168_168_/_0.9)] text-2xl font-bold text-[#004af7]">Sobre o NAF</h1></a>
      </div>

      <div class="flex items-center text-justify justify-center">

        <div class="w-3/5 h-48 bg-[#ebebeb] shadow-md rounded-2xl shadow-md justify-center text-center hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer">
          <div class="text-justify">
            <p class="text-xl mt-7 ml-5 mg-3 mr-5">Aprimorar o conhecimento acadêmico e prestar assistência aos contribuintes de baixa renda, solucionando
              dúvidas e prestando orientação sobre assuntos das áreas contábil e fiscal. Esses são os principais objetivos do Núcleo de Apoio Contábil e Fiscal (NAF)
              da Unifor, espaço onde alunos e professores do curso de Ciências Contábeis interagem e realizam atendimento gratuito à população.
            </p>
          </div>
        </div>

      </div>


      <footer class="bg-[#004af7] text-white mt-20">
        <div class="max-w-6xl mx-auto px-4 py-8 md:flex md:items-center md:justify-between">

          <div class="text-center md:text-left mb-4 md:mb-0">
            <p class="text-sm" c>NAF | Núcleo de Apoio Contábil e Fiscal </p>

          </div>

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

export default TelaInicial;