# MetaThief

<p align="center">
  <strong>A powerful website metadata extraction tool</strong>
</p>

<p align="center">
  Extract meta tags, favicons, Open Graph, Twitter Cards, and more from any web page
</p>

---

## Features

- **Comprehensive Metadata Extraction**
  - Basic meta tags (title, description, keywords, author, etc.)
  - Open Graph tags (og:title, og:description, og:image, etc.)
  - Twitter Card tags (twitter:card, twitter:title, etc.)
  - HTML attributes (charset, viewport, language)
  
- **Icon Discovery**
  - Automatic favicon detection
  - Multiple icon format support (ICO, PNG, SVG)
  - Apple Touch Icon extraction
  
- **Additional Features**
  - robots.txt content fetching
  - Canonical URL detection

- **API Features**
  - Metadata extraction endpoint

## Installation

```bash
# Clone the repository
git clone https://github.com/isixe/MetaThief.git

# Navigate to project directory
cd MetaThief

# Install dependencies
pnpm install
```

## Development

```bash
# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) - React framework for production
- **Language**: [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- **Components**: [Shadcn-ui](https://shadcn-ui.sh/) - Unstyled, accessible UI components
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful & consistent icons

## Project Structure

```
MetaThief/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── meta/          # Metadata extraction endpoint
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── icons/            # Icon components
│   ├── layout/           # Layout components (header, footer)
│   ├── meta/             # Metadata display components
│   ├── ui/               # Reusable UI components
│   └── widget/           # Widget components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── public/               # Static assets
├── styles/               # Global styles
└── types/                # TypeScript type definitions
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add some Amazing feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/isixe">isixe</a>
</p>
