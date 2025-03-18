# CalmCove

CalmCove is a mental health journaling and support platform designed to help users express their thoughts, track their emotions, and access mental health resources. It features an intuitive journaling system, anonymous chat support, and a location-based helpline directory.

## Features

- **Mental Health Journal** – Users can log their thoughts and emotions securely.
- **Anonymous Chat Support** – Provides a safe space for users to communicate and seek help.
- **Location-Based Helpline Directory** – Automatically fetches mental health helpline numbers based on the user's location.
- **Secure Authentication** – User authentication with email/password sign-up and profile management using Firebase.

## Tech Stack

- **Frontend:** Next.js (React)
- **Backend:** Next.js API Routes
- **Database:** SQLite
- **Authentication:** Firebase

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/calmcove.git
   cd calmcove
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env.local` file:
   ```env
   DATABASE_URL=file:./calmcove.db
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```

## Usage

- Open `http://localhost:3000` in your browser.
- Sign up or log in to start journaling.
- Use the anonymous chat support feature to seek help.
- Access helpline numbers based on your location.

## Roadmap

- Add mood tracking and insights.
- Improve chat support with AI-powered suggestions.
- Implement multi-device sync for journals.

## Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

## License

This project is licensed under the MIT License.
