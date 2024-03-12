export interface QuestionDTO {
  id: string;
  title: string;
  type: string;
  hasImage: boolean;
  imgSrc?: string;
  correctAnswerId: string | null;
}

export interface Answer {
  id: string;
  questionId: string;
  title: string;
}
