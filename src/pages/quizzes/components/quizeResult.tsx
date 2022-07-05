import {
  Center,
  Box,
  Heading,
  Checkbox,
  Stack,
  Flex,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

function QuizeResultList({ controller }: any) {
  const { questionData, totalResult, navigate, state } = controller;

  return (
    <>
      <Center bg="gray.50">
        <Box w="md" p={5} m={5} shadow="md" borderRadius="md">
          <Alert borderRadius={5} status="success" variant="left-accent">
            <Flex w={"100%"} alignItems="center" justifyContent="space-between">
              <Flex alignItems="center">
                <AlertIcon />
                Congratulations!
              </Flex>

              <Text fontSize="lg" textDecoration={"underline"}>
                {totalResult(questionData?.results)}/10
              </Text>
            </Flex>
          </Alert>

          <Flex alignItems="center" justifyContent="space-between">
            <Text
              cursor="pointer"
              fontSize="xs"
              mt={4}
              onClick={() => {
                navigate("/", {
                  state,
                });
              }}
              textDecoration={"underline"}
            >
              Start new Quiz
            </Text>

            <Text
              cursor="pointer"
              fontSize="xs"
              mt={4}
              onClick={() => {
                navigate("/dashboard");
              }}
              textDecoration={"underline"}
            >
              Go to Dashboard
            </Text>
          </Flex>

          {questionData?.results?.map((ques: any, key: number) => (
            <>
              <Flex justifyContent="space-between" alignItems="center">
                <Heading as="h5" size="md" mt={5} mb={2}>
                  Ques: {key + 1}{" "}
                </Heading>
                <Text fontSize="xs">
                  {!ques?.user_answer
                    ? "(Skip)"
                    : ques?.correct_answer !== ques?.user_answer
                    ? "(Wrong)"
                    : "(Correct)"}
                </Text>
              </Flex>
              <Heading as="h5" size="xs" mb={4}>
                {ques?.question || ""}
              </Heading>

              <Stack spacing={5} direction="column">
                {ques?.incorrect_answers?.map((option: string, key: number) => (
                  <Checkbox
                    isChecked={
                      ques?.user_answer === option ||
                      ques?.correct_answer === option
                    }
                    key={key}
                    colorScheme={
                      (ques?.user_answer === option && "green") ||
                      ques?.correct_answer === ques?.user_answer
                        ? "green"
                        : "red"
                    }
                  >
                    {option}
                  </Checkbox>
                ))}
              </Stack>
            </>
          ))}
        </Box>
      </Center>
    </>
  );
}

export default QuizeResultList;
