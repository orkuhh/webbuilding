# Division Builds

A community-driven platform for creating, sharing, and discovering builds for Tom Clancy's The Division 2.

![Division Builds](https://img.shields.io/badge/The%20Division%202-Builds-FF6B2B)
![React](https://img.shields.io/badge/React-18.x-61DAFB)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Build Creation**: Create and customize your Division 2 builds with an intuitive builder
- **Build Sharing**: Share your builds with the community and discover builds from other players
- **Inventory Management**: Keep track of your gear, weapons, and mods
- **Build Guides**: Learn from detailed guides written by experienced players
- **Community Features**: Comment, rate, and discuss builds with other players

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/divisionbuilds.git
cd divisionbuilds
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=your_api_url
VITE_GOOGLE_SHEETS_API_KEY=your_google_sheets_api_key
VITE_SPREADSHEET_ID=your_spreadsheet_id
```

## Project Structure

```
src/
├── components/        # React components
├── context/          # React context providers
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── styles/           # Global styles and Tailwind config
├── App.jsx          # Main application component
└── main.jsx         # Application entry point
```

## Technology Stack

- **Frontend Framework**: React with Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Data Storage**: Google Sheets API
- **Routing**: React Router
- **Authentication**: (Coming Soon)

## Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a pull request.

### Development Workflow

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request

### Code Style

- We use ESLint for code linting
- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic

## Community

- [Discord Server](https://discord.gg/divisionbuilds)
- [GitHub Issues](https://github.com/yourusername/divisionbuilds/issues)
- [Twitter](https://twitter.com/divisionbuilds)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- The Division 2 community
- [Ubisoft](https://www.ubisoft.com) for creating The Division 2
- All contributors who have helped make this project better

## Disclaimer

This project is not affiliated with or endorsed by Ubisoft. The Division® is a registered trademark of Ubisoft Entertainment.

## Contact

- Email: support@divisionbuilds.com
- Twitter: [@divisionbuilds](https://twitter.com/divisionbuilds)
- GitHub: [@divisionbuilds](https://github.com/divisionbuilds)

## Support

If you find this project helpful, please consider:
- Starring the repository
- Contributing to the project
- Sharing it with other Division 2 players
- Reporting bugs or suggesting improvements
