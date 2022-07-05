import { Heading, Text, Flex } from "@chakra-ui/react";

export const DashboardHeader = ({ navigate, statData }: any) => {
  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading as="h5" size="md">
          Quizzy Statistics
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
          ? `Total ${statData.length} People Attend in Quizzy 🚀`
          : "No People haven't attend in Quizzy 🚀"}
      </Text>
    </>
  );
};
