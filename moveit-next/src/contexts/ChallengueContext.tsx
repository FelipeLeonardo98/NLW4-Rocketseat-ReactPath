import { createContext, useState, ReactNode } from 'react';
import challenges from '../../challenges.json';

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
}


export const ChallengesContext = createContext({} as ChallengesContextData);

interface ChallengesProviderProps {
    children: ReactNode;
    // type ReactNode para aceitar qualquer coisa {componentes, elementos, tags...}
}

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    //definindo useState do LEVEL
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    // state dos desafios para cumprir
    const [activeChallenge, setActiveChallenge] = useState(null);

    // next level
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        // criando uma função para adquirir um desafio aletório
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);
    }

    function resetChallenge() {
        setActiveChallenge(null);
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
                resetChallenge
            }}

        >
            {children}
        </ChallengesContext.Provider>
    )
}