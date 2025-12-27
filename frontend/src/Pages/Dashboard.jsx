import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

const Gallery = () => {
    const [cards, setCards] = useState([]);
    const [fadeIn, setFadeIn] = useState(false);
    const [activeTab, setActiveTab] = useState('today');
    const [ownedCards, setOwnedCards] = useState([]);
    const [wishlistCards, setWishlistCards] = useState([]);
    const [prices, setPrices] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    
    // Weekly Challenges State
    const [challenges, setChallenges] = useState({
        login: { completed: false, progress: 0, goal: 1, reward: 500, resetType: 'daily' },
        cipher1: { completed: false, progress: 0, goal: 1, reward: 150, resetType: 'daily' },
        cipher3: { completed: false, progress: 0, goal: 3, reward: 700, resetType: 'weekly' },
        buyCards: { completed: false, progress: 0, goal: 5, reward: 500, resetType: 'weekly' }
    });
    const [timeUntilReset, setTimeUntilReset] = useState({});

    // Calculate time until next reset
    const calculateTimeUntilReset = (resetType) => {
        const now = new Date();
        let nextReset;

        if (resetType === 'daily') {
            // Next day at midnight
            nextReset = new Date(now);
            nextReset.setDate(now.getDate() + 1);
            nextReset.setHours(0, 0, 0, 0);
        } else {
            // Next Sunday at midnight
            nextReset = new Date(now);
            const daysUntilSunday = (7 - now.getDay()) % 7 || 7;
            nextReset.setDate(now.getDate() + daysUntilSunday);
            nextReset.setHours(0, 0, 0, 0);
        }

        const timeDiff = nextReset - now;
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        
        return `${hours}h ${minutes}m`;
    };

    // Update timers every minute
    useEffect(() => {
        const updateTimers = () => {
            setTimeUntilReset({
                daily: calculateTimeUntilReset('daily'),
                weekly: calculateTimeUntilReset('weekly')
            });
        };

        updateTimers();
        const interval = setInterval(updateTimers, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    // Check and reset challenges
    useEffect(() => {
        const checkChallengeReset = () => {
            const lastDailyReset = localStorage.getItem('lastDailyReset');
            const lastWeeklyReset = localStorage.getItem('lastWeeklyReset');
            const now = new Date();
            
            // Check daily reset (midnight)
            const today = new Date(now);
            today.setHours(0, 0, 0, 0);
            
            if (!lastDailyReset || new Date(lastDailyReset) < today) {
                // Reset daily challenges
                setChallenges(prev => ({
                    ...prev,
                    login: { ...prev.login, completed: false, progress: 0 },
                    cipher1: { ...prev.cipher1, completed: false, progress: 0 }
                }));
                localStorage.setItem('lastDailyReset', now.toISOString());
            }
            
            // Check weekly reset (Sunday midnight)
            const nextSunday = new Date(now);
            nextSunday.setDate(now.getDate() - now.getDay());
            nextSunday.setHours(0, 0, 0, 0);
            
            if (!lastWeeklyReset || new Date(lastWeeklyReset) < nextSunday) {
                // Reset weekly challenges
                setChallenges(prev => ({
                    ...prev,
                    cipher3: { ...prev.cipher3, completed: false, progress: 0 },
                    buyCards: { ...prev.buyCards, completed: false, progress: 0 }
                }));
                localStorage.setItem('lastWeeklyReset', now.toISOString());
            } else {
                // Load saved challenges
                const savedChallenges = localStorage.getItem('weeklyChallenges');
                if (savedChallenges) {
                    const parsed = JSON.parse(savedChallenges);
                    setChallenges(prev => ({
                        login: { ...prev.login, ...parsed.login },
                        cipher1: { ...prev.cipher1, ...parsed.cipher1 },
                        cipher3: { ...prev.cipher3, ...parsed.cipher3 },
                        buyCards: { ...prev.buyCards, ...parsed.buyCards }
                    }));
                }
            }
        };

        checkChallengeReset();
        
        // Complete login challenge automatically
        setTimeout(() => {
            setChallenges(prev => ({
                ...prev,
                login: { ...prev.login, completed: true, progress: 1 }
            }));
        }, 100);
    }, []);

    // Save challenges to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('weeklyChallenges', JSON.stringify(challenges));
    }, [challenges]);

    useEffect(() => {
        const apiURL = process.env.REACT_APP_VALORANT_API_URL;
        fetch(`${apiURL}/playercards`)
            .then(res => res.json())
            .then(data => {
                const selectedCards = data.data.slice(0, 15);
                setCards(selectedCards);
                
                // Initialize prices for ALL selected cards
                const initialPrices = {};
                selectedCards.forEach(card => {
                    // Generate random price between 500-3000 (whole numbers like Valorant)
                    const randomPrice = Math.floor(Math.random() * 2500) + 500;
                    initialPrices[card.uuid] = randomPrice.toLocaleString();
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
            return;
        }
        setOwnedCards([...ownedCards, cardID]);
        
        // Update buy cards challenge
        setChallenges(prev => {
            const newProgress = prev.buyCards.progress + 1;
            return {
                ...prev,
                buyCards: {
                    ...prev.buyCards,
                    progress: newProgress,
                    completed: newProgress >= prev.buyCards.goal
                }
            };
        });
    };

    const handleWishlist = (cardID) => {
        if (wishlistCards.includes(cardID)) {
            // Remove from wishlist
            setWishlistCards(wishlistCards.filter(id => id !== cardID));
        } else {
            // Add to wishlist
            setWishlistCards([...wishlistCards, cardID]);
        }
    };

    // Display active tab
    const displayedCards = activeTab === 'today'
        ? cards
        : activeTab === 'collection'
        ? cards.filter(card => ownedCards.includes(card.uuid))
        : cards.filter(card => wishlistCards.includes(card.uuid));

    const username = localStorage.getItem("username") || "Guest";

    return (
        <section className="gallery-page">
            <div className="gallery-layout">
                {/* Left Sidebar */}
                <div className="gallery-sidebar">
                    <div className="profile-section">
                        <div className="profile-picture">
                            <img
                                src="https://via.placeholder.com/150"
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
                            <div className="stat-icon">💎</div>
                            <div className="stat-info">
                                <span className="stat-label">User Points</span>
                                <span className="stat-value">2,000</span>
                            </div>
                        </div>
                    </div>

                    {/* Weekly Challenges */}
                    <div className="challenges-section">
                        <div className="challenges-header">
                            <h3>Weekly Challenges</h3>
                        </div>
                        
                        <div className="challenges-list">
                            <div className={`challenge-item ${challenges.login.completed ? 'completed' : ''}`}>
                                <div className="challenge-info">
                                    <div className="challenge-top">
                                        <span className="challenge-name">Daily Login</span>
                                        <span className="challenge-timer">Resets in {timeUntilReset.daily}</span>
                                    </div>
                                    <div className="challenge-progress">
                                        <span className="challenge-status">
                                            {challenges.login.completed ? '✓ Completed' : `${challenges.login.progress}/${challenges.login.goal}`}
                                        </span>
                                        <span className="challenge-reward">+{challenges.login.reward} pts</span>
                                    </div>
                                </div>
                            </div>

                            <div className={`challenge-item ${challenges.cipher1.completed ? 'completed' : ''}`}>
                                <div className="challenge-info">
                                    <div className="challenge-top">
                                        <span className="challenge-name">Solve 1 Cipher</span>
                                        <span className="challenge-timer">Resets in {timeUntilReset.daily}</span>
                                    </div>
                                    <div className="challenge-progress">
                                        <span className="challenge-status">
                                            {challenges.cipher1.completed ? '✓ Completed' : `${challenges.cipher1.progress}/${challenges.cipher1.goal}`}
                                        </span>
                                        <span className="challenge-reward">+{challenges.cipher1.reward} pts</span>
                                    </div>
                                </div>
                            </div>

                            <div className={`challenge-item ${challenges.cipher3.completed ? 'completed' : ''}`}>
                                <div className="challenge-info">
                                    <div className="challenge-top">
                                        <span className="challenge-name">Solve 3 Ciphers</span>
                                        <span className="challenge-timer">Resets in {timeUntilReset.weekly}</span>
                                    </div>
                                    <div className="challenge-progress">
                                        <span className="challenge-status">
                                            {challenges.cipher3.completed ? '✓ Completed' : `${challenges.cipher3.progress}/${challenges.cipher3.goal}`}
                                        </span>
                                        <span className="challenge-reward">+{challenges.cipher3.reward} pts</span>
                                    </div>
                                </div>
                            </div>

                            <div className={`challenge-item ${challenges.buyCards.completed ? 'completed' : ''}`}>
                                <div className="challenge-info">
                                    <div className="challenge-top">
                                        <span className="challenge-name">Buy 5 Cards</span>
                                        <span className="challenge-timer">Resets in {timeUntilReset.weekly}</span>
                                    </div>
                                    <div className="challenge-progress">
                                        <span className="challenge-status">
                                            {challenges.buyCards.completed ? '✓ Completed' : `${challenges.buyCards.progress}/${challenges.buyCards.goal}`}
                                        </span>
                                        <span className="challenge-reward">+{challenges.buyCards.reward} pts</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="gallery-content">
                    <div className={`gallery-container ${fadeIn ? 'fade-in' : ''}`}>
                        <div className="gallery-nav">
                            <div className="nav-buttons">
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
                                <button
                                    className={`nav-button ${activeTab === 'wishlist' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('wishlist')}>
                                    Wishlist
                                </button>
                            </div>
                            <div className="picks-reset-timer">
                                <span className="reset-label">Today's Pick Resets In {timeUntilReset.daily}</span>
                            </div>
                        </div>

                        {displayedCards.length === 0 && (activeTab === 'collection' || activeTab === 'wishlist') ? (
                            <div style={{ textAlign: 'center', padding: '4rem' }}>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem' }}>
                                    {activeTab === 'collection' 
                                        ? 'No cards in your collection yet!' 
                                        : 'No liked cards yet!'}
                                </p>
                            </div>
                        ) : (
                            <div className="gallery-grid">
                                {displayedCards.map((card, index) => {
                                    const isOwned = ownedCards.includes(card.uuid);
                                    const isWishlisted = wishlistCards.includes(card.uuid);

                                    return (
                                        <div key={card.uuid} className="card-container">
                                            <div className="card-slide" style={{ animationDelay: `${index * 0.1}s` }}>
                                                <img 
                                                    src={card.largeArt || card.displayIcon || card.smallArt} 
                                                    alt={card.displayName}
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
                                                    }}
                                                />
                                                
                                                {/* Price Badge - Top Right - ALWAYS VISIBLE */}
                                                <div className="card-price-badge">
                                                    <span className="price-icon">◆</span>
                                                    <span className="price-value">{prices[card.uuid]}</span>
                                                </div>

                                                {/* Card Overlay - Shows on Hover */}
                                                <div className="card-overlay">
                                                    <h4>{card.displayName}</h4>
                                                </div>
                                            </div>

                                            {/* Buttons Below Card */}
                                            <div className="card-actions">
                                                <button
                                                    className={`buy-button ${isOwned ? 'owned' : ''}`}
                                                    onClick={() => handleBuyCard(card.uuid)}
                                                    disabled={isOwned}
                                                >
                                                    {isOwned ? '✓ Owned' : 'Buy Card'}
                                                </button>
                                                <button
                                                    className={`wishlist-heart ${isWishlisted ? 'wishlisted' : ''}`}
                                                    onClick={() => handleWishlist(card.uuid)}
                                                    aria-label={isWishlisted ? 'Remove from liked' : 'Add to liked'}
                                                >
                                                    {isWishlisted ? '♥' : '♡'}
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