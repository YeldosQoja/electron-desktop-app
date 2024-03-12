import React, { useRef, useState } from 'react';
import { Question, selectQuestions, selectResult } from '@/features/quiz';
import { Button, LinearProgress } from '@mui/material';
import { useAppSelector } from '@/hooks';
import { Player } from '@lottiefiles/react-lottie-player';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const questions = useAppSelector(selectQuestions);
  const result = useAppSelector(selectResult);
  const [currentIndex, setCurrentIndex] = useState(0);
  const playerRef = useRef<any>(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    setTimeout(setCurrentIndex, 1500, currentIndex + 1);
  };

  const handleStartNewQuiz = () => {
    navigate('/quiz/create');
  }

  return (
    <div className="flex min-h-dvh bg-background justify-center">
      <div className="flex flex-col w-1/2 bg-white mt-14 rounded-t-3xl p-9">
        {currentIndex === questions.length ? (
          <div className="flex flex-1 flex-col justify-center items-center space-y-4">
            <h1 className="text-[40px] font-semibold text-primary">
              Құттықтаймын!
            </h1>
            <h3 className="text-2xl font-semibold text-secondary">{`Сіз ${result.score} ұпай жинадыңыз!`}</h3>
            <Button
              variant="contained"
              className="w-1/3 text-xl p-4 normal-case rounded-[50px]"
              onClick={handleStartNewQuiz}
            >
              Жаңа викторина
            </Button>
            <Player
              autoplay
              loop
              style={{ width: 400, height: 400 }}
              lottieRef={(ref) => (playerRef.current = ref)}
              src={require('../../../assets/animations/star.json')}
            />
          </div>
        ) : (
          <>
            <h1 className="font-semibold text-3xl text-left mb-3">{`Сұрақ ${
              currentIndex + 1
            }/${questions.length}`}</h1>
            <LinearProgress
              variant="determinate"
              color="success"
              value={((currentIndex + 1 - 0) * 100) / (questions.length - 0)}
              className="h-4 rounded-lg mb-5"
            />
            <Question
              id={questions[currentIndex].id}
              onContinue={handleContinue}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
