import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";

// Optional: If you're using Suspense globally, you can wrap your components here
import { Suspense } from "react";

// Suspense fallback component
const Loading = () => <div>Loading...</div>;

const App = ({ Component, pageProps }: AppProps) => {
  return (
    // Wrap the entire app with Suspense to handle i18n loading
    <Suspense fallback={<Loading />}>
      <Component {...pageProps} />
    </Suspense>
  );
};

export default appWithTranslation(App);
