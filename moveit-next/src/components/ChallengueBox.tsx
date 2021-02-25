import styles from '../styles/components/ChallengueBox.module.css';

export function ChallengueBox() {
    const hasActiveChallenge = true;

    return (
        <div className={styles.challengueBoxContainer}>
            {hasActiveChallenge ? (
                <div className={styles.challengueActive}>
                    <header>Ganhe 400xp</header>

                    <main>
                        <img src="icons/body.svg" />
                        <strong>Novo desafio</strong>
                        <p>Levante e faça uma camidada de 3 minutos.</p>
                    </main>

                    <footer>
                        <button
                            type="button"
                            className={styles.challengueFailedButton}
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