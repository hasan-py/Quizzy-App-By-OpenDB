import useAxiosApi from "@src/common/hooks/useAxiosApi";
import { useLocation } from "react-router-dom";
import {
  Center,
  Box,
  Heading,
  RadioGroup,
  Radio,
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
import { useState } from "react";

function QuizzesPage() {
  const { state }: any = useLocation();

  const { response: questionData, loading }: any = useAxiosApi({
    method: "get",
    url: `/api.php?amount=10&category=${state?.category}&type=multiple`,
  });

  const [questionNo, setQuestionNo] = useState<number>(0);

  const singleQuestion = questionData?.results[questionNo];

  console.log(singleQuestion);

  return (
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
              <RadioGroup defaultValue="2">
                <Stack spacing={5} direction="column">
                  {singleQuestion?.incorrect_answers?.map(
                    (option: string, key: number) => (
                      <Radio key={key} colorScheme="green" value={key + 1}>
                        {option}
                      </Radio>
                    )
                  )}
                </Stack>
              </RadioGroup>
              <Flex
                minWidth="max-content"
                alignItems="center"
                justifyContent="space-between"
                gap="2"
                mt={4}
              >
                {questionNo > 0 ? (
                  <ButtonGroup size="sm" isAttached variant="outline">
                    <Button
                      onClick={() => {
                        if (questionNo !== 0) {
                          setQuestionNo((oldVal) => oldVal - 1);
                        }
                      }}
                    >
                      <ArrowLeftIcon mr={2} /> Previous
                    </Button>
                  </ButtonGroup>
                ) : null}

                {questionNo < 9 ? (
                  <Flex>
                    <ButtonGroup size="sm" mr={2} isAttached variant="outline">
                      <Button
                        onClick={() => {
                          if (questionNo !== 9) {
                            setQuestionNo((oldVal) => oldVal + 1);
                          }
                        }}
                      >
                        Skip
                        <UpDownIcon ml={2} />
                      </Button>
                    </ButtonGroup>

                    <ButtonGroup size="sm" isAttached variant="outline">
                      <Button
                        onClick={() => {
                          if (questionNo !== 9) {
                            setQuestionNo((oldVal) => oldVal + 1);
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
                    <Button colorScheme="teal">
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
  );
}

export default QuizzesPage;
