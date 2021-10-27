//This file contains code from the next-auth repo
import { Provider } from "next-auth/client";
import ColorContext from "../components/colorContext";
import "../styles/globals.scss";
import { useState } from "react";
import PropTypes from "prop-types";
export default function App({ Component, pageProps }) {
  const themeObj = {
    headerText: "black",
    headerBackgroundColor: "white",
    mainText: "yellow",
    mainBackgroundColor: "hsl(24, 100%, 92%)",
    sublistBackgroundColor: "hsl(7, 48%, 59%)",
    taskContentBackgroundColor: "hsl(24, 100%, 92%)",
    casual: "#7BF1A8",
    warn: "hsl(49, 90%, 62%)",
    urgent: "hsl(345, 93%, 22%)",
    themeDir: "left",
    userPref: "unknown"
  };
  const statefulTheme = useState(themeObj);
  return (
    <Provider
      options={{
        clientMaxAge: 0,
        keepAlive: 0,
      }}
      session={pageProps.session}
    >
      <ColorContext.Provider value={statefulTheme}>
        <Component {...pageProps} />
      </ColorContext.Provider>
    </Provider>
  );
}

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.shape({
    session: PropTypes.object
  }),
};