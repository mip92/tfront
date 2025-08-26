# Tattoo Client - Next.js GraphQL Application

A modern Next.js application with GraphQL authentication, built with TypeScript and Tailwind CSS.

## Features

- 🔐 **Authentication System** - Login and registration with JWT tokens
- 🚀 **Next.js 14** - Latest Next.js with App Router
- 📊 **GraphQL Integration** - Apollo Client for GraphQL operations
- 🎨 **Modern UI** - Beautiful interface with Tailwind CSS
- 🔒 **Protected Routes** - Dashboard access only for authenticated users
- 📱 **Responsive Design** - Works on all device sizes
- 🧩 **TypeScript** - Full type safety throughout the application

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **GraphQL**: Apollo Client, Apollo Server
- **State Management**: React Context API
- **Authentication**: JWT tokens with localStorage

## Prerequisites

- Node.js 18+
- npm or yarn
- GraphQL server running at `http://localhost:4000/graphql`

## Installation

1. Clone the repository:

```bash
git clone https://github.com/mip92/tfront.git
cd tfront
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication page
│   ├── dashboard/         # Protected dashboard
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page with redirects
├── components/            # Reusable components
│   ├── Navigation.tsx     # Main navigation
│   └── LoadingSpinner.tsx # Loading component
├── contexts/              # React contexts
│   └── AuthContext.tsx    # Authentication context
└── lib/                   # Utilities and configurations
    ├── graphql.ts         # Apollo Client setup
    └── auth-mutations.ts  # GraphQL mutations
```

## GraphQL Schema Requirements

Your GraphQL server should implement these mutations:

### Login

```graphql
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      email
      username
    }
  }
}
```

### Register

```graphql
mutation Register($email: String!, $password: String!, $username: String) {
  register(email: $email, password: $password, username: $username) {
    token
    user {
      id
      email
      username
    }
  }
}
```

### Logout

```graphql
mutation Logout {
  logout
}
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Authentication Flow

1. **Unauthenticated users** are redirected to `/auth`
2. **Login/Register** forms submit to GraphQL mutations
3. **JWT token** is stored in localStorage
4. **Authenticated users** are redirected to `/dashboard`
5. **Token** is automatically included in GraphQL requests
6. **Logout** clears token and redirects to auth page

## Customization

- **GraphQL endpoint**: Update `src/lib/graphql.ts`
- **Styling**: Modify Tailwind classes in components
- **Authentication logic**: Update `src/contexts/AuthContext.tsx`
- **GraphQL mutations**: Edit `src/lib/auth-mutations.ts`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support, please open an issue on GitHub or contact the development team.
