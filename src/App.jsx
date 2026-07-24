import AppRouter from "./routes/AppRouter";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster position="top-right" richColors closeButton duration={5000} />

      <AppRouter />
    </>
  );
}

export default App;
