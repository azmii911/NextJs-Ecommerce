import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { wrapper } from "../store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const WrappedApp = ({ Component, pageProps }) => {
  return (
    <>
      <NextNProgress
        color="#4f46e5"
        startPosition={0.3}
        stopDelayMs={200}
        height={4}
        showOnShallow={true}
      />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />{" "}
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(WrappedApp);
