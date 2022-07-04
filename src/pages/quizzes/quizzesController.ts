import useAxiosApi from "@src/common/hooks/useAxiosApi";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useQuizzesController = () => {
  const { state }: any = useLocation();
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();

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

  const totalResult = (data: any) => {
    const res = data?.reduce((totalResult: number, obj: any) => {
      if (obj?.user_answer === obj?.correct_answer) {
        return totalResult + 1;
      }
      return totalResult;
    }, 0);

    return res || 0;
  };

  const setIntoLocalStorage = (name: string, data: any) => {
    const userNameWiseData = localStorage.getItem(name)
      ? JSON.parse(localStorage.getItem(name) || "")
      : [];

    userNameWiseData.push(data);
    localStorage.setItem(name, JSON.stringify(userNameWiseData));

    console.log(userNameWiseData);
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
