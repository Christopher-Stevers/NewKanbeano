
import Header from '../components/header'
import styles from '../styles/root.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { signIn,  useSession } from 'next-auth/client'
import ColorPicker from '../components/colorPicker'
export default function Home() {
    const router=useRouter();
    const [session, loading]=useSession();
    console.log(session);
   // if(session){router.push("/board")}
    const signingIn=async()=>{
//await signIn();
// router.push("/board");
}
  return (<>
  
  
  <Head>
        <title>Kanbeano</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  </Head>
  <Header />

<main className={styles.main}><h2 className={styles.h2}>Kanban <em className={styles.em}>simplified</em></h2>
<p className={styles.like}>Kanban  doesn't need to be complicated. A Board. With Lists. That's what you need, and that's what Kanbeano gives you. It features a  Check out the <span className={styles.link}><Link href="/demo">demo</Link></span> or <button onClick={signIn} className={styles.link}>sign in</button> to create an account and build save your own boards.</p></main>
<ColorPicker/>
  </>
  )
}
