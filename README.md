# 🎮 SteamEZ-API

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
   git clone https://github.com/idanbachar/SteamEZ-API.git
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

## How to Get a Steam API Key

Follow the steps below to obtain your Steam API key:

1. **Login to Steam**:

   - Visit the [Steam Community](https://steamcommunity.com/) website.
   - Click on the `Login` button at the top-right corner and enter your Steam credentials.

2. **Access the API Key Page**:

   - Navigate to the [Steam API Key Registration](https://steamcommunity.com/dev/apikey) page.

3. **Register for an API Key**:

   - If you haven't set up a Steam Developer account yet, the site may prompt you to agree to their terms and conditions. Read and agree to proceed.
   - Enter a **Domain Name**. This can be your project's name or the purpose of using the API. For personal projects, you might consider entering "N/A" or "Personal Use".
   - Click on the `Register` button.

4. **Retrieve Your API Key**:
   - Once registered, you'll be presented with your unique Steam API key. Make sure to keep this key confidential and do not share it publicly.

> ⚠️ **Warning**: Never commit your Steam API key directly in code or push it to public repositories. Always use environment variables or other secure methods to handle your key.

5. **Integration**:
   - Use the provided API key in your application as needed according to the Steam Web API documentation.

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
