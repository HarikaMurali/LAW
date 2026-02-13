# LexiCraft - Lawyers' Draft Maker 📋⚖️

> An AI-powered legal document generation platform that helps lawyers, law students, and legal assistants create professional legal drafts efficiently with comprehensive research tools and template management.

![LexiCraft](https://img.shields.io/badge/LexiCraft-v1.0.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![React](https://img.shields.io/badge/React-v19+-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5-orange)

## 🎯 Overview

LexiCraft is a comprehensive web application that streamlines the legal document creation process. Users can select case types, provide key details, generate professional legal drafts using AI technology, conduct legal research, manage templates, and securely store documents.

### Key Features
- 🤖 **AI-Powered Drafting** - Generate intelligent legal drafts with AI assistance, proofreading, and clause suggestions
- 🔍 **Research Tools** - Access case law database, statute references, and legal dictionary
- 📚 **Template Library** - Pre-built templates for various legal document types with customization
- 💾 **Secure Storage** - End-to-end encrypted document storage with version control
- 📊 **Analytics Dashboard** - Track draft generation, usage statistics, and productivity metrics
- 📝 **Draft Management** - View, edit, delete, and organize legal documents with search and filters
- 📜 **History Tracking** - Complete activity log with filtering by action type (Generated, Edited, Deleted)
- 👤 **User Management** - Secure JWT authentication with bcrypt password hashing
- 🎨 **Modern UI** - Clean, professional interface with Galaxy animation and responsive design
- 🔒 **Security** - 7-day token expiration, protected routes, and comprehensive security documentation

## ⚡ Quick Start (5 Minutes)

```bash
# 1. Clone & Install
git clone <repo-url> && cd Law
cd backend && npm install && cd ../frontend && npm install

# 2. Setup .env file in backend/
# Add: MONGO_URI, JWT_SECRET, OPENAI_API_KEY, PORT=5000

# 3. Run (in 2 terminals)
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm start
```

Visit **http://localhost:3000** and start drafting! 🚀

---

## 🛠️ Tech Stack

### Frontend
- **React.js v19** - User interface framework
- **React Router v7** - Navigation and routing with 10 pages
- **Tailwind CSS v3** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **jsPDF** - PDF generation for document export
- **html2canvas** - Screenshot/canvas rendering
- **docx** - Word document generation
- **file-saver** - Client-side file saving
- **OGL** - WebGL library for Galaxy animation

### Backend
- **Node.js v18+** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Token authentication (7-day expiration)
- **bcryptjs** - Password hashing (10 salt rounds)
- **OpenAI API v5** - AI-powered text generation
- **CORS** - Cross-origin resource sharing

## 🏗️ Project Structure

```
LAW_DRAFT-EDITOR/
├── backend/                     # Node.js Express server
│   ├── middleware/             # Authentication middleware
│   │   └── auth.js            # JWT verification
│   ├── models/                # MongoDB data models
│   │   ├── User.js           # User schema
│   │   └── Draft.js          # Draft schema
│   ├── routes/                # API route handlers
│   │   ├── auth.js           # Authentication routes
│   │   ├── drafts.js         # Draft CRUD operations
│   │   └── generate.js       # AI generation routes
│   ├── prompts/               # AI prompt templates
│   │   ├── civil_template.txt
│   │   ├── criminal_template.txt
│   │   └── contract_template.txt
│   ├── .env                   # Environment variables
│   ├── Server.js              # Main server file
│   └── package.json           # Backend dependencies
├── frontend/                  # React application
│   ├── public/               # Static assets
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Layout.js    # Main layout wrapper
│   │   │   ├── Sidebar.js   # Navigation sidebar
│   │   │   ├── Galaxy.js/css # 3D animation background
│   │   │   ├── DraftForm.js
│   │   │   ├── DraftEditor.js
│   │   │   └── DraftList.js
│   │   ├── pages/            # Page components (10 pages)
│   │   │   ├── LandingPage.js    # Home with About/Contact
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js       # Main dashboard
│   │   │   ├── DraftsPage.js      # Draft management
│   │   │   ├── HistoryPage.js     # Activity history
│   │   │   ├── TemplatesPage.js   # Template library
│   │   │   ├── ResearchPage.js    # Legal research tools
│   │   │   ├── AnalyticsPage.js   # Usage analytics
│   │   │   └── SettingsPage.js    # User settings
│   │   ├── utils/
│   │   │   └── axios.js          # API configuration
│   │   ├── App.js                # Main App with routing
│   │   ├── App.css
│   │   └── index.js
│   ├── tailwind.config.js        # Tailwind configuration
│   ├── postcss.config.js
│   └── package.json              # Frontend dependencies
├── README.md                     # Project documentation
├── SECURITY.md                   # Security documentation
└── .gitignore                    # Git ignore rules
```

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB Atlas** account (free tier available)
- **OpenAI API** key
- **Git** version control

### 1. Clone the Repository
```bash
git clone https://github.com/HarikaMurali/LAW_DRAFT-EDITOR.git
cd LAW_DRAFT-EDITOR
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file (.env)
```

**Environment Variables** (create `backend/.env` file):
```env
# Database
MONGO_URI=your_mongodb_atlas_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key

# AI Service
OPENAI_API_KEY=your_openai_api_key

# Server
PORT=5000
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

### 4. Run the Application

**Start Backend Server:**
```bash
cd backend
npm run dev
# Server will run on http://localhost:5000
```

**Start Frontend (in a new terminal):**
```bash
cd frontend
npm start
# Application will open on http://localhost:3000
```

## 🔧 Configuration

### MongoDB Setup
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Set up database access and network access
4. Get your connection string
5. Add it to your `backend/.env` file

### OpenAI API Setup
1. Create an account at [OpenAI Platform](https://platform.openai.com/)
2. Generate an API key
3. Add billing information (if needed)
4. Add the API key to your `backend/.env` file

## 🎮 Usage

### For Users
1. **Register/Login** - Create an account or sign in with secure authentication
2. **Dashboard** - Overview of your drafts, templates, and activity
3. **AI Drafting**
   - Select case type (Civil, Criminal, Contract, etc.)
   - Provide case facts and key details
   - Generate professional legal documents
   - Use AI proofreading and clause suggestions
4. **Research Tools**
   - Search case law database (2.5M+ cases)
   - Browse statute references (15K+ statutes)
   - Look up legal terms in dictionary (50K+ definitions)
5. **Template Library**
   - Browse 150+ pre-built templates
   - Filter by category (Contract, Notice, Agreement, etc.)
   - Customize and use templates
6. **Draft Management**
   - View all saved drafts with search and filters
   - Edit drafts with rich text editor
   - Delete drafts with confirmation
   - Export to PDF or Word format
7. **History** - Track all activities (Generated, Edited, Deleted) with filters
8. **Analytics** - Monitor usage statistics and productivity metrics
9. **Settings** - Manage profile, preferences, and security

### Sample Input Example:
```
Case Type: Contract Dispute
Parties: ABC Pvt Ltd (Plaintiff) vs XYZ Enterprises (Defendant)
Key Facts: ABC Pvt Ltd entered into a contract with XYZ Enterprises on 15/01/2024 
for supply of 500 office furniture units worth ₹25,00,000. Delivery was due by 
28/02/2024. XYZ failed to deliver, causing business losses of ₹5,00,000.
Jurisdiction: Karnataka, India
Relief Sought: Specific performance or damages
```

## 📋 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - User registration with password hashing
- `POST /api/auth/login` - User login with JWT token generation

### Draft Routes (Protected)
- `GET /api/drafts` - Get all user's saved drafts
- `POST /api/drafts` - Create and save a new draft
- `GET /api/drafts/:id` - Get specific draft by ID
- `PUT /api/drafts/:id` - Update existing draft
- `DELETE /api/drafts/:id` - Delete draft (with ownership verification)

### Generation Routes (Protected)
- `POST /api/generate` - Generate new legal draft using AI
- `POST /api/generate/save` - Generate and automatically save draft
- `POST /api/generate/mock` - Generate mock draft (testing without API usage)

### AI Enhancement Routes (Protected)
- `POST /api/proofread` - Proofread and suggest improvements for text
- `POST /api/suggest-clauses` - Get AI-suggested legal clauses

**Note:** All routes except authentication require valid JWT token in Authorization header

## 🚀 Deployment

### Backend (Heroku/Railway/DigitalOcean)
1. Set environment variables on your platform
2. Deploy the backend folder
3. Ensure MongoDB Atlas is accessible

### Frontend (Netlify/Vercel)
1. Build the React app: `npm run build`
2. Deploy the `build` folder
3. Update API base URL for production

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

## 🐛 Known Issues & Limitations

- OpenAI API has rate limits and costs (monitor usage)
- Generated drafts require legal review by qualified professionals
- Currently supports English language only
- Mock generator available for testing when API quota is exceeded
- Research Tools use placeholder data (requires integration with legal databases)
- Template Library uses sample templates (expand based on requirements)
- Export functionality depends on client-side libraries (jsPDF, docx)

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **Harika Murali** - *Lead Developer* - [@HarikaMurali](https://github.com/HarikaMurali)

## 🙏 Acknowledgments

- **OpenAI** for providing the GPT API
- **MongoDB** for the database platform
- **React & Node.js** communities

## 📞 Support

If you encounter any issues or need assistance:
- 🐛 **Issues**: [GitHub Issues](https://github.com/HarikaMurali/LAW_DRAFT-EDITOR/issues)
- 📧 **Email**: support@lexicraft.com or tech@lexicraft.com
- 📞 **Phone**: +91 123 456 7890
- 🏢 **Address**: 123 Legal Avenue, MG Road, Bangalore, Karnataka 560001, India

## 🔒 Security

For security documentation and best practices, see [SECURITY.md](./SECURITY.md)

---

**⚖️ Legal Disclaimer**: This application generates draft legal documents using AI technology. All generated content should be reviewed and verified by qualified legal professionals before use in any legal proceedings. The developers and contributors are not responsible for the accuracy, completeness, or legal validity of generated documents. Use at your own discretion.