import styles from './cardColor.module.scss';
import { useState, useContext } from 'react'
import CardContext from './cardContext'
import NewContext from '../components/newContext'
export default function CardColor(props) {
   
    const [open, updateOpen]=useState(false);
    const currentColor=props.passedStyles;
    const handleHover=()=>{ 
        console.log(props.currentColor);
     
     updateOpen(true);
    }
    const handleHoverLeave=()=>{

        updateOpen(true);

    }
    const red={backgroundColor: "red"};
    const yellow={backgroundColor: "yellow"};
    const defaultColour={backgroundColor: "var(--header-background-color)"};
    const green={backgroundColor: "green"};
    return(<div onMouseLeave={handleHoverLeave} onMouseOver={handleHover} className={styles.colorButton}>
        <div style={props.currentColor.backgroundColor?props.currentColor : defaultColour} className={styles.container}>
    </div>
    {<div className={open ? `${styles.list} ${styles.open}`:`${styles.list}`}>
    <div className={styles.hoverDiv}><button style={red} className={styles.container}></button></div>
    <div className={styles.hoverDiv}><button style={yellow} className={styles.container}></button></div>
    <div className={styles.hoverDiv}><button style={green} className={styles.container}></button></div>
    <div className={styles.hoverDiv}><button style={defaultColour} className={styles.container}></button></div></div>}
    </div>)
}