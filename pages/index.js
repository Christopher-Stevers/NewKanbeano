import Header from "../components/header";
import styles from "../styles/root.module.scss";
import Link from "next/link";
import Head from "next/head";
import PropTypes from "prop-types";
import { signIn, getSession  } from "next-auth/client";
import ColorPicker from "../components/colorPicker";
export default function Home({session}) {
 
  return (
    <>
      <Head>
        <title>Kanbeano</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header session={session} />

      <main className={styles.main}>
        <h2 className={styles.h2}>
          Kanban <em className={styles.em}>simplified</em>
        </h2>
        <p className={styles.like}>
          Kanban {`doesn't`} need to be complicated. A Board. With Lists. {`That's `}
          what you need, and {`that's `}what Kanbeano gives you. Check out the{` `}
          <span className={styles.link}>
            <Link href="/demo">demo</Link>
          </span>{` `}
          or{` `}
          <button onClick={signIn} className={styles.link}>
            sign in
          </button>{` `}
          to create an account and save your boards.
        </p>
      </main>
      <ColorPicker />
    </>
  );
}

Home.propTypes = {
  session: PropTypes.object,
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return { props: {  session } };
}
