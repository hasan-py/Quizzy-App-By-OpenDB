export const totalResult = (data: any) => {
  const res = data?.reduce((totalResult: number, obj: any) => {
    if (obj?.user_answer === obj?.correct_answer) {
      return totalResult + 1;
    }
    return totalResult;
  }, 0);

  return res || 0;
};

export const totalWrongAnswer = (data: any) => {
  const res = data?.reduce((totalResult: number, obj: any) => {
    if (obj?.user_answer && obj?.user_answer !== obj?.correct_answer) {
      return totalResult + 1;
    }
    return totalResult;
  }, 0);

  return res || 0;
};

export const totalSkipAnswer = (data: any) => {
  const res = data?.reduce((totalResult: number, obj: any) => {
    if (!obj?.user_answer) {
      return totalResult + 1;
    }
    return totalResult;
  }, 0);

  return res || 0;
};
