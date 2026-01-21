# Vue.js Plugins Collection

A modern, responsive web application for discovering and exploring Vue.js plugins. Built with Nuxt 3, TypeScript, Tailwind CSS, and Reka UI components.

## Features

- 🔍 **Advanced Search & Filtering** - Find plugins by name, description, category, and tags
- 📱 **Responsive Design** - Mobile-first design that works on all devices
- 🎨 **Modern UI** - Clean, minimalist interface with Vue.js branding using Reka UI
- ⚡ **Fast Performance** - Server-side rendering and static generation with Nuxt 3
- 🔗 **GitHub Integration** - Real-time stats from GitHub API
- 📊 **Plugin Analytics** - Stars, downloads, forks, and issue tracking
- 🏷️ **Categorization** - Organized by plugin categories and types
- 📄 **Detailed Plugin Pages** - Comprehensive information with README rendering
- 🌙 **Dark Mode Support** - System preference aware color mode
- � **Markdown Rendering** - Rich documentation display with syntax highlighting
- 🎯 **SEO Optimized** - Pre-rendered routes for better search engine visibility

## Vue Plugin Template

Want to create your own Vue.js plugin? Check out our [Vue Plugin Template](https://github.com/monterail/vue-plugin-template) - a modern starter template that helps you kickstart Vue plugin development with best practices, TypeScript support, and comprehensive tooling.

The template includes:
- 🏗️ Modern build setup with Vite
- 📦 TypeScript support out of the box
- ✅ Testing configuration with Vitest
- 📚 Documentation setup
- 🚀 CI/CD workflows
- 📝 Comprehensive examples

## Getting Started

### Prerequisites

- **Node.js**: 18+ (recommended: 20.x LTS)
- **Package Manager**: pnpm (recommended) or npm/yarn
- **Git**: For cloning and version control

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd vue-plugins
```

2. **Install dependencies:**
```bash
# Using pnpm (recommended)
pnpm install
```

3. **Set up environment variables (optional):**
```bash
cp .env.example .env
```

Edit the `.env` file and add your GitHub Personal Access Token for enhanced API limits:
```bash
# GitHub API Token (optional, for higher rate limits)
GITHUB_TOKEN=your_github_personal_access_token_here
```

> **Note**: Without a GitHub token, you're limited to 60 requests per hour. With a token, you get 5,000 requests per hour.

4. **Start the development server:**
```bash
pnpm dev
```

5. **Open your browser:**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment

### Production Build

```bash
# Build for production
pnpm build

# Preview production build locally
pnpm preview
```

### Static Site Generation

```bash
# Generate static site
pnpm generate
```

The application is configured to pre-render all plugin detail pages for optimal performance and SEO.

### Environment Variables

```bash
# .env file
GITHUB_TOKEN=your_github_personal_access_token_here
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and commit: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

### Adding New Plugins

To add new plugins to the collection:

1. Edit `public/plugins.json`
2. Add your plugin following the `VuePlugin` interface structure
3. Ensure all required fields are filled
4. Test the plugin detail page works correctly
5. Submit a pull request

### Creating Your Own Plugin

Interested in creating a new Vue.js plugin? Use our [Vue Plugin Template](https://github.com/monterail/vue-plugin-template) to get started with a solid foundation and best practices.

## License

This project is licensed under the MIT License - see the LICENSE file for details.