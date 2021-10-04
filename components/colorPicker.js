import styles from "./colorPicker.module.scss";
import ColorContext from "./colorContext";
import { useEffect, useContext, useState } from "react";
export default function ColorPicker() {
  const [colorContext, updateColorContext] = useContext(ColorContext);
  const [day, updateDay] = useState(false);
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
  } = colorContext;
 
  useEffect(() => {
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    prefersDarkScheme ? updateDay(false) : updateDay(true);
    if (prefersDarkScheme) {
      updateColorContext({
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
      });
    } else {
      updateColorContext({
        headerText: "black",
        headerBackgroundColor: "white",
        mainText: "yellow",
        mainBackgroundColor: "hsl(24, 100%, 92%)",
        sublistBackgroundColor: "hsl(7, 48%, 59%)",
        taskContentBackgroundColor: "hsl(24, 100%, 92%)",
        casual: "hsl(143, 81%, 71%)",
        warn: "hsl(49, 90%, 62%)",
        urgent: "hsl(345, 93%, 22%)",
        themeDir: "left",
      });
    }
  }, [updateColorContext]);
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
    day ? updateDay(false) : updateDay(true);
    if (day) {
      updateColorContext({
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
      });
    } else {
      updateColorContext({
        headerText: "black",
        headerBackgroundColor: "white",
        mainText: "yellow",
        mainBackgroundColor: "hsl(24, 100%, 92%)",
        sublistBackgroundColor: "hsl(7, 48%, 59%)",
        taskContentBackgroundColor: "hsl(24, 100%, 92%)",
        casual: "hsl(143, 81%, 71%)",
        warn: "hsl(49, 90%, 62%)",
        urgent: "hsl(352, 90%, 63%)",
        themeDir: "left",
      });
    }
  };

  return (
    <button className={styles.buttonWrapper} onClick={changeColor}>
      {" "}
      <div id="color" className={styles.button}></div>
    </button>
  );
}
