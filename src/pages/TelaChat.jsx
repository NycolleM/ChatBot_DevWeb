import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiArrowBack, BiEdit, BiLogOut } from 'react-icons/bi';
// import ModalInput from '../components/ModalInput'; 

const TelaChat = () => {
  

  return (
    <div className="h-screen w-screen">


       <div class="flex items-center text-justify justify-center py-10">
        <div class="h-[36rem] w-2/3 bg-[#ebebeb] shadow-md rounded-2xl shadow-md justify-center">
          <nav className="bg-[#004af7] shadow-md px-8 py-2 flex relative padding-4">
            
            <div class="flex items-center justify-center h-10 w-10 bg-[#ebebeb] rounded-full shadow-lg text-[#004af7] font-bold">
              I.A
            </div>
            <a className="[text-shadow:_0_2px_4px_rgb(168_168_168_/_0.5)] text-[#ffffff] mt-2 mx-4 text-lg font-bold "> ChatBot - IRPF </a>

          </nav>

        </div>
      </div>

    </div>
  );
};

export default TelaChat;
