import styles from './colorPicker.module.scss'
import ColorContext from './colorContext';
import { useEffect, useContext, useState } from 'react';
export default function colorPicker(){
  
    const     [colorContext, updateColorContext]=useContext(ColorContext);
    const [day, updateDay]=useState(false);
    const {headerText,
    headerBackgroundColor,
    mainText,
    mainBackgroundColor,
    sublistBackgroundColor,
    taskContentBackgroundColor, themeDir}=colorContext;
    /*--body-background-color:    hsla(0, 9%, 12%);
       --header-text: hsla(0, 9%, 75%);
       --darker-header-text: hsla(0, 9%, 50%);
       --darker-header-background-color: hsla(0, 9%, 7%);
       --header-background-color:hsla(0, 9%, 4%, 1);
       --list-header-background-color:  hsla(0, 9%, 9%);
       --dark-header-text:hsla(0, 9%, 25%);*/

       useEffect(()=>{
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        console.log(prefersDarkScheme);
        prefersDarkScheme? updateDay(false):updateDay(true);
        if(prefersDarkScheme){
          updateColorContext({
          headerText:"hsl(0, 0%, 100%)",
          headerBackgroundColor: "hsl(233, 40%, 4%)",
          mainText: "yellow",
          mainBackgroundColor: "hsl(356, 15%, 19%)",
          sublistBackgroundColor: "hsl(7, 48%, 59%)",
          taskContentBackgroundColor:"hsl(356, 15%, 19%)",
          themeDir: "right",
      
        }
          )}
      
      else{
          updateColorContext({
              headerText:"black",
              headerBackgroundColor: "white",
              mainText: "yellow",
              mainBackgroundColor: "hsl(24, 100%, 92%)",
              sublistBackgroundColor: "hsl(7, 48%, 59%)",
              taskContentBackgroundColor:"hsl(24, 100%, 92%)",
              themeDir: "left",
      })
      }

       },[])
    useEffect(()=>{
    
        document.querySelector(':root').style.setProperty('--header-background-color', colorContext.headerBackgroundColor);
        document.querySelector(':root').style.setProperty('--sublist-background-color', sublistBackgroundColor);
        document.querySelector(':root').style.setProperty('--main-background-color', mainBackgroundColor);
        document.querySelector(':root').style.setProperty('--content-background-color', taskContentBackgroundColor);
        document.querySelector(':root').style.setProperty('--header-text', headerText);
        document.querySelector(':root').style.setProperty('--theme-dir', themeDir);
    },[headerText,
        headerBackgroundColor,
        mainText,
        mainBackgroundColor,
        sublistBackgroundColor,
        taskContentBackgroundColor,
        themeDir
      ]);
  const changeColor=()=>{
      
    day?updateDay(false): updateDay(true);
if(day){
    updateColorContext({
    headerText:"hsl(0, 0%, 100%)",
    headerBackgroundColor: "hsl(233, 40%, 4%)",
    mainText: "yellow",
    mainBackgroundColor: "hsl(356, 15%, 19%)",
    sublistBackgroundColor: "hsl(7, 48%, 59%)",
    taskContentBackgroundColor:"hsl(356, 15%, 19%)",
    themeDir: "right",

  }
    )}

else{
    updateColorContext({
        headerText:"black",
        headerBackgroundColor: "white",
        mainText: "yellow",
        mainBackgroundColor: "hsl(24, 100%, 92%)",
        sublistBackgroundColor: "hsl(7, 48%, 59%)",
        taskContentBackgroundColor:"hsl(24, 100%, 92%)",
        themeDir: "left",
})
}
  }


    return(
       <button className={styles.buttonWrapper} onClick={changeColor}> <div id="color"className={styles.button}></div></button>)

    
}