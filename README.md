# AI Model Response Comparison Tool

A sophisticated web application for comparing responses from multiple AI models (OpenAI, Google's Gemini, and Anthropic's Claude) through an intelligent and minimalist user interface.

## Features

- Real-time response comparison between multiple AI models
- Dynamic, responsive UI with split-view layout
- Theme customization options
- API key configuration management
- File attachment support
- Cross-device compatibility

## Tech Stack

- **Frontend**: React.js with TypeScript, Vite, Framer Motion
- **Backend**: Node.js with Express
- **AI Integrations**: OpenAI GPT, Google Gemini, Anthropic Claude
- **Styling**: Tailwind CSS with shadcn/ui components

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- API keys for OpenAI, Google Gemini, and Anthropic Claude

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd [repository-name]
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your API keys:
```env
OPENAI_API_KEY=your_openai_key
GEMINI_API_KEY=your_gemini_key
ANTHROPIC_API_KEY=your_anthropic_key
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
