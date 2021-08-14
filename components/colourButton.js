import styles from './colourButton.module.scss'
export default function ColourButton(props){

    const handleClick=()=>{ 
        props.clicked(props.colour);

    }
    return(<div className={styles.hoverDiv}>
        <button onClick={handleClick} style={{backgroundColor: props.colour}} className={styles.container}></button>
    </div>)
}