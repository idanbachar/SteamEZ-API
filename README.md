# 🎮 steam-ez-api

A powerful API built with Node.js and TypeScript, capable of aggregating multiple Steam user data points into a singular, comprehensive endpoint.

![Steam Logo](https://store.cloudflare.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016)

---

## 🚀 Features

- **Player Profile**: Basic information about the Steam user.
- **Friends List**: A list of friends and their respective profiles.
- **Player Bans**: Information on any bans a player might have.
- **Owned Games**: List of games owned by the user.
- **Steam Level**: The user's Steam community level.
- **Total Badges**: How many badges the user has accumulated.
- **CS2 Stats**: Specialized stats if the user plays CS2.

---

## 🛠 Installation & Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/idanbachar/steam-ez-api.git
   cd steam-ez-api
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Environment Configuration**:

   Create a `.env` file in the root of your project and specify your Steam API key:

   ```env
   STEAM_API_KEY=your_api_key_here
   ```

---

## 🚀 Usage

1. **Start the server**:

   ```bash
   npm start
   ```

2. **API Endpoint**:

   - **URL**: `/getFullSteamUserData`
   - **Method**: `GET`
   - **URL Params**: `steamUrl=[string]`

   **Example**:

   ```
   http://localhost:3000/getFullSteamUserData?steamUrl=https://steamcommunity.com/id/username
   ```

---

## 🙏 Acknowledgments

- Steam, for their comprehensive API.
