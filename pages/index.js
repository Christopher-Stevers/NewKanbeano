import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Card from '../components/card'
import CardContainer from '../components/cardcontainer'
import CardContext from '../components/cardContext'
import React from 'react'
import Il from '../components/ol.js'
import { useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';
export default function Home() {
  const red=Date.now();
  const current=Date.now();
  const cardContext=useContext(CardContext);
  const [stateContext, updateStateContext]=useState([/*{
    title: "dingawlwal",
    content: "",

    id: current+"github",
    editable: true
}*/]);
  const [otherStateContext, updateOtherStateContext]=useState([/*{
    title: "Gitlense",
    content: "",

    id: current+"github",
    editable: true
}*/])
  const defaultContext=[stateContext, updateStateContext];
  const otherDefaultContext=[otherStateContext, updateOtherStateContext];
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

      </header>

      <main className={styles.main}>
        <CardContext.Provider value={[defaultContext]}>
          <CardContainer list={stateContext}/>
           </CardContext.Provider>

           <CardContext.Provider value={[otherDefaultContext]}>
          <CardContainer list={otherStateContext}/>
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
      <Il />
    </div>
  )
}
