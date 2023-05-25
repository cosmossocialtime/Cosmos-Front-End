import type { AppProps } from "next/app";
import { GlobalStyle } from "../styles/GlobalStyle";
import { AuthProvider } from "../context/AuthProvider";
import { ProtectedLayout } from "../components/ProtectedLayout";

import "../lib/dayjs"
import "../styles/mainTailwind.css";
import "./dashboard/satellite-images/planets.css"
import "keen-slider/keen-slider.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <ProtectedLayout>
          <Component {...pageProps} />
        </ProtectedLayout>
      </AuthProvider>
      <GlobalStyle />
    </>
  );
}

export default MyApp;
