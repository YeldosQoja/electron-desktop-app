export interface QuizFormValues {
  title: string;
  topic: string;
  questions: Array<QuestionFormValues>;
  score: string;
  duration: string;
};

export interface QuestionFormValues {
  title: string;
  correctAnswerId: string;
  answers: string[];
}
