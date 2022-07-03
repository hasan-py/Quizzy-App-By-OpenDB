import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import QuizzesPage from "@src/pages/quizzes";
import StartQuizPage from "@src/pages/startQuiz";
import DashboardPage from "@src/pages/dashboard";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartQuizPage />} />
          <Route path="/quizzes" element={<QuizzesPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
