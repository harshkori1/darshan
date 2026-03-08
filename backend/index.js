const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'darshanEase_secret_key_2024';

// Middleware
app.use(cors());
app.use(express.json());

// Users data (in-memory)
const users = [
  {
    id: 1,
    email: 'admin@darshan.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User'
  },
  {
    id: 2,
    email: 'organizer@darshan.com',
    password: 'organizer123',
    role: 'organizer',
    name: 'Organizer User'
  },
  {
    id: 3,
    email: 'user@darshan.com',
    password: 'user123',
    role: 'user',
    name: 'Regular User'
  }
];

// Temples data
const temples = [
  {
    id: 1,
    name: "Kashi Vishwanath Temple",
    location: "Varanasi, Uttar Pradesh",
    image: "http://localhost:5173/src/assets/vaanashi.jpg",
    rating: 4.9,
    description: "One of the most famous Hindu temples dedicated to Lord Shiva.",
    openTime: "04:00 AM",
    closeTime: "11:00 PM",
    price: 50
  },
  {
    id: 2,
    name: "Tirumala Venkateswara Temple",
    location: "Tirupati, Andhra Pradesh",
    image: "http://localhost:5173/src/assets/gettyimages-2250108138-612x612.jpg",
    rating: 4.9,
    description: "Also known as Tirupati Balaji.",
    openTime: "06:00 AM",
    closeTime: "09:00 PM",
    price: 100
  },
  {
    id: 3,
    name: "Golden Temple",
    location: "Amritsar, Punjab",
    image: "http://localhost:5173/src/assets/golden-temple.jpg",
    rating: 4.9,
    description: "The holiest Gurdwara in Sikhism.",
    openTime: "04:00 AM",
    closeTime: "11:00 PM",
    price: 0
  }
];

// Bookings data
let bookings = [
  {
    id: 1,
    userId: 3,
    templeId: 1,
    date: '2024-12-25',
    time: '06:00 AM',
    status: 'confirmed'
  }
];

// Routes

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // For demo, accept specific passwords
    const validPasswords = {
      'admin@darshan.com': 'admin123',
      'organizer@darshan.com': 'organizer123',
      'user@darshan.com': 'user123'
    };

    const isValidPassword = validPasswords[email] === password || await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      role: user.role,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Register
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      role: 'user',
      name: name || 'New User'
    };

    users.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Registration successful',
      token,
      role: newUser.role,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all temples
app.get('/api/temples', (req, res) => {
  res.json(temples);
});

// Get temple by ID
app.get('/api/temples/:id', (req, res) => {
  const temple = temples.find(t => t.id === parseInt(req.params.id));
  if (!temple) {
    return res.status(404).json({ message: 'Temple not found' });
  }
  res.json(temple);
});

// Get user bookings
app.get('/api/bookings', authenticateToken, (req, res) => {
  const userBookings = bookings.filter(b => b.userId === req.user.id);
  const bookingsWithTemples = userBookings.map(booking => ({
    ...booking,
    temple: temples.find(t => t.id === booking.templeId)
  }));
  res.json(bookingsWithTemples);
});

// Create booking
app.post('/api/bookings', authenticateToken, (req, res) => {
  const { templeId, date, time } = req.body;
  
  const newBooking = {
    id: bookings.length + 1,
    userId: req.user.id,
    templeId,
    date,
    time,
    status: 'pending'
  };

  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

// Cancel booking
app.delete('/api/bookings/:id', authenticateToken, (req, res) => {
  const bookingIndex = bookings.findIndex(b => b.id === parseInt(req.params.id) && b.userId === req.user.id);
  
  if (bookingIndex === -1) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  bookings.splice(bookingIndex, 1);
  res.json({ message: 'Booking cancelled successfully' });
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('\n=== Demo Accounts ===');
  console.log('Admin: admin@darshan.com / admin123');
  console.log('Organizer: organizer@darshan.com / organizer123');
  console.log('User: user@darshan.com / user123');
});
