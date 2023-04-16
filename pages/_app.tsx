import "@/styles/globals.css";
import "@/styles/mapbox-overrides.css";
import type { AppProps } from "next/app";

import { Cardo, Manrope } from "next/font/google";

const cardo = Cardo({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --cardo-font: ${cardo.style.fontFamily};
            --manrope-font: ${manrope.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
