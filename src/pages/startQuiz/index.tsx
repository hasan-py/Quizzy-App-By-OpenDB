import { Center, Box, Button, Heading } from "@chakra-ui/react";
import CustomInput from "@src/common/component/customInput";
import CustomSelect from "@src/common/component/customSelect";
import { useStartQuizController } from "./startQuizeController";

function StartQuizPage() {
  const { setFieldValue, categoryData, formData, navigate } =
    useStartQuizController();

  return (
    <Center bg="gray.50" h="100vh">
      <Box p={5} m={5} shadow="md" borderRadius="md">
        <Heading as="h4" size="md" mb={4} textAlign={"center"}>
          Quizyy 🚀
        </Heading>

        <CustomInput
          onChange={(e: any) => setFieldValue("userName", e.target.value)}
          name="userName"
          label="User Name"
          value={formData?.userName}
        />
        <CustomSelect
          onChange={(e: any) =>
            setFieldValue("category", Number(e.target.value))
          }
          name="category"
          label="Category"
          value={formData?.category}
          options={categoryData}
        />

        <Button
          onClick={() => navigate("/quizzes")}
          colorScheme="teal"
          size="md"
          w={"full"}
          mb={4}
        >
          Start Quiz
        </Button>
      </Box>
    </Center>
  );
}

export default StartQuizPage;
