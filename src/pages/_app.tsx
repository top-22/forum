import "../styles/theme.scss";
import type { AppProps } from "next/app";

const _App = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default _App;
