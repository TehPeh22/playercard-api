import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Gallery.css'

const Gallery = () => {
    const [ cards, setCards ] = useState([])
    const [ fadeIn, setFadeIn ] = useState(false)
    const [ activeTab, setActiveTab ] = useState('today')
    const [ ownedCards, setOwnedCards ] = useState([])
    // const [ navigate ] = useNavigate()

    useEffect(() => {
        const apiURL = process.env.REACT_APP_VALORANT_API_URL
        fetch(`${apiURL}/playercards`)
            .then(res => res.json())
            .then(data => {
                setCards(data.data.slice(0, 15))
        })
        setTimeout(() => setFadeIn(true), 100)
    }, [])

    // For BACKEND
    const handleBuyCard = (cardID) => {
        if (ownedCards.includes(cardID)) {
            alert('Card Owned')
            return
        }
        setOwnedCards([...ownedCards, cardID])
        alert('Cards purchased successfully')
    }

    // Display active tab
    const displayedCards = activeTab === 'today'
        ? cards : cards.filter(card => card.owned)

    return (
        <div className={`gallery-container ${fadeIn ? 'fade-in' : ''}`}>
            <div className="gallery-nav">
                <button 
                    className={`nav-button ${activeTab === 'today' ? 'active' : ''}`}
                    onClick={() => setActiveTab('today')}>
                    Today's Pick
                </button>
                <button 
                    className={`nav-button ${activeTab === 'collection' ? 'active' : ''}`}
                    onClick={() => setActiveTab('collection')}>
                    My Collection
                </button>
            </div>

            <h1 className="gallery-title">
                {activeTab === 'today' ? "Today's Pick" : "My Collection"}
            </h1>
            <div className="gallery-grid">
                {displayedCards.map(card => {
                    const isOwned = ownedCards.includes(card.uuid);
                    
                    return (
                        <div key={card.uuid} className="card-item">
                            <div className="card-image-container"> 
                                <img src={card.displayIcon} alt={card.displayName} className="card-image"/>
                            </div>
                            <div className="card-content">
                                <h3 className="card-name">{card.displayName}</h3>
                                <div className="card-price-container">
                                    <span className="card-price-label">Price:</span>
                                    <input type="number" placeholder="0" className="card-price-input"/>
                                </div>
                                <button 
                                    className={`buy-button ${isOwned ? 'owned' : ''}`}
                                    onClick={() => handleBuyCard(card.uuid)}
                                    disabled={isOwned}
                                >
                                    {isOwned ? 'Owned' : 'Buy Card'}
                                </button>
                            </div>
                        </div>
                    )
                })} 
            </div>
        </div>
    )
}

export default Gallery