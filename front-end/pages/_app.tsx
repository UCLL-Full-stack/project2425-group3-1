import "@/styles/globals.css";
import '@/styles/Workouts.module.css'; // Ensure this imports if you have styles in it

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
