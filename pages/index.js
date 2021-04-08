import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Card from '../components/card'
import CardContainer from '../components/cardcontainer'
import CardContext from '../components/cardContext'
import React from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
export default function Home() {
  const [stateContext, updateStateContext]=useState([{title: "heroku",
  content: "Heroku is slow",

  id: "heroku"+Date.now()},
  {title: "Vercel",
  content: " Vercel built Nextjs",
id: "Vercel"+Date.now()},
  {title: "Netlify",
  content: "Netlify is static",
  id: "Netlify"+Date.now()}]);
  const defaultContext=[stateContext, updateStateContext];
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <CardContext.Provider value={[defaultContext]}>
          <CardContainer />
           </CardContext.Provider>


      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
