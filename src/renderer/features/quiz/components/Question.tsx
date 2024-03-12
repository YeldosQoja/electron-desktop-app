import { useEffect, useRef, useState } from 'react';
import { Answer } from './Answer';
import { useAppSelector } from '@/hooks';
import {
  questionAnswered,
  selectAnswersById,
  selectQuestionById,
  selectQuestionResult,
} from '../slices';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { Player } from '@lottiefiles/react-lottie-player';

interface Props {
  id: string;
  onContinue: () => void;
}

export const Question = ({ id, onContinue }: Props) => {
  const dispatch = useDispatch();
  const question = useAppSelector(selectQuestionById(id));
  const { correctAnswerId } = question;
  const answers = useAppSelector(selectAnswersById(id));
  const { isCorrect, isWrong } = useAppSelector(selectQuestionResult(id));
  const [selectedAnswerId, setSelectedAnswerId] = useState<string>();
  const answered = isCorrect || isWrong;
  const successAudio = useRef(new Audio(require('../../../../../assets/sounds/correct.mp3')));
  const errorAudio = useRef(new Audio(require('../../../../../assets/sounds/error.mp3')));
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (isCorrect) {
      successAudio.current.play();
      playerRef.current.play();
    } else if (isWrong) {
      errorAudio.current.play();
    }
  }, [isCorrect, isWrong]);

  const handleContinue = () => {
    if (selectedAnswerId === undefined) {
      toast.warning('Өз жауабыңызды белгілеңіз!');
      return;
    }
    onContinue();
    dispatch(questionAnswered({ question, selectedAnswerId }));
  };

  return (
    <div className="flex flex-1 flex-col justify-between">
      <div>
        <h2 className="font-medium text-2xl text-left">{question.title}</h2>
        {answers.map((answer) => {
          const selected = answer.id === selectedAnswerId;
          const correct = answer.id === correctAnswerId;
          let type: string | undefined;
          if (selected) type = 'selected';
          if (answered) {
            if (correct) {
              type = 'correct';
            } else if (selected) {
              type = 'wrong';
            }
          }
          return (
            <Answer
              id={answer.id}
              title={answer.title}
              onSelect={setSelectedAnswerId}
              type={type}
              disabled={answered}
            />
          );
        })}
      </div>
      <Button
        variant="contained"
        className="bg-primary w-2/3 p-4 py-5 text-xl normal-case rounded-[50px] self-center"
        onClick={handleContinue}
        disabled={answered}
      >
        Жалғастыру
      </Button>
      <Player lottieRef={(ref) => playerRef.current = ref} src={require('../../../../../assets/animations/congratulations.json')} />
    </div>
  );
};
