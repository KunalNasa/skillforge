# SkillForge 🚀

An AI-powered learning roadmap generator that creates personalized learning paths based on your goals and expertise level.

🔗 **Live Demo**: [https://skillforge.kunalnasa.xyz](https://skillforge.kunalnasa.xyz)

![SkillForge Demo](public/demo.gif)

## Features ✨

- **AI-Powered Roadmaps**: Generate custom learning paths using Google's Gemini AI
- **Interactive Progress Tracking**: Visual progress indicators and completion tracking
- **Resource Integration**: Curated learning resources for each topic
- **Timeline View**: Structured learning with clear prerequisites
- **Task Management**: Mark topics as complete and track progress
- **OAuth Integration**: Secure authentication with Google

## Tech Stack 💻

- **Frontend**: Next.js 15, TypeScript, TailwindCSS, Shadcn UI
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **AI**: Google Gemini AI
- **Deployment**: Vercel

## Getting Started 🚀

### Prerequisites

- Node.js 16.x or later
- MongoDB instance
- Google Cloud Console account for Gemini API
- Google OAuth credentials

### Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/skillforge.git
cd skillforge
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure 📁

```
skillforge/
├── src/
│   ├── app/              # Next.js 13 app router
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── models/          # Mongoose models
│   ├── types/           # TypeScript types
│   └── zodSchemas/      # Zod validation schemas
├── public/              # Static assets
└── tests/              # Test files
```

## API Routes 🛠

- `POST /api/generate-roadmap`: Generate new roadmap using Gemini AI
- `GET /api/get-roadmap/[id]`: Fetch specific roadmap
- `PATCH /api/update-roadmap/[roadmapId]/[taskId]`: Update task completion
- `GET /api/get-progress/[roadmapId]`: Get roadmap progress
- `DELETE /api/delete-roadmap/[id]`: Delete roadmap


## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License.

```text
MIT License

Copyright (c) 2024 SkillForge

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Contact 📧

- Project Link: [https://github.com/KunalNasa/skillforge](https://github.com/KunalNasa/skillforge)
- Live Demo: [https://skillforge.kunalnasa.xyz](https://skillforge.vercel.app)

## Acknowledgments 🙏

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Google Gemini AI](https://deepmind.google/technologies/gemini/)
- [Shadcn UI](https://ui.shadcn.com/)
