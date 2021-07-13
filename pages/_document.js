import Document, { Html, Head, Main, NextScript } from "next/document";
import { resetServerContext } from "react-beautiful-dnd";
import ColorContext from "../components/colorContext";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
	resetServerContext()
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;