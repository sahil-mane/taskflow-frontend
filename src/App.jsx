import AppRoutes from "./routes/AppRoutes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";


function App() {
  const queryClient = new QueryClient();
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position={isMobile ? "top-center" : "top-right"} />
      <AppRoutes />
    </QueryClientProvider>
  );
}

export default App
