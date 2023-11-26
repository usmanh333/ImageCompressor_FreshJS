import { AppProps } from "$fresh/server.ts";
import Navbar from "../components/Navbar.tsx";

export default function App({ Component }: AppProps) {
  return (
    <html class="bg-[#18181bff] text-[#fff]">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ImageCompressor FreshJs</title>
      </head>
      <body>
        <Navbar />
        <Component />
      </body>
    </html>
  );
}
