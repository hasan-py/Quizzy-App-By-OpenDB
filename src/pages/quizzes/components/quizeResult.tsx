import { Center, Box, Heading, Checkbox, Stack } from "@chakra-ui/react";

function QuizeResultList({ controller }: any) {
  const { singleQuestion, questionData } = controller;

  return (
    <>
      <Center bg="gray.50">
        <Box w="md" p={5} m={5} shadow="md" borderRadius="md">
          <Heading as="h5" size="md" mb={2}>
            Congratulations!
          </Heading>

          {questionData?.results?.map((ques: any, key: number) => (
            <>
              <Heading as="h5" size="md" mb={2}>
                Ques: {key + 1}
              </Heading>
              <Heading as="h5" size="xs" mb={4}>
                {ques?.question || ""}
              </Heading>

              <Stack spacing={5} direction="column">
                {ques?.incorrect_answers?.map((option: string, key: number) => (
                  <Checkbox
                    isChecked={singleQuestion?.user_answer === option}
                    key={key}
                    disabled={true}
                    colorScheme="green"
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
