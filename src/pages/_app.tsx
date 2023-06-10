import type { AppProps } from "next/app";
import { GlobalStyle } from "../styles/GlobalStyle";
import { AuthProvider } from "../context/AuthProvider";
import Router from "next/router";
import Nprogress from "nprogress"

import "../lib/dayjs"
import "../styles/mainTailwind.css";
import "./dashboard/satellite-images/planets.css"
import "keen-slider/keen-slider.min.css";

Router.events.on("routeChangeStart", (url) => {
  Nprogress.start()
})
Router.events.on("routeChangeComplete", () => {
  Nprogress.done()
})

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
