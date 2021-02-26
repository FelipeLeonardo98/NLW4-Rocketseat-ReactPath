import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengueContext';
import styles from '../styles/components/ChallengueBox.module.css';

export function ChallengueBox() {
    //desestruturando o ChallengeContext
    const { activeChallenge, resetChallenge } = useContext(ChallengesContext);
    //const hasActiveChallenge = true;

    return (
        <div className={styles.challengueBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengueActive}>
                    <header>{activeChallenge.amount} xp</header>

                    <main>
                        {/* retornando o icon de BODY or EYE dinmicamente */}
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description} .</p>
                        <br></br>
                    </main>

                    <footer>
                        <button
                            type="button"
                            className={styles.challengueFailedButton}
                            onClick={resetChallenge}
                        >
                            Falhei
                        </button>
                        <button
                            type="button"
                            className={styles.challengueSucceededButton}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                    <div className={styles.challengueNoActive}>
                        <strong>Finalize um ciclo para receber um desafio</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level Up" />
                    Avance de level completando desafios
                </p>
                    </div>
                )}

        </div>
    )

}