# Project Structure

this document describe the project structure for the project would be as tghe project growth and explain the purpose of each directory.

> i took references from [here](https://dev.to/pramod_boda/recommended-folder-structure-for-react-2025-48mc).  
> i think this references looks good, but i modify it a little bit.
> tell me if you have a better suggestion, thank you.

---

## Root

```
sinanonym
├── docs/               # for documentation/markdown
├── eslint.config.js
├── index.html
├── node_modules
├── package.json
├── package-lock.json
├── public/             # folder contains static files that are served directly to the browser
├── README.md
├── src/                # react code
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## Folder Structure

### src

> this is just initial plan.

```

src
├── /assets/           # Static assets (images, fonts, etc.)
├── /components/       # Reusable components
├── /features/         # Feature-specific logic and components (could be feature folders)
├── /hooks/            # Custom React hooks
├── /layouts/          # Layout components (e.g., Header, Footer, Sidebar)
├── /pages/            # Page components (routes)
├── /services/         # API requests, utilities, external service integrations
├── /store/            # State management (Redux, Zustand, Context API)
├── /styles/           # Global styles (CSS, SASS, Styled Components)
├── /types/            # TypeScript types (if using TS)
├── /utils/            # Utility functions, helpers, and constants
├── /app.tsx           # App component (entry point)
├── /index.tsx         # Main entry point for React
├── /router.tsx        # Routing (React Router setup)
└── /config/           # Environment variables and configuration files
```

### Folder Details

#### 1. assets

- Store images, fonts, and other media assets here.
- It's optional to break this into subfolders (e.g., /images, /fonts).

#### 2. component

- Contains all reusable UI components that can be shared across different parts of your app.

```
Example:
components
├── Button.tsx
├── Modal.tsx
└── Navbar.tsx
```

#### 3. features

- Organize your components, hooks, and logic by features (also called domain-based structure). This helps separate code based on functionality rather than by component type, promoting better scalability and maintainability.

```
Example:

features
├── /auth/           # Authentication-related components, hooks, reducers
├── /dashboard/      # Dashboard components, hooks, etc.
└── /profile/        # Profile-related components

```

#### 4. hooks

- Store custom hooks that can be reused across your app, such as data fetching, form handling, etc.

```

Example:

hooks
├── useAuth.ts
├── useFetch.ts
└── useForm.ts

```

#### 5. layouts

- Layout components like Header, Sidebar, Footer, etc., that are used across multiple pages.

```

Example:

layouts
├── MainLayout.tsx
├── AdminLayout.tsx
└── DashboardLayout.tsx

```

#### 6. pages

- Contains page-level components (typically mapped to routes) that use the components from /features or /components.

```

Example:

pages
  ├── Auth/
  │   └── SignInPage.tsx
  │   └── SignUpPage.tsx
├── Dashboard.tsx
├── Home.tsx
├── Users.tsx
├── Prodcuts.tsx
└── ContactUs.tsx

```

#### 7. services

- Functions for API requests, integrating third-party services, or utilities that handle external communication.
- This could also be the place for service hooks or API-related logic.

```

Example:

/services
  ├── authService.ts   # Authentication API
  └── apiService.ts    # General API calls


```

#### 8. store

- If you’re using a state management solution like Redux, Zustand, or Context API, keep the logic and actions here.

#### 9. styles

- Store global styles, theme files, or any CSS/SASS or CSS-in-JS styles here.

```

Example:

styles
├── index.css
├── theme.ts        # For theme configuration in styled-components
└── global.scss     # Global styles for the app


```

#### 10. types

- If using TypeScript, store your custom types or interfaces here for easier management and reusability.

```


Example:

types
├── auth.d.ts       # Types for authentication-related data
├── api.d.ts        # Types for API responses
└── user.d.ts       # Types for user objects


```

#### 11. utils

- General utility functions that are used across your app (e.g., date formatting, data validation, etc.).

```

Example:

utils
├── formatDate.ts
└── validateEmail.ts

```

#### 12. config

- Store environment variables or app configuration settings here, such as the API base URL, feature flags, etc.

```
config
├── index.ts        # Export environment variables and configurations
├── config.ts       # Configuration file for app set

```

---
