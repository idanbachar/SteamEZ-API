import axios from "axios";
import { STEAM_API_KEY, STEAM_BASE_URL } from "./general";

export const CheckIsSteamProfileValid = (steamURL: string) => {
  const regex =
    /^https:\/\/steamcommunity\.com\/(id\/[a-zA-Z0-9_-]+|profiles\/[0-9]{17})\/?$/;
  return regex.test(steamURL);
};

const resolveVanityURL = async (vanityName: string) => {
  const endpoint = `${STEAM_BASE_URL}/ISteamUser/ResolveVanityURL/v0001/?key=${STEAM_API_KEY}&vanityurl=${vanityName}`;

  try {
    const response = await axios.get(endpoint);
    if (response.data.response.success === 1) {
      return response.data.response.steamid;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error resolving vanity URL:", error);
    return null;
  }
};

export const GetSteamIDFromURL = async (steamURL: string) => {
  const regex =
    /^https:\/\/steamcommunity\.com\/(id\/([a-zA-Z0-9_-]+)|profiles\/([0-9]{17}))\/?$/;
  const match = steamURL.match(regex);

  let steamID64: string | null = null;
  let vanityName: string | null = null;

  if (match) {
    vanityName = match[2];
    steamID64 = match[3];
  }

  if (!steamID64 && vanityName) {
    const steamId = await resolveVanityURL(vanityName);
    return steamId;
  }
  return steamID64;
};
