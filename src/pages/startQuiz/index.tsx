import { Center, Box, Button, Heading, Text } from "@chakra-ui/react";
import CustomInput from "@src/common/component/customInput";
import { useStartQuizController } from "./startQuizController";

function StartQuizPage() {
  const { setFieldValue, formData, navigate } = useStartQuizController();

  return (
    <Center bg="gray.50" h="100vh">
      <Box w="md" p={5} m={5} shadow="md" borderRadius="md">
        <Heading as="h4" size="md" mb={4} textAlign={"center"}>
          Quizyy 🚀
        </Heading>

        <CustomInput
          onChange={(e: any) => setFieldValue("userName", e.target.value)}
          name="userName"
          label="Name"
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              navigate("/quizzes", {
                state: formData,
              });
            }
          }}
          value={formData?.userName}
        />

        <Button
          onClick={() =>
            navigate("/quizzes", {
              state: formData,
            })
          }
          colorScheme="teal"
          size="md"
          w={"full"}
          mb={4}
        >
          Start Quiz
        </Button>

        <Text
          onClick={() => {
            navigate("/dashboard");
          }}
          textDecoration={"underline"}
          size="xs"
          cursor="pointer"
        >
          Go to dashboard
        </Text>
      </Box>
    </Center>
  );
}

export default StartQuizPage;
