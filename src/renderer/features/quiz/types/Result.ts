export interface Result {
  correctQuestionCount: number;
  questions: { [id: string]: boolean };
  score: number;
  totalScore: number;
}
