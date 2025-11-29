# Personal Landing Page

A modern, responsive, and animated personal landing page built with bolt.new using React, Vite, and Tailwind CSS. This project serves as a central hub for your online presence, showcasing your profile, social links, and payment addresses.

## Features

- **Dynamic Subtitles**: Automatically cycles through a list of roles or descriptors with smooth animations.
- **Social Links**: Displays your social media profiles with custom icons and hover effects.
- **Crypto/Payment Addresses**: distinct section for payment addresses (UPI, Bitcoin, USDT) with one-click copy-to-clipboard functionality.
- **Responsive Design**: Fully responsive layout that looks great on mobile, tablet, and desktop.
- **Data-Driven**: All content (profile info, links, subtitles) is managed via a simple YAML file (`public/data.yaml`), making updates effortless.
- **Animations**: Smooth entrance and interaction animations using Framer Motion.

## Tech Stack

- **Framework**: [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [Simple Icons](https://simpleicons.org/)
- **Data Management**: YAML

## Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd personal-landing-page
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173`.

## Configuration

You can easily customize the content of the landing page by editing the `public/data.yaml` file.

### Structure of `data.yaml`

```yaml
profile:
  name: Your Name
  title: Main Title Text

subtitles:
  - Role 1
  - Role 2
  - ...

socialLinks:
  - name: Platform Name
    url: https://link-to-profile
    icon: /path/to/icon
    color: tailwind-hover-color-class

paymentAddresses:
  - name: Payment Method
    address: Wallet Address or ID
    icon: /path/to/icon
    color: tailwind-hover-color-class
```

- **Images**: Place your images (profile picture, icons) in the `public` directory and reference them in the YAML file.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run preview`: Locally preview the production build.
- `npm run lint`: Runs ESLint to check for code quality issues.
