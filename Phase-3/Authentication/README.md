# PulseForge AI

PulseForge AI is a production-style, full-stack SaaS workspace built to look and feel like the kind of product you would ship inside a product company. It combines secure authentication, role-based access, analytics, AI-powered workflows, and subscription billing into one cohesive platform.

This project is intentionally designed to showcase the skills expected from an SDE1-level engineer: clean backend architecture, maintainable frontend state, reliable database design, secure auth flows, API integration, and deployment-ready thinking.

## What We Are Building

PulseForge AI is a multi-tenant team workspace where users can sign up, create or join organizations, manage access, and use AI features to work faster. The product starts with authentication and dashboards, then expands into a subscription-based SaaS platform with both operational and commercial features.

At a high level, the application will let users:

- Create an account and log in securely with JWT-based authentication
- Join or manage teams and workspaces
- Use an AI assistant to summarize content, generate responses, and support workflow automation
- Store structured product data in PostgreSQL and flexible content in MongoDB
- Track subscriptions, usage, and billing through a payment provider
- View dashboards for account activity, plan usage, and workspace insights
- Experience a polished frontend with strong state management and responsive UI patterns

## Product Vision

The goal is to build a SaaS-style internal productivity platform that feels like a modern product used by real teams. Think of it as a blend of:

- Auth and account management platform
- AI assistant workspace
- Usage-based subscription product
- Admin dashboard for business visibility

This gives the project a clear product story instead of a disconnected list of technologies. Each feature supports one main objective: building a believable, company-grade SaaS application.

## Core Features

### Authentication and Security

- Secure sign up and sign in flow
- JWT authentication for protected routes
- Password hashing and validation
- Role-based access control for users, admins, and workspace members
- Route protection on both backend and frontend

### Workspace and Dashboard

- Personal user dashboard
- Team or organization-based workspace model
- Profile management
- Activity overview and usage statistics
- Protected dashboard routes after login

### AI Features

- LLM API integration for intelligent assistant workflows
- Content summarization
- Smart drafting and response generation
- Query-based assistance for workspace data
- AI-powered productivity features that feel valuable in a real SaaS product

### Data and Persistence

- MongoDB for flexible data such as chat history, conversations, logs, and AI-generated content
- PostgreSQL for relational data such as users, organizations, roles, subscriptions, invoices, and access rules
- Clear separation of document data and relational business data

### Payments and Subscription Billing

- Free and paid plans
- Stripe or similar payment integration
- Subscription checkout flow
- Webhook-driven billing updates
- Feature gating based on plan level
- Usage limits and upgrade prompts

### Frontend Experience

- Modern React-based UI
- State management for auth, dashboard, and app-wide session state
- Responsive layout for desktop and mobile
- Clean navigation between public and protected pages
- Polished UI/UX that looks like a product, not a demo

### DevOps and Delivery

- Environment-based configuration
- Docker-ready deployment structure
- Basic CI/CD workflow
- Production build and release flow
- Logging and operational readiness
- Deployment to a cloud platform

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Global state management approach to be added during implementation

### Backend

- Node.js
- Express
- JWT
- bcryptjs
- MongoDB with Mongoose
- PostgreSQL for relational storage
- LLM API integration
- Payment integration

### Tooling

- ESLint
- Nodemon
- dotenv
- Vite build pipeline

## Architecture Overview

The application is organized as a full-stack monorepo-style project with a React frontend and an Express backend.

```text
Authentication/
|-- src/                # React frontend
|-- backend/            # Express API
|-- README.md           # Project vision and documentation
|-- package.json        # Frontend scripts and dependencies
```

Backend responsibilities:

- Authentication and authorization
- User and workspace APIs
- Dashboard and analytics endpoints
- AI request handling
- Billing and webhook processing
- Database coordination across MongoDB and PostgreSQL

Frontend responsibilities:

- Public landing page
- Auth pages
- Protected dashboard pages
- State management and user session handling
- UI for AI tools, billing, and workspace data

## Planned Pages

- Landing page
- Sign up page
- Login page
- Dashboard home
- Workspace overview
- AI assistant page
- Subscription and billing page
- Admin panel
- Settings and profile page

## Planned Backend Modules

- Auth controller and auth routes
- Dashboard controller and dashboard routes
- User model and account services
- Workspace and role management
- AI service layer
- Billing service layer
- PostgreSQL persistence layer
- MongoDB document storage layer

## Suggested Data Model

### PostgreSQL

- users
- organizations
- membership_roles
- subscriptions
- invoices
- usage_limits

### MongoDB

- chats
- messages
- ai_sessions
- activity_logs
- generated_outputs

This split keeps relational business data structured while letting AI and conversation data stay flexible.

## Roadmap

### Phase 1: Foundation

- Finish auth system
- Lock protected routes
- Build core dashboard layout
- Set up backend structure and clean API flow

### Phase 2: Workspace Product

- Add organization/workspace model
- Add roles and permissions
- Store and fetch dashboard data
- Improve frontend state management

### Phase 3: AI Layer

- Connect an LLM API
- Build chat and summarization workflows
- Save AI sessions and outputs
- Add prompt-driven features for productivity

### Phase 4: SaaS Monetization

- Add payment gateway integration
- Implement subscriptions and plan limits
- Add upgrade flow and billing screens
- Add webhook handling for payment events

### Phase 5: Production Readiness

- Dockerize the application
- Add CI/CD pipeline
- Deploy frontend and backend
- Configure environment variables and secrets
- Add logs, monitoring, and error handling

## Why This Project Is Strong for Interviews

This project demonstrates more than just CRUD or login forms. It shows that you can think like an engineer who builds products:

- You handle auth securely
- You choose the right database for the right job
- You integrate third-party APIs
- You build UI state that supports a real workflow
- You design a monetization model
- You understand deployment and operational basics

That combination is exactly what makes the project credible for product-based company interviews.

## Local Development

Frontend:

```bash
npm install
npm run dev
```

Backend:

```bash
cd backend
npm install
npm run server
```

## Final Goal

The end result is a polished SaaS case study that can be used in a portfolio, on a resume, and in interviews as a proof of full-stack capability.

If built well, PulseForge AI can communicate the exact kind of engineering maturity hiring teams want to see: secure foundations, product thinking, clean architecture, and deployment awareness.
