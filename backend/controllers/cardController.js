const db = require('../config/database')

exports.getAllcards = (req, res) => {
    const query = 'SELECT * FROM cards'

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching cards:', err)
            return res.status(500).json({ error: 'Server error! Failed to fetch cards'})
        }
        res.json(results)
    })
}

exports.buyCard =  (req, res) => {
    const { userId, cardId } = req.body
    if (!userId || !cardId) {
        return res.status(400).json
    }
}
