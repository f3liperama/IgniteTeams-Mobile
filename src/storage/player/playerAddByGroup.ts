import AsyncStorage from "@react-native-async-storage/async-storage";

import { PlayerStorageDTO } from "@storage/player/playerStorageDTO";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const storagedPlayers = await playersGetByGroup(group);

    const playerAlreadyExists = storagedPlayers.find(
      (player) => player.name === newPlayer.name
    );

    if (playerAlreadyExists)
      throw new AppError(`Esse participante já está em algum time.`);

    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${group}`,
      JSON.stringify([...storagedPlayers, newPlayer])
    );
  } catch (error) {
    throw error;
  }
}
