import { useEffect, useState, Suspense } from "react";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/components/loader/Loader";
import { useRouter } from "next/router";
import { ThemeProvider } from "next-themes";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Show loader on route change start
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    // Cleanup event listeners
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <main>
      <ErrorBoundary>
        <Provider store={store}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <Suspense fallback={<Loader screen="full" />}>
              <Component {...pageProps} />
            </Suspense>
          </ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </main>
  );
}
