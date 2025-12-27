import React, { useState, useEffect } from 'react';
import './Challenges.css';

const Challenges = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [userAnswers, setUserAnswers] = useState({});
    const [totalPoints, setTotalPoints] = useState(0);
    const [solvedChallenges, setSolvedChallenges] = useState(new Set());
    const [feedback, setFeedback] = useState({});
    const [challenges, setChallenges] = useState([]);

    // Caesar cipher function 
    const caesarCipher = (text, shift) => {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        let result = "";

        for (let char of text) {
            if (alphabet.includes(char.toLowerCase())) {
                const position = alphabet.indexOf(char.toLowerCase());
                const newPos = (position + shift) % 26;
                const newChar = alphabet[newPos];

                if (char === char.toUpperCase()) {
                    result += newChar.toUpperCase();
                } else {
                    result += newChar;
                }
            } else {
                result += char;
            }
        }

        return result;
    };

    // Initialize challenges when game starts
    useEffect(() => {
        if (gameStarted && challenges.length === 0) {
            const easyMessages = [
                "Hello world",
                "Code is fun"
            ];
            
            const hardMessages = [
                "The quick brown fox jumps over the lazy dog",
                "Cryptography is the art of writing secret messages"
            ];

            const newChallenges = [
                {
                    id: 1,
                    difficulty: "Easy",
                    points: 200,
                    originalMessage: easyMessages[0],
                    shift: Math.floor(Math.random() * 25) + 1,
                },
                {
                    id: 2,
                    difficulty: "Easy",
                    points: 200,
                    originalMessage: easyMessages[1],
                    shift: Math.floor(Math.random() * 25) + 1,
                },
                {
                    id: 3,
                    difficulty: "Hard",
                    points: 400,
                    originalMessage: hardMessages[0],
                    shift: Math.floor(Math.random() * 25) + 1,
                },
                {
                    id: 4,
                    difficulty: "Hard",
                    points: 400,
                    originalMessage: hardMessages[1],
                    shift: Math.floor(Math.random() * 25) + 1,
                }
            ].map(challenge => ({
                ...challenge,
                encryptedMessage: caesarCipher(challenge.originalMessage, challenge.shift)
            }));

            setChallenges(newChallenges);
        }
    }, [gameStarted]);

    const handleStartGame = () => {
        setGameStarted(true);
        setTotalPoints(0);
        setSolvedChallenges(new Set());
        setUserAnswers({});
        setFeedback({});
        setChallenges([]);
    };

    const handleAnswerChange = (challengeId, value) => {
        setUserAnswers({
            ...userAnswers,
            [challengeId]: value
        });
        // Clear feedback when user types
        if (feedback[challengeId]) {
            setFeedback({
                ...feedback,
                [challengeId]: null
            });
        }
    };

    const handleSubmitAnswer = (challenge) => {
        if (solvedChallenges.has(challenge.id)) {
            return; // Already solved
        }

        const userAnswer = userAnswers[challenge.id]?.trim().toLowerCase() || '';
        const correctAnswer = challenge.originalMessage.toLowerCase();

        if (userAnswer === correctAnswer) {
            setSolvedChallenges(new Set([...solvedChallenges, challenge.id]));
            setTotalPoints(totalPoints + challenge.points);
            setFeedback({
                ...feedback,
                [challenge.id]: { success: true, message: `Correct! +${challenge.points} points!` }
            });
        } else {
            setFeedback({
                ...feedback,
                [challenge.id]: { success: false, message: 'Incorrect. Try again!' }
            });
        }
    };

    const handleRestart = () => {
        setGameStarted(false);
        setTotalPoints(0);
        setSolvedChallenges(new Set());
        setUserAnswers({});
        setFeedback({});
        setChallenges([]);
    };

    if (!gameStarted) {
        return (
            <section className="game-page">
                <div className="game-container challenge-landing-container">
                    <div className="challenge-landing-content">
                        <h1 className="game-title challenge-landing-title">Caesar Cipher Challenge</h1>
                        <div className="objective-box">
                            <h2 className="objective-title">Objective</h2>
                            <p className="objective-text">Decrypt the ciphers to earn points!</p>
                            <div className="points-info">
                                <div className="point-item">
                                    <span className="difficulty-badge easy">Easy</span>
                                    <span className="points-value">200 pts each</span>
                                </div>
                                <div className="point-item">
                                    <span className="difficulty-badge hard">Hard</span>
                                    <span className="points-value">400 pts each</span>
                                </div>
                            </div>
                        </div>
                        <button className="play-button" onClick={handleStartGame}>
                            <span className="play-icon">▶</span>
                            Play Game
                        </button>
                        <div className="game-info">
                            <p>Crack 4 Caesar cipher challenges and maximize your score!</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="game-page">
            <div className="game-container">
                <div className="game-header">
                    <h1 className="game-title">Caesar Cipher Challenge</h1>
                    <div className="score-board">
                        <div className="score-item">
                            <span className="score-label">Score:</span>
                            <span className="score-value">{totalPoints}</span>
                        </div>
                        <div className="score-item">
                            <span className="score-label">Solved:</span>
                            <span className="score-value">{solvedChallenges.size}/4</span>
                        </div>
                    </div>
                </div>

                <div className="challenges-grid">
                    {challenges.map((challenge) => {
                        const isSolved = solvedChallenges.has(challenge.id);
                        const currentFeedback = feedback[challenge.id];

                        return (
                            <div 
                                key={challenge.id} 
                                className={`challenge-card ${isSolved ? 'solved' : ''} ${challenge.difficulty.toLowerCase()}`}
                            >
                                <div className="challenge-header">
                                    <span className={`difficulty-badge ${challenge.difficulty.toLowerCase()}`}>
                                        {challenge.difficulty}
                                    </span>
                                    <span className="challenge-points">
                                        {challenge.points} pts
                                    </span>
                                </div>

                                <div className="encrypted-message-box">
                                    <div className="encrypted-label">Encrypted Message:</div>
                                    <div className="encrypted-text">{challenge.encryptedMessage}</div>
                                </div>

                                {!isSolved ? (
                                    <div className="answer-section">
                                        <input
                                            type="text"
                                            className="answer-input"
                                            placeholder="Enter decrypted message..."
                                            value={userAnswers[challenge.id] || ''}
                                            onChange={(e) => handleAnswerChange(challenge.id, e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleSubmitAnswer(challenge);
                                                }
                                            }}
                                        />
                                        <button 
                                            className="submit-button"
                                            onClick={() => handleSubmitAnswer(challenge)}
                                        >
                                            Submit
                                        </button>
                                        {currentFeedback && (
                                            <div className={`feedback ${currentFeedback.success ? 'success' : 'error'}`}>
                                                {currentFeedback.message}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="solved-section">
                                        <div className="solved-icon">✓</div>
                                        <div className="solved-message">
                                            <strong>Solved!</strong>
                                            <div className="original-message">{challenge.originalMessage}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {solvedChallenges.size === 4 && (
                    <div className="victory-section">
                        <h2 className="victory-title">🎉 Congratulations! 🎉</h2>
                        <p className="victory-message">You've solved all challenges!</p>
                        <p className="final-score">Final Score: <span>{totalPoints}</span> points</p>
                    </div>
                )}

                <div className="game-actions">
                    <button className="restart-button" onClick={handleRestart}>
                        New Game
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Challenges;