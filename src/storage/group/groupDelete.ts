import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";

export async function groupDelete(groupDeleted: string) {
  try {
    const storagedGroups = await groupsGetAll();
    const filteredGroups = storagedGroups.filter(
      (group: string) => group !== groupDeleted
    );

    await AsyncStorage.setItem(
      GROUP_COLLECTION,
      JSON.stringify(filteredGroups)
    );
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`);
  } catch (error) {
    throw error;
  }
}
