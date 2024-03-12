import React from 'react';
import Home from '@/pages/home';
import Quiz from '@/pages/quiz';
import Randomizer from '@/pages/randomizer';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import CreateQuiz from '@/pages/create-quiz';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/randomizer" element={<Randomizer />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/create" element={<CreateQuiz />} />
      </Routes>
    </Router>
  );
};
