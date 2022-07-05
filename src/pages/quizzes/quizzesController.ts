import useAxiosApi from "@src/common/hooks/useAxiosApi";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { totalResult } from "@src/common/function/calculateResult";
import { useToast } from "@chakra-ui/react";

export const useQuizzesController = () => {
  const { state }: any = useLocation();
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  if (!state?.userName) {
    navigate("/");

    toast({
      title: "Please provide a user name",
      status: "warning",
      duration: 2000,
      isClosable: true,
      id: 123,
    });
  }

  const {
    response: questionData,
    loading,
    setResponse,
    refetch,
  }: any = useAxiosApi({
    method: "get",
    url: `/api.php?amount=10&type=multiple`,
    modifyRes: (res: any, setter: Function) => {
      if (res?.results?.length > 0) {
        setter({
          ...res,
          results: res?.results?.map((item: any) => {
            item?.incorrect_answers.push(item?.correct_answer);
            item?.incorrect_answers.sort();
            return item;
          }),
        });
      } else {
        setter({
          results: [],
        });
      }
    },
  });

  const [questionNo, setQuestionNo] = useState<number>(0);

  const singleQuestion = questionData?.results[questionNo];

  const setIntoLocalStorage = (name: string, data: any) => {
    const quizList: any = localStorage.getItem("@quizList")
      ? JSON.parse(localStorage.getItem("@quizList") || "")
      : {};

    if (quizList?.hasOwnProperty(name)) {
      const arr = quizList[name];
      arr.push(data);
      quizList[name] = arr;
    } else {
      quizList[name] = [data];
    }

    localStorage.setItem("@quizList", JSON.stringify(quizList));
  };

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
    totalResult,
    refetch,
    navigate,
    setIntoLocalStorage,
  };
};
