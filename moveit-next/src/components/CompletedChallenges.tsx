import styles from '../styles/components/CompletedChallengues.module.css';

export function CompletedChallengues() {
    return (
        <div className={styles.completedChallenguesContainer}>
            <span>Desafios Completos</span>
            <span>5</span>
        </div>
    )
}