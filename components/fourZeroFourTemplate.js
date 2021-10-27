import styles from "./fourZeroFour.module.scss"
import ColorPicker from "./colorPicker"
import PropTypes from "prop-types"
export default function FourZeroFourTemplate({centeredText}){


    return(
<>
<main className={styles.container}>

<div className={styles.text}>{centeredText}</div></main>
<ColorPicker />
</>
    )
}
FourZeroFourTemplate.propTypes={
    centeredText: PropTypes.string.isRequired,
}