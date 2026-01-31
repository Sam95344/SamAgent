# SamAgent - Finance AI Assistant

A modern financial management application powered by AI that helps users track transactions, manage budgets, set financial goals, and get personalized financial advice using Google Gemini AI.

## Features

- **Smart Transaction Tracking** - Easily log and categorize your financial transactions
- **AI-Powered Chat Assistant** - Get personalized financial advice from Gemini AI
- **Voice Assistant** - Interact with the app using voice commands
- **Budget Management** - Set and monitor your monthly budgets
- **Financial Goals** - Create and track your financial objectives
- **Dashboard** - Beautiful visual overview of your financial health
- **Secure Authentication** - JWT-based user authentication
- **Real-time Notifications** - Get alerts for important financial events

## Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Recharts** - Data visualization

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Gemini AI API** - AI capabilities

## Installation

### Prerequisites
- Node.js (v22 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available)
- Google Gemini API key (free tier available)

### Local Setup

1. **Clone the repository**
```bash
git clone https://github.com/Sam95344/SamAgent.git
cd SamAgent
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd server
npm install
cd ..
```

4. **Create .env file** in the root directory
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_API_URL=http://localhost:5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

5. **Start backend server**
```bash
cd server
node index.js
# Server runs on http://localhost:5000
```

6. **In another terminal, start frontend**
```bash
npm run dev
# Frontend runs on http://localhost:5173
```

## Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
npm start        # Production server (uses serve)
```

### Backend
```bash
cd server
node index.js    # Start the server
```

## Project Structure

```
SamAgent/
├── src/
│   ├── components/          # React components
│   ├── pages/              # Page components
│   ├── context/            # React Context
│   ├── lib/                # Utility functions and API calls
│   ├── assets/             # Static assets
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   └── index.js
├── public/                 # Public assets
├── package.json
├── vite.config.js
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

## Environment Variables

Create a `.env` file in the root directory:

```env
# Frontend
VITE_GEMINI_API_KEY=your_google_gemini_api_key
VITE_API_URL=https://samagent.onrender.com  # For production

# Backend
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_secret_key_here
PORT=5000
```

## Deployment

### Deploy on Render

1. **Backend Deployment**
   - Connect GitHub repo to Render
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && node index.js`
   - Add environment variables

2. **Frontend Deployment**
   - Connect GitHub repo to Render
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Publish Directory: `dist`
   - Add environment variables

### Deploy on Vercel (Frontend)
- Push to GitHub
- Connect repo on Vercel
- Automatic deployment on push
- Add environment variables in settings

## MongoDB Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Add to `.env` as `MONGODB_URI`

## Gemini AI Setup

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create API key
3. Add to `.env` as `VITE_GEMINI_API_KEY`

## Features in Detail

### Dashboard
- View total balance, expenses, and income
- See recent transactions
- Visual charts and statistics

### Transaction Management
- Add, edit, delete transactions
- Categorize transactions
- Filter by date and category
- Export transaction history

### AI Chat Assistant
- Ask financial questions
- Get personalized advice
- Budget optimization suggestions
- Investment insights

### Voice Assistant
- Voice-to-text transaction entry
- Voice commands for navigation
- Text-to-speech responses

### Budget & Goals
- Set monthly budgets per category
- Track spending against budgets
- Create financial goals
- Monitor goal progress

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For support, email your-email@example.com or open an issue on GitHub.

## Live Demo

- **Frontend:** https://samAgent-frontend.onrender.com
- **Backend API:** https://samagent.onrender.com

## Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics and insights
- [ ] Multi-currency support
- [ ] Bill reminders
- [ ] Investment tracking
- [ ] Tax calculation helper
- [ ] Family budget sharing

## Acknowledgments

- Google Gemini AI for AI capabilities
- MongoDB for database services
- Render for hosting
- React and Vite communities
