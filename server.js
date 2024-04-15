// require('dotenv').config();
// const cors = require('cors');
// const express = require('express');
// const mongoose = require('mongoose');
// const userRoutes = require('./routes/userRoutes');

// const app = express();
// const PORT = process.env.PORT || 4000;

// app.use(cors());


// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('Failed to connect to MongoDB', err));

// app.use(express.json());
// app.use('/api/users', userRoutes);

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// CORS Configuration
app.use(cors());
const MONGODB_URI="mongodb+srv://weather2024:weather2024@weather2024.jo5iubu.mongodb.net/?retryWrites=true&w=majority&appName=weather2024"

// MongoDB Connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Parse JSON request body
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

