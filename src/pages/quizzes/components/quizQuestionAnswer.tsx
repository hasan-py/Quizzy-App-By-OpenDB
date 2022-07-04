import {
  Center,
  Box,
  Heading,
  Checkbox,
  Skeleton,
  Stack,
  ButtonGroup,
  Button,
  Flex,
} from "@chakra-ui/react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  UpDownIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons";

function QuizQuestionAnswer({ controller }: any) {
  const {
    loading,
    singleQuestion,
    questionNo,
    setQuestionNo,
    setIsFinished,
    questionData,
    setResponse,
  } = controller;

  return (
    <>
      <Center bg="gray.50" h="100vh">
        {loading ? (
          <Box w="md" p={5} m={5} shadow="md" borderRadius="md">
            <Stack>
              <Skeleton height="20px" width="30%" />
              <Skeleton height="20px" />
              <Skeleton height="20px" width="50%" />
              <Skeleton height="20px" width="50%" />
              <Skeleton height="20px" width="50%" />
            </Stack>
          </Box>
        ) : (
          <Box w="md" p={5} m={5} shadow="md" borderRadius="md">
            {singleQuestion ? (
              <>
                {" "}
                <Heading as="h5" size="md" mb={2}>
                  Ques: {questionNo + 1}
                </Heading>
                <Heading as="h5" size="xs" mb={4}>
                  {singleQuestion?.question || ""}
                </Heading>
                <Stack spacing={5} direction="column">
                  {singleQuestion?.incorrect_answers?.map(
                    (option: string, key: number) => (
                      <Checkbox
                        onChange={(e: any) => {
                          const copy: any = { ...questionData };
                          if (singleQuestion?.user_answer !== option) {
                            copy.results[questionNo].user_answer = option;
                          } else {
                            copy.results[questionNo].user_answer = undefined;
                          }
                          setResponse(copy);
                        }}
                        isChecked={singleQuestion?.user_answer === option}
                        key={key}
                        colorScheme="green"
                      >
                        {option}
                      </Checkbox>
                    )
                  )}
                </Stack>
                <Flex
                  minWidth="max-content"
                  alignItems="center"
                  justifyContent={
                    questionNo === 0 ? "flex-end" : "space-between"
                  }
                  gap="2"
                  mt={4}
                >
                  {questionNo > 0 ? (
                    <ButtonGroup size="sm" isAttached variant="outline">
                      <Button
                        onClick={() => {
                          if (questionNo !== 0) {
                            setQuestionNo((oldVal: number) => oldVal - 1);
                          }
                        }}
                      >
                        <ArrowLeftIcon mr={2} /> Previous
                      </Button>
                    </ButtonGroup>
                  ) : null}

                  {questionNo < 9 ? (
                    <Flex>
                      <ButtonGroup
                        size="sm"
                        mr={2}
                        isAttached
                        variant="outline"
                      >
                        <Button
                          onClick={() => {
                            if (questionNo !== 9) {
                              setQuestionNo((oldVal: number) => oldVal + 1);
                            }
                          }}
                        >
                          Skip
                          <UpDownIcon ml={2} />
                        </Button>
                      </ButtonGroup>

                      <ButtonGroup size="sm" isAttached variant="outline">
                        <Button
                          disabled={!singleQuestion.user_answer}
                          onClick={() => {
                            if (questionNo !== 9) {
                              setQuestionNo((oldVal: number) => oldVal + 1);
                            }
                          }}
                        >
                          Next <ArrowRightIcon ml={2} />
                        </Button>
                      </ButtonGroup>
                    </Flex>
                  ) : null}

                  {questionNo === 9 ? (
                    <ButtonGroup size="sm" mr={2} isAttached variant="outline">
                      <Button
                        onClick={() => {
                          setIsFinished(true);
                        }}
                        colorScheme="teal"
                      >
                        Finish
                        <CheckCircleIcon ml={2} />
                      </Button>
                    </ButtonGroup>
                  ) : null}
                </Flex>
              </>
            ) : null}
          </Box>
        )}
      </Center>
    </>
  );
}

export default QuizQuestionAnswer;
