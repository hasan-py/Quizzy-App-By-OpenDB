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
  Text,
  Flex,
} from "@chakra-ui/react";
import { totalResult } from "@src/common/function/calculateResult";
import { DashboardHeader } from "./components/dashboardHeader";
import { QuizProgress } from "./components/quizeProgress";
import { useDashboardController } from "./dashboardController";

function DashboardPage() {
  const { navigate, statData } = useDashboardController();

  return (
    <>
      <Center>
        <Box w="md" p={5} m={5} shadow="md" borderRadius="md">
          <DashboardHeader statData={statData} navigate={navigate} />

          <Accordion>
            {statData?.map((user: any, key: number) => (
              <AccordionItem key={key}>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {user?.name || "Unknown"}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

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

export default DashboardPage;
