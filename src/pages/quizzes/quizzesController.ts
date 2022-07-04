import useAxiosApi from "@src/common/hooks/useAxiosApi";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export const useQuizzesController = () => {
  const { state }: any = useLocation();
  const [isFinished, setIsFinished] = useState(false);

  const {
    response: questionData,
    loading,
    setResponse,
  }: any = useAxiosApi({
    method: "get",
    url: `/api.php?amount=10&type=multiple`,
  });

  const [questionNo, setQuestionNo] = useState<number>(0);
  const singleQuestion = questionData?.results[questionNo];

  return {
    questionNo,
    setQuestionNo,
    singleQuestion,
    setIsFinished,
    isFinished,
    loading,
    state,
    questionData,
    setResponse,
  };
};
