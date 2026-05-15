import { AppContextProvider } from "./context/AppContextProvider";
import HomePage from "./pages";

function App() {
  return (
    <AppContextProvider>
      <HomePage />
    </AppContextProvider>
  );
}

export default App;
