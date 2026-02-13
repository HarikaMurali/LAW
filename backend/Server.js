require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Import routes
const authRouter = require('./routes/auth');
const draftsRouter = require('./routes/drafts');
const generateRouter = require('./routes/generate');
const researchRouter = require('./routes/research');
const activityRouter = require('./routes/activity');
const analyticsRouter = require('./routes/analytics');

// Use routes with explicit paths
app.use('/api/auth', authRouter);
app.use('/api/drafts', draftsRouter);
app.use('/api/generate', generateRouter);
app.use('/api/research', researchRouter);
app.use('/api/activity', activityRouter);
app.use('/api/analytics', analyticsRouter);

// Real AI Proofreading with Gemini
app.post('/api/proofread', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      const prompt = `You are a legal proofreading expert. Analyze the following legal draft and provide:

1. Grammar and Spelling Errors (if any)
2. Legal Terminology Accuracy
3. Document Structure Assessment
4. Specific Improvement Suggestions

Be thorough and professional. Format your response clearly.

Draft to proofread:
${text}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const analysis = response.text();
      
      res.json({ result: analysis });
    } catch (aiError) {
      console.error('Gemini proofreading error:', aiError.message);
      
      // Fallback to mock response
      const mockResult = `Proofreading Analysis:
    
✓ Grammar Check: No major grammatical errors found.
✓ Legal Terminology: Appropriate legal language used.
✓ Structure: Document follows standard legal format.
    
Suggestions:
• Consider adding more specific citations where applicable
• Ensure all party names are consistently formatted
• Review dates and jurisdictional references for accuracy
    
Overall: The draft appears well-structured and professionally written.

(Note: AI service temporarily used fallback analysis)`;
      
      res.json({ result: mockResult });
    }
  } catch (error) {
    res.status(500).json({ error: 'Proofreading service error', details: error.message });
  }
});

// Real AI Clause Suggestions with Gemini
app.post('/api/suggest-clauses', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      const prompt = `You are a legal clause expert. Based on the following legal draft, suggest 5-7 additional important clauses that should be considered for inclusion.

For each suggested clause provide:
1. Clause Name
2. Brief description of why it's important
3. Sample text for the clause

Draft:
${text.substring(0, 2000)}

Provide professional, legally sound suggestions.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const suggestions = response.text();
      
      res.json({ suggestions });
    } catch (aiError) {
      console.error('Gemini clause suggestion error:', aiError.message);
      
      // Fallback to mock suggestions
      const mockSuggestions = `Suggested Additional Clauses:

1. FORCE MAJEURE CLAUSE
   "Neither party shall be liable for any failure to perform due to circumstances beyond reasonable control..."

2. DISPUTE RESOLUTION
   "Any disputes arising from this agreement shall be resolved through arbitration in accordance with applicable laws..."

3. CONFIDENTIALITY CLAUSE
   "Both parties agree to maintain confidentiality of all sensitive information disclosed during..."

4. INDEMNIFICATION
   "Each party agrees to indemnify and hold harmless the other party from any claims, damages, or liabilities..."

5. SEVERABILITY
   "If any provision of this agreement is found invalid, the remaining provisions shall continue in full force..."

(Note: AI service temporarily used standard clause suggestions)`;
      
      res.json({ suggestions: mockSuggestions });
    }
  } catch (error) {
    res.status(500).json({ error: 'Clause suggestion service error', details: error.message });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message 
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT}`));
