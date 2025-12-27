import React, { useState } from 'react';
import './Game.css';

const Game = () => {
    const [userInput, setUserInput] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    // Caesar cipher function (converted from Python)
    const caesarCipher = (ciphertext, shift) => {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        let result = "";

        for (let char of ciphertext) {
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

    const handleEncrypt = () => {
        if (!userInput.trim()) {
            return;
        }

        const allResults = [];
        for (let shift = 1; shift <= 26; shift++) {
            allResults.push({
                key: shift,
                text: caesarCipher(userInput, shift)
            });
        }

        setResults(allResults);
        setShowResults(true);
    };

    const handleReset = () => {
        setUserInput('');
        setResults([]);
        setShowResults(false);
    };

    return (
        <section className="game-page">
            <div className="game-container">
                <div className="game-header">
                    <h1 className="game-title">Caesar Cipher Game</h1>
                    <p className="game-subtitle">Encrypt or Decrypt Your Message</p>
                </div>

                <div className="game-input-section">
                    <input
                        type="text"
                        className="game-input"
                        placeholder="Enter your message here..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleEncrypt();
                            }
                        }}
                    />
                    <div className="game-buttons">
                        <button className="encrypt-button" onClick={handleEncrypt}>
                            Generate All Shifts
                        </button>
                        <button className="reset-button" onClick={handleReset}>
                            Reset
                        </button>
                    </div>
                </div>

                {showResults && (
                    <div className="game-results">
                        <h2 className="results-title">All Possible Shifts (1-26)</h2>
                        <div className="results-grid">
                            {results.map((result) => (
                                <div key={result.key} className="result-card">
                                    <div className="result-key">Shift {result.key}</div>
                                    <div className="result-text">{result.text}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {!showResults && (
                    <div className="game-instructions">
                        <h3>How to Play:</h3>
                        <ul>
                            <li>Enter a message you want to encrypt or decrypt</li>
                            <li>Click "Generate All Shifts" to see all 26 possible Caesar cipher shifts</li>
                            <li>Find the correct decryption or choose your favorite encryption!</li>
                            <li>Earn points by solving cipher challenges</li>
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Game;