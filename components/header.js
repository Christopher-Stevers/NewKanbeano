//I copy pasted example this code from  https://github.com/nextauthjs/next-auth-example

import Link from "next/link";
import { signIn, signOut,  } from "next-auth/client";
import styles from "./header.module.scss";
import PropTypes from "prop-types"

// This header is built for serverside 
export default function Header({session}) {

  return (
    <header className={styles.header}>
      <div className={styles.signedInStatus}>
        <div className={ styles.loaded}>
          <h1 className={styles.h1}>
            <Link href="/">KANBEANO</Link>
          </h1>
          <div className={styles.myBoards}>
            <Link href="/board">My Boards</Link>
          </div>
          <div className={styles.userInfo}>
            {!session && (
              <>
                <a
                  href={`/api/auth/signin`}
                  className={styles.buttonPrimary}
                  onClick={(e) => {
                    e.preventDefault();
                    signIn();
                  }}
                >
                  Sign in
                </a>
              </>
            )}
            {session && (
              <>
                <div className={styles.flexContainer}>
                  {session.user.image && (
                    <span
                      style={{ backgroundImage: `url(${session.user.image})` }}
                      className={styles.avatar}
                    />
                  )}
                  <span className={styles.signedInText}>
                    <p>
                      Signed in as <br />
                      <strong className={styles.strong}>
                        {session.user.email || session.user.name}
                      </strong>
                    </p>
                  </span>
                  <p className={styles.button}>
                    <a
                      href={`/api/auth/signout`}
                      onClick={(e) => {
                        e.preventDefault();
                        signOut();
                      }}
                    >
                      Sign out
                    </a>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <nav></nav>
    </header>
  );
}


Header.propTypes = {
  session: PropTypes.object
};