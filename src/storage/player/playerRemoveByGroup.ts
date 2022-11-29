import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerRemoveByGroup(playerName: string, group: string) {
  try {
    const storagedPlayers = await playersGetByGroup(group);

    const filtered = storagedPlayers.filter(
      (player) => player.name !== playerName
    );

    const formattedPlayers = JSON.stringify(filtered);

    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${group}`,
      formattedPlayers
    );
  } catch (error) {
    throw error;
  }
}
