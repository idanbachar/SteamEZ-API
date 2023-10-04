import axios from "axios";
import {
  ISteamFriend,
  ISteamGame,
  ISteamPlayer,
  ISteamPlayerBans,
  ISteamStatsDictionary,
  ISteamUserInventory,
  ISteamUserStatsForGame,
} from "../interfaces/ISteamworks";
import { STEAM_API_KEY, STEAM_BASE_URL } from "./general";
import { IUser } from "../interfaces/ISteamUser";

export const GetPlayerData = async (steamId: string) => {
  const endpoint = `${STEAM_BASE_URL}/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&steamids=${steamId}`;
  try {
    const response = await axios.get(endpoint);
    const players = response.data.response.players as ISteamPlayer[];
    if (players.length > 0) {
      return players[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching Steam user data:");
    return null;
  }
};

export const GetPlayersData = async (steamIds: string) => {
  const endpoint = `${STEAM_BASE_URL}/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&steamids=${steamIds}`;
  try {
    const response = await axios.get(endpoint);
    const players = response.data.response.players as ISteamPlayer[];
    return players;
  } catch (error) {
    console.error("Error fetching Steam user data:");
    return null;
  }
};

export const GetFriendsList = async (steamId: string) => {
  const endpoint = `${STEAM_BASE_URL}/ISteamUser/GetFriendList/v0001/?key=${STEAM_API_KEY}&steamid=${steamId}&relationship=friend`;
  try {
    const response = await axios.get(endpoint);
    const friends = response.data.friendslist.friends as ISteamFriend[];
    const friendsIDS = friends.map((friend) => friend.steamid).join(",");
    const friendsData = await GetPlayersData(friendsIDS);
    return friendsData;
  } catch (error) {
    console.error("Error fetching friend list:");
    return null;
  }
};

export const GetPlayerBans = async (steamId: string) => {
  const endpoint = `${STEAM_BASE_URL}/ISteamUser/GetPlayerBans/v1/?key=${STEAM_API_KEY}&steamids=${steamId}`;
  try {
    const response = await axios.get(endpoint);
    return response.data.players[0] as ISteamPlayerBans;
  } catch (error) {
    console.error("Error fetching player bans:");
    return null;
  }
};

export const GetOwnedGames = async (steamId: string) => {
  const endpoint = `${STEAM_BASE_URL}/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${steamId}&include_appinfo=1`;
  try {
    const response = await axios.get(endpoint);
    return response.data.response.games as ISteamGame[];
  } catch (error) {
    console.error("Error fetching owned games:");
    return null;
  }
};

export const GetStatsForCS2 = async (steamId: string) => {
  const appId = "730";
  const endpoint = `${STEAM_BASE_URL}/ISteamUserStats/GetUserStatsForGame/v0002/?key=${STEAM_API_KEY}&appid=${appId}&steamid=${steamId}`;
  try {
    const response = await axios.get(endpoint);
    return response.data.playerstats as ISteamUserStatsForGame;
  } catch (error) {
    console.error("Error fetching game schema:");
    return null;
  }
};

export const GetSteamCSGOInventory = async (steamId: string) => {
  const appID = "730";
  const endpoint = `https://steamcommunity.com/inventory/${steamId}/${appID}/2?l=english&count=5000`;
  console.log(endpoint);

  try {
    const response = await axios.get(endpoint);
    return response.data as ISteamUserInventory | null;
  } catch (error) {
    console.error("Failed to fetch inventory:");
    return null;
  }
};

export const GetSteamLevel = async (steamId: string) => {
  const endpoint = `${STEAM_BASE_URL}/IPlayerService/GetSteamLevel/v1/`;
  const params = {
    key: STEAM_API_KEY,
    steamid: steamId,
  };

  try {
    const response = await axios.get(endpoint, { params });
    return response.data.response.player_level as number | null;
  } catch (error) {
    console.error("Error fetching Steam level:");
    return null;
  }
};

export const GetTotalBadges = async (steamId: string) => {
  const endpoint = `${STEAM_BASE_URL}/IPlayerService/GetBadges/v1/`;
  const params = {
    key: STEAM_API_KEY,
    steamid: steamId,
  };

  try {
    const response = await axios.get(endpoint, { params });
    return response.data.response.badges.length as number | null;
  } catch (error) {
    console.error("Error fetching badges:");
    return null;
  }
};
