import type { AppProps } from "next/app";
import { RegisterContextProvider } from "../components/context/RegisterContext";
import { GlobalStyle } from "../GlobalStyle";

import "../lib/dayjs"
import "../mainTailwind.css";
import "./dashboard/satellite-images/planets.css"
import "keen-slider/keen-slider.min.css";
import { AuthProvider } from "../context/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <GlobalStyle />
    </>
  );
}

export default MyApp;
