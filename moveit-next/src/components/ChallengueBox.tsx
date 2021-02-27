import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengueContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengueBox.module.css';

export function ChallengueBox() {
    //desestruturando o ChallengeContext
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
    const { resetCountdown } = useContext(CountdownContext);

    // métodos usados para as actions dos botões {desafio Success and Failed}
    function handleChallengeSucced() {
        completeChallenge();
        resetCountdown();
    }

    function handleChallengeFailed() {
        resetChallenge();
        resetCountdown();
    }

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
                            onClick={handleChallengeFailed}
                        >
                            Falhei
                        </button>
                        <button
                            type="button"
                            className={styles.challengueSucceededButton}
                            onClick={handleChallengeSucced}
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