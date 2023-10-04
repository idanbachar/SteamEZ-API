import { ICreateUserParams, IUser } from "../interfaces/ISteamUser";
import {
  ISteamGame,
  ISteamStatsDictionary,
  ISteamUserStatsForGame,
} from "../interfaces/ISteamworks";
import { GetTimeStampInHours } from "./dateservice";
import {
  GetFriendsList,
  GetOwnedGames,
  GetPlayerBans,
  GetPlayerData,
  GetStatsForCS2,
  GetSteamLevel,
  GetTotalBadges,
} from "./steamworks";

export const GetFullUserData = async (steamId: string) => {
  try {
    const data = await Promise.all([
      GetPlayerData(steamId),
      GetFriendsList(steamId),
      GetPlayerBans(steamId),
      GetOwnedGames(steamId),
      GetSteamLevel(steamId),
      GetTotalBadges(steamId),
      GetStatsForCS2(steamId),
    ]);

    const playerData = data[0];
    const friendsList = data[1];
    const playerBans = data[2];
    const ownedGames = data[3];
    const steamLevel = data[4];
    const totalBadges = data[5];
    const cs2Stats = data[6];

    const fullData = CreateUserForClient({
      playerData,
      friendsList,
      playerBans,
      ownedGames,
      steamLevel,
      totalBadges,
      cs2Stats,
    });

    return fullData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const CreateUserForClient = (props: ICreateUserParams) => {
  const {
    playerData,
    friendsList,
    playerBans,
    ownedGames,
    steamLevel,
    totalBadges,
    cs2Stats,
  } = props;
  if (playerData === null) return null;

  const cs2 = GetCounterStrike2Game(ownedGames, cs2Stats);

  const fullData = {
    steamid: playerData.steamid,
    personaname: playerData.personaname,
    profileurl: playerData.profileurl,
    avatar: playerData.avatar,
    avatarfull: playerData.avatarfull,
    avatarmedium: playerData.avatarmedium,
    realname: playerData.realname,
    loccountrycode: playerData.loccountrycode,
    country_image: playerData.loccountrycode
      ? `https://flagcdn.com/48x36/${playerData.loccountrycode.toLowerCase()}.png`
      : null,
    timecreated: new Date(+playerData.timecreated * 1000),
    friends: friendsList,
    vacBans: playerBans,
    games:
      ownedGames !== null && ownedGames !== undefined
        ? ownedGames.sort((a, b) => b.playtime_forever - a.playtime_forever)
        : null,
    cs2,
    inventory: null,
    totalBadges,
    steamLevel,
    total_games:
      ownedGames !== null && ownedGames !== undefined
        ? ownedGames.length
        : null,
  } as IUser;

  return { ...fullData };
};

const GetCounterStrike2Game = (
  ownedGames: ISteamGame[] | null | undefined,
  cs2Stats: ISteamUserStatsForGame | null
) => {
  if (ownedGames === null || ownedGames === undefined) return null;
  const cs2 = ownedGames.find((game) => game.appid === 730);
  if (cs2 === undefined) return null;
  return {
    appid: cs2.appid,
    name: cs2.name,
    playtime_forever: GetTimeStampInHours(cs2.playtime_forever),
    img_icon_url: `https://steamcdn-a.akamaihd.net/steam/apps/${cs2.appid}/capsule_231x87.jpg`,
    stats: GetCounterStrike2Stats(cs2Stats),
  };
};

const GetCounterStrike2Stats = (stats: ISteamUserStatsForGame | null) => {
  if (stats === null) return null;
  if (stats.stats === null || stats.stats === undefined) return null;
  const statsDictionary = stats.stats.reduce(
    (result: ISteamStatsDictionary, stat) => {
      result[stat.name] = stat.value;
      return result;
    },
    {}
  );
  return {
    total_wins: statsDictionary["total_wins"],
    total_kills_headshot: statsDictionary["total_kills_headshot"],
    headshot_precentage: Math.round(
      (statsDictionary["total_kills_headshot"] /
        statsDictionary["total_kills"]) *
        100
    ),
    total_kills: statsDictionary["total_kills"],
  };
};
