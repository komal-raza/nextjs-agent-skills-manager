# Agentic Skills Manager

A web app for writing, organizing, and sharing Markdown-based skills for AI agents. Create a skill once, keep it private in your workspace or publish it to the public gallery, and manage it from your dashboard.

## Screenshots

### Homepage

![Agentic Skills Manager homepage](public/projectmedia/homepage.png)

### Public skills gallery

![Public skills gallery](public/projectmedia/skillspage.png)

![Skills gallery view](public/projectmedia/localhost_3001_skills.png)

### Skill details

![Public skill details](public/projectmedia/viewSkill.png)

### Dashboard

![Skills dashboard](public/projectmedia/dashboard.png)

### Create and edit skills

![Skill editor](public/projectmedia/skillEditPage.png)

### Mobile layouts

![Mobile homepage](public/projectmedia/mob-home.png)

![Mobile dashboard](public/projectmedia/mob-dashboard.png)

### Not found page

![Not found page](public/projectmedia/notFoundPage.png)

## What you can do

- Register and sign in to manage your skills.
- Create, edit, and delete your own skills.
- Write skill instructions in Markdown, including optional YAML frontmatter.
- Choose whether each skill is public or private.
- Browse published skills and view their details.
- See skill counts and visibility at a glance on your dashboard.

## Getting started

### Prerequisites

- Node.js and npm
- Docker and Docker Compose for the included local PostgreSQL database, or another PostgreSQL database

### 1. Start PostgreSQL

The included Compose file starts PostgreSQL on port `5434`:

```bash
docker compose up -d
```

### 2. Configure the database

Create a `.env` file in the project root and set `DATABASE_URL`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5434/skills_db?schema=public"
```

This connection string matches the local development database in `docker-compose.yml`. For another PostgreSQL instance, use its connection string instead.

### 3. Install dependencies and set up the schema

```bash
npm install
npx prisma migrate dev
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How to use the app

1. Create an account at `/register`, or sign in at `/login`.
2. Open the dashboard at `/dashboard` and choose **Create Skill**.
3. Enter a name and description, then write the skill instructions in Markdown. The editor starts with a frontmatter example:

   ```md
   ---
   name: my-skill
   description: What this skill does
   ---

   # Skill Title

   Instructions for how to use this skill...
   ```

4. Turn **Make this skill public** on to list it in the gallery, or turn it off to keep it private to your account.
5. Use the dashboard to edit or delete your skills. Public skills can be explored at `/skills`.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page and skill-format example |
| `/skills` | Public skills gallery |
| `/skills/[id]` | Public skill details |
| `/dashboard` | Your skills and visibility overview |
| `/dashboard/skills/new` | Create a skill |
| `/dashboard/skills/[id]/edit` | Edit one of your skills |
| `/login` | Sign in |
| `/register` | Create an account |

## Rendering and Next.js features

This project uses the Next.js App Router and demonstrates server and client rendering patterns alongside the Next.js 16 Cache Components model.

| Feature | How it is used |
| --- | --- |
| **Server Components / server rendering** | The public gallery and skill detail route query PostgreSQL on the server. Interactive areas such as the dashboard, forms, navigation, and authentication state use Client Components. |
| **Cached rendering (ISR-style revalidation)** | The public gallery uses the `'use cache'` directive and `cacheLife` with `stale: 60`, `revalidate: 120`, and `expire: 3600`. Skill create, update, and delete actions call `revalidatePath` to refresh affected routes. |
| **Static Site Generation (SSG)** | The project does not configure `generateStaticParams` or a separate build-time SSG route. Skill pages use database-backed content; the gallery's cache behavior is defined with Cache Components rather than the legacy `export const revalidate` setting. |
| **Server Actions** | `createSkill`, `updateSkill`, and `deleteSkill` are server actions that persist changes with Prisma and revalidate relevant pages. |
| **Route Handlers** | API routes handle authentication and skill data requests, including checks that a skill belongs to the current user. |
| **Dynamic routes and metadata** | `/skills/[id]` looks up a skill by its route parameter and generates page metadata from the skill's name and description. |

## Tech stack

- **Next.js 16** — App Router, Cache Components, Server Actions, Route Handlers, and Turbopack
- **React 19** and **TypeScript**
- **PostgreSQL** — relational data storage
- **Prisma ORM 7** with the PostgreSQL driver adapter
- **Tailwind CSS 4** and **DaisyUI 5** — styling and UI components
- **bcryptjs** — password hashing

## Useful commands

```bash
npm run dev       # Start the development server
npm run lint      # Run ESLint
npm run build     # Create a production build
npm run start     # Start the production server
```

## Data model

The database contains two related models:

- **User** — account name, unique email, password hash, and timestamps.
- **Skill** — name, description, Markdown content, public/private visibility, author, and timestamps.

Deleting a user cascades to their skills.

## Authentication note

Passwords are hashed with `bcryptjs` and the app stores its authentication token in an `HttpOnly` cookie. The current token is a lightweight base64-encoded payload, not a signed JWT. Replace it with a properly signed token or established session solution before using the app in production.
