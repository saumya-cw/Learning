import "../index.css";
import { FoodLandingPage } from "../feature/food/pages/Landing";
import { ErrorBoundary } from "./ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <FoodLandingPage />
    </ErrorBoundary>
  );
}
export default App;
