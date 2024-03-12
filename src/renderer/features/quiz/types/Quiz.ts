import { Result } from "./Result";

export interface Quiz {
  title: string;
  topic?: string;
  questionCount: number;
  duration?: number;
  isStarted: boolean;
  scorePerQuestion: number;
  result: Result;
}
