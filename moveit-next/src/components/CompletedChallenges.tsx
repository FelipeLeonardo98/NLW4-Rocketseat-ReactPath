import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengueContext';

import styles from '../styles/components/CompletedChallengues.module.css';

export function CompletedChallengues() {
    const { challengesCompleted } = useContext(ChallengesContext);
    return (
        <div className={styles.completedChallenguesContainer}>
            <span>Desafios Completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}