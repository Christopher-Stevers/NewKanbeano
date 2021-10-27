import styles from "./fourZeroFour.module.scss"
import Header from"../components/header"
export default function fourZeroFourTemplate(){


    return(
<>
<Header />
<main className={styles.container}>

<div className={styles.text}>404 | Page not found.</div></main>
</>
    )
}