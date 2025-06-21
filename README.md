> [!IMPORTANT]
> **Required Setup: Connect Your Database**
> This application requires a connection to a MongoDB database to run. You must create a `.env.local` file with your database connection string.
>
> 1.  **Create a `.env.local` file** in the root of your project.
> 2.  **Copy the contents** from the `.env.example` file into your new `.env.local` file.
> 3.  **Fill in the `MONGODB_URI` and `NEXTAUTH_SECRET`** values in `.env.local`.
>
> Your app will not start until this is done. This is a one-time setup.

# RentNest – House & Apartment Rentals

Welcome to RentNest, a modern, full-stack property rental web application. This platform allows users to browse, filter, and save property listings, while providing landlords with a dedicated dashboard to manage their properties.

## ✨ Features

- **Advanced Property Search**: Filter listings by city, price range, and property type.
- **Interactive UI**: A clean, responsive design with a glassmorphism aesthetic and a dark mode toggle.
- **User Accounts**: Guests can browse, while registered users can save favorites and contact landlords.
- **Landlord Dashboard**: A protected area for landlords to add, edit, and manage their rental properties.
- **Favorites System**: Users can save their favorite properties for easy access later.
- **Booking Calendar**: Users can request property viewings using an interactive calendar.
- **Similar Listings**: Discover more properties with the "similar listings" feature on each property page.
- **Contact Landlords**: Built-in contact form and a WhatsApp button for instant communication.

## 🚀 Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS & ShadCN
- **Database**: MongoDB (with Mongoose)
- **Authentication**: NextAuth.js (role-based)
- **Deployment**: Vercel

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm, yarn, or pnpm
- MongoDB database

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/rentnest.git
    cd rentnest
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and copy the contents of `.env.example`. Fill in the required values.
    ```bash
    cp .env.example .env.local
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

### Seed Data (Optional)

To populate the database with dummy data for testing, you can run the seed script:
```bash
# This is a placeholder for a future seed script
# npm run seed
```

## 🔐 Authentication Roles

- **Guest**: Can browse listings and use search/filter functionalities.
- **User**: Can do everything a guest can, plus save favorites, book visits, and contact landlords.
- **Landlord**: Has a dashboard to manage their own properties and view incoming messages.

## 🚢 Deployment

This application is configured for easy deployment on [Vercel](https://vercel.com/).

1.  Push your code to a GitHub repository.
2.  Import the repository on Vercel.
3.  Add the environment variables from your `.env.local` file to the Vercel project settings.
4.  Deploy!

## 🔗 Live Demo

[Link to your deployed Vercel app will go here]
