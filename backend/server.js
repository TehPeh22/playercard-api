const express = require('express')
const cors = require('cors')
const { Sequelize, DataTypes } = require('sequelize')
require('dotenv').config()

// Communication between front and back
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// PostgreSQL Database Setup with SSL for Render
const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false,
})

// Define Post Model
const Post = sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: true
})

// Sync Database
sequelize.sync().then(() => {
    console.log('PostgreSQL Database connected and synced ✅')
}).catch((err) => {
    console.error('Error connecting database:', err)
})

// Testing
app.get('/', (req, res) => {
    res.send({ message: 'App is Running' })
})

app.post("/create-post", async (req, res) => {
    const { title, content } = req.body;
    try {
        const newPost = await Post.create({ title, content });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
});

app.get("/get-posts", async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})