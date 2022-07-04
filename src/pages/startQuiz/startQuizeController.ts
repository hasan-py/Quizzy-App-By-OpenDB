import useAxiosApi from "@src/common/hooks/useAxiosApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface formDataInterface {
  userName: string;
  category: number;
}

const nameList: Array<string> = [
  "Florence Cummings",
  "Wallace Sullivan",
  "Caleb Mckenzie",
  "Alan Gutierrez",
  "Yvette Snyder",
  "Jessie Wise",
  "Paulette Ramirez",
  "Keith Ryan",
  "Charlotte Pena",
  "Boyd Bennett",
];

const random = Math.floor(Math.random() * nameList.length);

export const useStartQuizController = () => {
  const [formData, setFormData] = useState<formDataInterface>();
  let navigate = useNavigate();

  const { response: categoryData }: any = useAxiosApi({
    method: "get",
    url: "/api_category.php",
  });

  const setFieldValue = (name: string, value: any) => {
    const obj = (_formData: any) => {
      return {
        ..._formData,
        [name]: value,
      };
    };

    setFormData((oldFormData: any) => obj(oldFormData));
  };

  useEffect(() => {
    setFieldValue("userName", nameList[random]);
    setFieldValue("category", categoryData?.trivia_categories[0].id);
  }, [categoryData?.trivia_categories]);

  return {
    categoryData: categoryData?.trivia_categories,
    setFieldValue,
    formData,
    navigate,
  };
};
