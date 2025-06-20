# mini-auth-feed-app

A modern, responsive mini social feed app with authentication, built using **React**, **TypeScript**, and **TailwindCSS**. The UI and UX are inspired by a Figma design (see below).

## ✨ Features

- **Feed Page**: Landing page with a list of posts, matching the Figma layout.
- **Authentication**: Sign in/up with modal and dedicated pages (`/signin`, `/signup`).
- **Auth Modal**: Triggers on any unauthenticated interaction.
- **Post Editor**: Emoji picker, toolbar, and publish button (other toolbar actions show "function not implemented").
- **Post Card**: Avatar, name, time, emoji, content, and action icons (like, comment, send; all show alert if not implemented).
- **Password Validation**: Real-time password match validation with styled error messages.
- **Responsive & Animated**: Fully responsive with slick Tailwind-powered animations.
- **Initial Data**: Posts loaded from a JSON file for easy editing.
- **Deployment Ready**: Easily deploy to GitHub Pages.

## 🛠 Tech Stack

- [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Heroicons](https://heroicons.com/) & [react-icons](https://react-icons.github.io/react-icons/)

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🏗️ Project Structure

- `src/components/` – UI components (Feed, PostEditor, PostCard, Navbar, AuthModal, SignInPage, Footer)
- `src/context/AuthContext.tsx` – Authentication context and logic
- `src/initialPosts.json` – Initial posts data
- `src/App.tsx` – Main app and routing

## 🌐 Deployment

This app is ready to deploy to GitHub Pages:

1. **Build and deploy:**
   ```bash
   npm run deploy
   ```
   The app will be published at: [https://meena-shiv.github.io/mini-auth-feed-app](https://meena-shiv.github.io/mini-auth-feed-app)


## 🙏 Credits

- UI/UX: [Figma](https://figma.com/) (design by [your name or designer])
- Code: [@Shiv Meena](https://github.com/meena-shiv)
- Icons: [Heroicons](https://heroicons.com/), [react-icons](https://react-icons.github.io/react-icons/)

---

Built with ❤️ using React, TypeScript, and TailwindCSS.
