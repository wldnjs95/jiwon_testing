import "@/styles/globals.css";
import Navbar from "@/components/common/navbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar></Navbar>

      <Component {...pageProps} />
    </>
  );
}
