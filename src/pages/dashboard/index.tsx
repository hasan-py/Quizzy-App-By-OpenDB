import {
  Center,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  Text,
  Flex,
  Stack,
  Progress,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  totalResult,
  totalSkipAnswer,
  totalWrongAnswer,
} from "@src/common/function/calculateResult";

function DashboardPage() {
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

  console.log("statData", statData);

  return (
    <>
      <Center>
        <Box w="md" p={5} m={5} shadow="md" borderRadius="md">
          <Flex alignItems="center" justifyContent="space-between">
            <Heading as="h5" size="md">
              Statistics
            </Heading>

            <Text
              cursor="pointer"
              fontSize="xs"
              mt={4}
              onClick={() => {
                navigate("/");
              }}
              textDecoration={"underline"}
            >
              Start new Quiz
            </Text>
          </Flex>

          <Text size="xs" mb={5}>
            {statData?.length > 0
              ? `Total ${statData.length} People Attend Quizzy 🚀`
              : "No People haven't attend Quizzy 🚀"}
          </Text>

          <Accordion>
            {statData?.map((user: any, key: number) => (
              <AccordionItem key={key}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {user?.name || "Unknown"}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>

                {user?.quizzes?.map((quiz: any, nestedkey: number) => (
                  <AccordionPanel pb={4}>
                    <Text
                      textAlign="center"
                      textDecoration={"underline"}
                      mb={4}
                    >
                      Quiz {nestedkey + 1}
                    </Text>
                    <Flex>
                      <Box w="30%">
                        <CircularProgress
                          size="80px"
                          value={totalResult(quiz?.results) * 10}
                          color="green.400"
                        >
                          <CircularProgressLabel>
                            {totalResult(quiz?.results) || 0}/10
                          </CircularProgressLabel>
                        </CircularProgress>
                      </Box>
                      <Box w="70%">
                        <QuizProgress quiz={quiz} />
                      </Box>
                    </Flex>
                  </AccordionPanel>
                ))}
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      </Center>
    </>
  );
}

const QuizProgress = ({ quiz }: any) => {
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

export default DashboardPage;
