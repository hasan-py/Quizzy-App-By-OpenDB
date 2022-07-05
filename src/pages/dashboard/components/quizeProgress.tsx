import { Text, Stack, Progress } from "@chakra-ui/react";
import {
  totalResult,
  totalSkipAnswer,
  totalWrongAnswer,
} from "@src/common/function/calculateResult";

export const QuizProgress = ({ quiz }: any) => {
  const correct = totalResult(quiz?.results);
  const wrong = totalWrongAnswer(quiz?.results);
  const skip = totalSkipAnswer(quiz?.results);

  return (
    <Stack spacing={2}>
      <Text>{correct} Correct</Text>
      <Progress colorScheme="green" size="sm" value={correct * 10} />
      <Text>{wrong} Wrong</Text>
      <Progress colorScheme="red" size="sm" value={wrong * 10} />
      <Text>{skip} Skip</Text>
      <Progress colorScheme="gray" size="sm" value={skip * 10} />
    </Stack>
  );
};
