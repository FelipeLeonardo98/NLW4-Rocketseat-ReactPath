import { CompletedChallengues } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import styles from '../styles/pages/Home.module.css';
import Head from 'next/head';
import { ChallengueBox } from "../components/ChallengueBox";
import { CountdownProvider } from "../contexts/CountdownContext";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title> Início | Movit</title>
      </Head>

      <ExperienceBar />

      <CountdownProvider>
        <section>
          <div>
            <Profile />
            <CompletedChallengues />
            <Countdown />
          </div>

          <div>
            <ChallengueBox />
          </div>
        </section>
      </CountdownProvider>

    </div>
  )
}
