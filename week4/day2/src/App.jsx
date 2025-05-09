import ControlledForm from "./components/ControlledForm";
import Counters from "./components/Counters";
import MultiStepForm from "./components/MultiStepForm";
import Quiz from "./components/Quiz";
import ReducerForm from "./components/ReducerForm";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="p-6 space-y-10">
          <h1 className="text-2xl font-bold text-center">
            React Mini Projects
          </h1>
          <ControlledForm />
          <ReducerForm />
          <MultiStepForm />
          <Counters />
          <Quiz />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}
