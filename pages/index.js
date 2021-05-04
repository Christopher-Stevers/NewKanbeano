
import Header from '../components/header'
import styles from '../styles/root.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { signIn, signOut, useSession } from 'next-auth/client'
import Image from 'next/image'
export default function Home() {
    const router=useRouter();
    const [session, loading]=useSession();
    console.log(session);
    if(session){router.push("/board")}
    const signingIn=async()=>{
await signIn();
 router.push("/board");}
  return (<><Header />

<main className={styles.main}><h2 className={styles.h2}>Kanban <em className={styles.em}>simplified</em></h2>
<p className={styles.like}>Kanban  doesn't need to be complicated. A Board. With Lists. That's all you need, and that's what Kanbeano gives you. Check out the <span className={styles.link}><Link href="/demo">demo</Link></span> or <button onClick={signIn} className={styles.link}>sign in</button> to create an account and build save your own boards.</p></main>

  </>
  )
}

{/*<div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
  */} {/*</main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>*/}