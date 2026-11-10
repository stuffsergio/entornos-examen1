import quizzesData from "./quizzesData.json";

export { quizzesData };

export const quizList = ["quiz1", "quiz2", "quiz3", "quiz4", "quiz5"].map((id) => ({
  id,
  ...quizzesData[id],
}));
