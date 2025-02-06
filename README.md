# Li Xia's Blog

A blog application built with React, TypeScript, and Tailwind CSS, featuring AI-powered blog post generation using OpenRouter.

## Features

- 📝 Create and publish blog posts with Markdown support
- 🤖 AI-powered blog post generation
- 🎨 Clean and responsive design
- ⚡ Fast and modern tech stack
- 🔒 Type-safe development with TypeScript
- 🗄️ Data persistence with Supabase

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS for styling
- OpenRouter for AI integration
- Supabase for database and authentication
- Marked for Markdown rendering

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- OpenRouter API key

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/li-xia-blog.git
cd li-xia-blog
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment variables file and fill in your credentials:
```bash
cp .env.example .env
```

4. Set up your Supabase database:
   - Create a new project in Supabase
   - Run the SQL commands from `setup.sql` in the Supabase SQL editor
   - Copy your project URL and anon key to the `.env` file

5. Get your OpenRouter API key:
   - Sign up at [OpenRouter](https://openrouter.ai)
   - Create an API key
   - Add the API key to your `.env` file

6. Start the development server:
```bash
npm run dev
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage report

## Project Structure

```
src/
  ├── components/     # React components
  ├── context/       # React context providers
  ├── lib/           # Utility libraries
  ├── pages/         # Page components
  ├── types/         # TypeScript type definitions
  ├── utils/         # Helper functions
  ├── App.tsx        # Main app component
  └── main.tsx       # App entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

MIT License - feel free to use this code for your own projects.

## Acknowledgments

- [OpenRouter](https://openrouter.ai) for AI capabilities
- [Supabase](https://supabase.com) for backend infrastructure
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Marked](https://marked.js.org) for Markdown rendering
