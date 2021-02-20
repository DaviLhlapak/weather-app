import { AppProps } from "next/app";

import "tailwindcss/tailwind.css";

export default function WeatherApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}