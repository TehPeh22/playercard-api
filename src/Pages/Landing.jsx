import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Landing.css';  

const Landing = () => {
    const [randomCards, setRandomCards] = useState([])
    const [fadeIn, setFadeIn] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchRandomCards = async () => {
            // Use try fetch in case: fetching errors, network error, server error, timeout errors to avoid crashing
            // Fetch api data
            const response = await fetch(`${process.env.REACT_APP_VALORANT_API_URL}/playercards`)
            // Extract the JSON data
            const data = await response.json()
            // Extract and shuffeled the cards array
            const shuffeled = data.data.sort(() => .5 - Math.random())
            const selected = shuffeled.slice(0, 5)
            setRandomCards(selected)
            // setting fade in animation when refreshing 
            setTimeout(() => setFadeIn(true), 100)
        }

        fetchRandomCards()
    }, []) // [] = dependency array. Controls when the useEffect runs

    const handleExplore = () => {
        navigate('/login')
    }

    return (
        // Template literals: allow embedding eaxpressions inside string
        <div className={`landing-container ${fadeIn ? 'fade-in' : ''}`}>
            <div className="landing-slider">
                {randomCards.map((card, index) => (
                    <div key={card.uuid} className="card-slide" style={{ animationDelay: `${index * 0.1}s` }}>
                        <img src={card.largeArt} alt={card.displayName} />
                        <div className="card-overlay">
                            <h4>{card.displayName}</h4>
                        </div>
                    </div>
                ))}
            </div>
            <div className="landing-context">
                <h2 className="landing-title">Define, Collect, and Sell</h2>
                <p className="landing-paragraph">Sell and collect your favorite valorant player card</p>
                <button onClick={handleExplore}>Explore</button>
            </div>
        </div>
    )
}

export default Landing