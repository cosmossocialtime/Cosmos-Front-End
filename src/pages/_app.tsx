import type { AppProps } from "next/app";
import { RegisterContextProvider } from "../components/context/RegisterContext";
import { GlobalStyle } from "../GlobalStyle";
import "../mainTailwind.css";

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
