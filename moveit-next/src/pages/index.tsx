import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { CompletedChallengues } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import styles from '../styles/pages/Home.module.css';
import { ChallengueBox } from "../components/ChallengueBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from '../contexts/ChallengueContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {


  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
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
    </ChallengesProvider>
  )
}

// precisa ser este nome: getServerSideProps
// aqui se roda code que séra refletido no backend e não no front
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // aqui eu posso fazer uma chamada de API
  const user = {
    level: 1,
    currentExperience: 1,
    challengesCompleted: 1
  }
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}