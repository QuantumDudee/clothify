# Clothify

Clothify is a web application that provides daily outfit recommendations based on real-time weather conditions using the OpenWeather API. The app simplifies outfit selection by considering temperature, precipitation, and wind speed to generate appropriate clothing suggestions.

## Features

- **Weather-Based Outfit Suggestions**: Fetches real-time weather data using the OpenWeather API and suggests appropriate clothing based on conditions.
- **User-Selected Location**: Enter your city or use your current location to get personalized recommendations.
- **Basic Personalization**: Like or dislike outfit suggestions to improve future recommendations.
- **Responsive Design**: Clean, mobile-friendly interface that works on all devices.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- OpenWeather API key (get one for free at [OpenWeather](https://openweathermap.org/api))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/clothify.git
   cd clothify
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your OpenWeather API key:
   ```
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Deployment on Vercel

The easiest way to deploy Clothify is to use the [Vercel Platform](https://vercel.com):

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Add your environment variables (NEXT_PUBLIC_OPENWEATHER_API_KEY) in the Vercel project settings.
4. Deploy!

## How It Works

1. Enter your city name or use your current location.
2. The app fetches real-time weather data from the OpenWeather API.
3. Based on temperature, precipitation, and wind speed, the app generates outfit recommendations.
4. You can like or dislike recommendations to improve future suggestions.

## Technologies Used

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For responsive and beautiful UI
- **OpenWeather API**: For real-time weather data
- **Vercel**: For deployment and hosting

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenWeather API for providing weather data
- Next.js team for the amazing framework
- Vercel for the deployment platform
