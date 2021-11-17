import styles from "./colorPicker.module.scss";
import ColorContext from "./colorContext";
import { useEffect, useContext, } from "react";
export default function ColorPicker() {
  const [colorContext, updateColorContext] = useContext(ColorContext);
  const {
    headerText,
    headerBackgroundColor,
    mainText,
    mainBackgroundColor,
    sublistBackgroundColor,
    taskContentBackgroundColor,
    casual,
    warn,
    urgent,
    themeDir,
    userPref
  } = colorContext;
 const darkObj={
  headerText: "hsl(0, 0%, 100%)",
  headerBackgroundColor: "hsl(233, 40%, 4%)",
  mainText: "yellow",
  mainBackgroundColor: "hsl(356, 15%, 19%)",
  sublistBackgroundColor: "hsl(7, 48%, 59%)",
  taskContentBackgroundColor: "hsl(356, 15%, 19%)",
  casual: "hsl(143, 77%, 12%)",
  warn: "hsl(39, 90%, 19%)",
  urgent: "hsl(352, 89%, 18%)",
  themeDir: "right",
  userPref: "dark"
}
const lightObj={
  headerText: "black",
  headerBackgroundColor: "white",
  mainText: "yellow",
  mainBackgroundColor: "hsl(24, 100%, 92%)",
  sublistBackgroundColor: "hsl(7, 48%, 59%)",
  taskContentBackgroundColor: "hsl(24, 100%, 92%)",
  casual: "hsl(143, 81%, 71%)",
  warn: "hsl(49, 90%, 62%)",
  urgent: "hsl(345, 53%, 52%)",
  themeDir: "left",
  userPref: "light"
}
  useEffect(() => {
    if(userPref==="unknown"){

    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDarkScheme) {
      updateColorContext(darkObj);
    } else {
      updateColorContext(lightObj);
    }
    }
    
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateColorContext, userPref]);
  useEffect(() => {
    document
      .querySelector(":root")
      .style.setProperty(
        "--header-background-color",
        headerBackgroundColor
      );
    document
      .querySelector(":root")
      .style.setProperty("--sublist-background-color", sublistBackgroundColor);
    document
      .querySelector(":root")
      .style.setProperty("--main-background-color", mainBackgroundColor);
    document
      .querySelector(":root")
      .style.setProperty(
        "--content-background-color",
        taskContentBackgroundColor
      );
    document
      .querySelector(":root")
      .style.setProperty("--header-text", headerText);
    document.querySelector(":root").style.setProperty("--casual-code", casual);
    document.querySelector(":root").style.setProperty("--warn-code", warn);
    document.querySelector(":root").style.setProperty("--urgent-code", urgent);
    document.querySelector(":root").style.setProperty("--theme-dir", themeDir);
  }, [
    headerText,
    headerBackgroundColor,
    mainText,
    mainBackgroundColor,
    sublistBackgroundColor,
    taskContentBackgroundColor,
    themeDir, casual, warn, urgent,
  ]);
  const changeColor = () => {
    
    if (userPref==="light") {
      updateColorContext(darkObj);
    } else if (userPref==="dark") {
      updateColorContext(lightObj);
    }
  };

  return (
    <button className={styles.buttonWrapper} onClick={changeColor}>
      {" "}
      <div id="color" className={styles.button}></div>
    </button>
  );
}
