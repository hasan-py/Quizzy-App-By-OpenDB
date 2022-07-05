import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useDashboardController = () => {
  const [statData, setStatData] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const list = localStorage.getItem("@quizList")
      ? JSON.parse(localStorage.getItem("@quizList") || "")
      : {};

    let mappedData = [];

    for (const [key, value] of Object.entries(list)) {
      mappedData.push({
        name: key,
        quizzes: value,
      });
    }

    setStatData(mappedData);
  }, []);

  return { navigate, statData };
};
