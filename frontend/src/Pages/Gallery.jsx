import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import './Gallery.css';

const Gallery = () => {
    const [cards, setCards] = useState([]);
    const [fadeIn, setFadeIn] = useState(false);
    const [activeTab, setActiveTab] = useState('today');
    const [ownedCards, setOwnedCards] = useState([]);
    const [prices, setPrices] = useState({});
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const apiURL = process.env.REACT_APP_VALORANT_API_URL;
        fetch(`${apiURL}/playercards`)
            .then(res => res.json())
            .then(data => {
                setCards(data.data.slice(0, 12));
                // Initialize prices
                const initialPrices = {};
                data.data.slice(0, 12).forEach(card => {
                    initialPrices[card.uuid] = (Math.random() * 5 + 0.5).toFixed(2);
                });
                setPrices(initialPrices);
            })
            .catch(error => console.error('Error fetching cards:', error));

        setTimeout(() => setFadeIn(true), 100);
    }, []);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBuyCard = (cardID) => {
        if (ownedCards.includes(cardID)) {
            alert('Card already owned!');
            return;
        }
        setOwnedCards([...ownedCards, cardID]);
        alert('Card purchased successfully!');
    };

    const handlePriceChange = (cardID, value) => {
        setPrices({
            ...prices,
            [cardID]: value
        });
    };

    // Display active tab
    const displayedCards = activeTab === 'today'
        ? cards
        : cards.filter(card => ownedCards.includes(card.uuid));

    const username = localStorage.getItem("username") || "Guest";

    return (
        <section className="gallery-page">
            <div className="gallery-layout">
                {/* Left Sidebar */}
                <div className="gallery-sidebar">
                    <div className="profile-section">
                        <div className="profile-picture">
                            <img
                                src="#"
                                alt={username}
                            />
                        </div>
                        <h2 className="sidebar-username">{username}</h2>
                    </div>

                    <div className="sidebar-stats">
                        <div className="stat-card">
                            <div className="stat-icon">🎴</div>
                            <div className="stat-info">
                                <span className="stat-label">Cards Owned</span>
                                <span className="stat-value">{ownedCards.length}</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">📊</div>
                            <div className="stat-info">
                                <span className="stat-label">Total Cards</span>
                                <span className="stat-value">{cards.length}</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">⭐</div>
                            <div className="stat-info">
                                <span className="stat-label">Collection</span>
                                <span className="stat-value">
                                    {cards.length > 0 ? Math.round((ownedCards.length / cards.length) * 100) : 0}%
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="progress-section">
                        <div className="progress-header">
                            <span>Collection Progress</span>
                            <span>{ownedCards.length}/{cards.length}</span>
                        </div>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{
                                    width: `${cards.length > 0 ? (ownedCards.length / cards.length) * 100 : 0}%`
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="gallery-content">
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

                        {displayedCards.length === 0 && activeTab === 'collection' ? (
                            <div style={{ textAlign: 'center', padding: '4rem' }}>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem' }}>
                                    No cards in your collection yet!
                                </p>
                            </div>
                        ) : (
                            <div className="gallery-grid">
                                {displayedCards.map(card => {
                                    const isOwned = ownedCards.includes(card.uuid);

                                    return (
                                        <div key={card.uuid} className="card-item">
                                            <div className="card-image-container">
                                                <img
                                                    src={card.displayIcon || card.largeArt || card.smallArt}
                                                    alt={card.displayName}
                                                    className="card-image"
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                                                    }}
                                                />
                                            </div>
                                            <div className="card-content">
                                                <h3 className="card-name" title={card.displayName}>
                                                    {card.displayName}
                                                </h3>
                                                <div className="card-price-container">
                                                    <span className="card-price-label">Price:</span>
                                                    <input
                                                        type="number"
                                                        value={prices[card.uuid] || ''}
                                                        onChange={(e) => handlePriceChange(card.uuid, e.target.value)}
                                                        placeholder="0.00"
                                                        className="card-price-input"
                                                        min="0"
                                                        step="0.01"
                                                    />
                                                    <span style={{ color: 'white', fontSize: '0.9rem' }}>ETH</span>
                                                </div>
                                                <button
                                                    className={`buy-button ${isOwned ? 'owned' : ''}`}
                                                    onClick={() => handleBuyCard(card.uuid)}
                                                    disabled={isOwned}
                                                >
                                                    {isOwned ? '✓ Owned' : 'Buy Card'}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <a
                href="#top"
                className={`gallery-back-to-top ${isVisible ? 'visible' : ''}`}
                aria-label="Back to top"
                onClick={scrollToTop}
            >
                <FontAwesomeIcon icon={faArrowUp} />
            </a>
        </section>
    );
};

export default Gallery;