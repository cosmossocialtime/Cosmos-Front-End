import type { AppProps } from "next/app";
import { RegisterContextProvider } from "../components/context/RegisterContext";
import { GlobalStyle } from "../GlobalStyle";

import "../lib/dayjs"
import "../mainTailwind.css";
import "./dashboard/satellite-images/planets.css"
import "keen-slider/keen-slider.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RegisterContextProvider>
        <Component {...pageProps} />
        <GlobalStyle />
      </RegisterContextProvider>
    </>
  );
}

export default MyApp;
