//I copy pasted example this code from  https://github.com/nextauthjs/next-auth-example

import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'
import styles from './header.module.scss'

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header () {
  const [ session, loading ] = useSession()
  
  return (
    <header className={styles.header}>
      <div className={styles.signedInStatus}>
        <div className={(!session && loading) ? styles.loading : styles.loaded}>
          <h1 className={styles.h1}><Link href="/">KANBEANO</Link>
          </h1>
          <div className={styles.myBoards}><Link href="/board">My Boards</Link></div>
          <div className={styles.userInfo}>{!session && <>
            <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
          </>}
          {session && <><div className={styles.flexContainer}>
            {session.user.image && <span style={{backgroundImage: `url(${session.user.image})` }} className={styles.avatar}/>}
            <span className={styles.signedInText}>
              <p >Signed in as <br/><strong className={styles.strong}>{session.user.email || session.user.name}</strong></p>
              </span>
            <p
                className={styles.button}><a
                href={`/api/auth/signout`}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a></p></div>
          </>}</div>
        </div>
      </div>
      <nav>
        
      </nav>
    </header>
  )
}
