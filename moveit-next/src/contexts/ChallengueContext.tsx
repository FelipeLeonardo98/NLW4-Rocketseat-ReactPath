import { createContext, useState, ReactNode, useEffect } from 'react';
// lib de JS para lidar com cokies
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/levelUpModal';

// interface para descrever a estrutura do Challenge
interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}


// criando uma interface para "organizar" os atributos e desestruturar futuramente
// em outros components
interface ChallengesContextData {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}


export const ChallengesContext = createContext({} as ChallengesContextData);

interface ChallengesProviderProps {
    children: ReactNode;
    // type ReactNode para aceitar qualquer coisa {componentes, elementos, tags...}
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}




export function ChallengesProvider({
    children,
    ...rest
    // para pegar todos valores que não fazem parte do children, pegue todo restante assim "...object"
}: ChallengesProviderProps) {
    //definindo useState do LEVEL
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    // state dos desafios para cumprir
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    // next level
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    //setting alarm
    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted])
    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }
    function startNewChallenge() {
        // criando uma função para adquirir um desafio aletório
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        //  play song
        new Audio('./notification.mp3').play();
        new Notification('Novo desafio 🤸🏼‍♂️', {
            body: `Valendo ${challenge.amount} xp!`
        })
        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🤸🏼‍♂️', {
                body: `Valendo ${challenge.amount} xp!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        // se o Challenge não estiver ativo
        if (!activeChallenge) {
            return; // return void
        }
        const { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);

    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                experienceToNextLevel,
                challengesCompleted,
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal

            }}

        >
            {children}
            {/*Modal de LevelUp - "&&" if sem "else" */}
            {isLevelUpModalOpen && <LevelUpModal />}

        </ChallengesContext.Provider>
    )
}