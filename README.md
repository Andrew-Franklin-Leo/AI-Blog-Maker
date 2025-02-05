# Li Xia's Blog Platform

A modern blog platform built with React, Vite, Supabase, and OpenRouter AI integration.

[![Release Workflow](https://github.com/Andrew-Franklin-Leo/AI-Blog-Maker/actions/workflows/release.yml/badge.svg?branch=develop)](https://github.com/Andrew-Franklin-Leo/AI-Blog-Maker/actions/workflows/release.yml)

## Features

- 📝 AI-powered blog post generation
- 🎨 Markdown support with live preview
- 🌓 Dark mode support
- 🚀 Fast and responsive design
- 🔒 Secure data handling
- 📱 Mobile-friendly interface

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- A Supabase account and project
- An OpenRouter API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Andrew-Franklin-Leo/AI-Blog-Maker.git
cd AI-Blog-Maker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example env file
cp .env.example .env

# Edit the .env file with your credentials
nano .env
```

Required environment variables:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `VITE_OPENROUTER_API_KEY`: Your OpenRouter API key

4. Initialize the database:
```bash
npm run setup-database
```

## Development

Start the development server:
```bash
npm run dev
```

Run tests:
```bash
npm test
```

Check types:
```bash
npm run typecheck
```

Lint code:
```bash
npm run lint
```

Format code:
```bash
npm run format
```

## Building for Production

1. Build the project:
```bash
npm run build
```

2. Preview the production build:
```bash
npm run preview
```

## Security

This project follows security best practices:
- Environment variables for sensitive data
- Input sanitization
- API rate limiting
- Secure authentication flows
- Regular dependency updates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

Please ensure your PR:
- Passes all tests
- Includes relevant documentation
- Follows the existing code style
- Includes appropriate tests

## License

This project is MIT licensed. See the [LICENSE](LICENSE) file for details.

## Support

For support, please:
1. Check the [documentation](docs/)
2. Search [existing issues](issues/)
3. Open a new issue if needed

## Acknowledgments

- [Supabase](https://supabase.com) for backend services
- [OpenRouter](https://openrouter.ai) for AI capabilities
- [Vite](https://vitejs.dev) for the build system
- [React](https://reactjs.org) for the UI framework
- [Tailwind CSS](https://tailwindcss.com) for styling
