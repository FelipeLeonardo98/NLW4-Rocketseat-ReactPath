import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengueContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    // adquirindo o level
    const { level } = useContext(ChallengesContext);
    return (

        <div className={styles.profileContainer}>
            <img src="https://github.com/felipeleonardo98.png" alt="Felipe Leonardo" />
            <div>
                <strong>Felipe Leonardo</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level  {level}
                </p>
            </div>
        </div>
    );
}