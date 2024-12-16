# Delivery Notes Management Web Application

## Academic Assignment

This project is a web application developed as an academic assignment using Next.js 13. The application manages delivery notes (time sheets and materials) between clients and suppliers, demonstrating proficiency in modern web development techniques.

**Disclaimer**: This project uses an external API provided by Bildy. The API is not owned or developed by the project's creator.

## Project Overview

### API Documentation
API Base URL: https://bildy-rpmaya.koyeb.app/api-docs/

### Key Features
- User registration and authentication
- Client management
- Project tracking
- Delivery note creation and management

## Technologies Used

### Frontend
- Next.js 13
- React
- Tailwind CSS
- Local state management with useState

### Development Tools
- Standard Next.js routing
- Browser localStorage for token management
- Fetch API for HTTP requests

## Project Structure (Next.js 13)

```
/src
├── /app
│   ├── (routes)
│   │   ├── clients
│   │   ├── projects
│   │   └── delivery-notes
├── /components
│   ├── Header
│   ├── Footer
│   └── Navigation
└── /styles
```

## Authentication Workflow

1. User registration
2. Email validation
3. Login to receive JWT token
4. Token storage in localStorage
5. Include token in API request headers

## Development Highlights

- Responsive design using Tailwind CSS
- Comprehensive error handling
- Custom 404 page implementation

## Installation

1. Clone the repository
2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

## Learning Objectives

This project demonstrates:
- Next.js application development
- React component creation
- State management
- Event handling
- API integration
- Responsive design principles

## License

MIT License

## Academic Integrity

This project is an academic assignment demonstrating web development skills and should be treated as such.