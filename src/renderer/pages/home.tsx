import React from 'react';
import fortuneWheel from '../../../assets/icons/fortune-wheel.png';
import chat from '../../../assets/icons/chat.png';
import ideas from '../../../assets/icons/ideas.png';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="bg-white h-dvh p-6">
      <div className="flex flex-1 flex-col h-full justify-center">
        <h2 className="text-[40px] font-bold text-primary">Ойындар тізімі</h2>
        <div className="grid grid-cols-3 gap-6">
          <div
            className="game-item randomizer-item"
            onClick={() => {
              navigate('/randomizer');
            }}
          >
            <div className="flex flex-col items-center">
              <img src={fortuneWheel} alt="" draggable={false} />
              <h3 className="text-2xl font-semibold mt-4">Рандомайзер</h3>
            </div>
          </div>
          <div
            className="game-item quiz-item"
            onClick={() => {
              navigate('/quiz/create');
            }}
          >
            <div className="flex flex-col items-center">
              <img src={chat} alt="" draggable={false} />
              <h3 className="text-2xl font-semibold mt-4">Викторина</h3>
            </div>
          </div>
          <div
            className="game-item window-item"
            onClick={() => {
              navigate('/');
            }}
          >
            <div className="flex flex-col items-center">
              <img src={ideas} alt="" draggable={false} />
              <h3 className="text-2xl font-semibold mt-4">Сұрақ-жауап</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
