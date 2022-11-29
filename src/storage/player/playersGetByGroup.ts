import AsyncStorage from "@react-native-async-storage/async-storage";

import { PlayerStorageDTO } from "@storage/player/playerStorageDTO";
import { PLAYER_COLLECTION } from "@storage/storageConfig";

export async function playersGetByGroup(group: string) {
  try {
    const storagedPlayers = await AsyncStorage.getItem(
      `${PLAYER_COLLECTION}-${group}`
    );

    const formattedPlayers: PlayerStorageDTO[] = storagedPlayers
      ? JSON.parse(storagedPlayers)
      : [];

    return formattedPlayers;
  } catch (error) {
    throw error;
  }
}
