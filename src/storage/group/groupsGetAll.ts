import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function groupsGetAll() {
  try {
    const data = await AsyncStorage.getItem(GROUP_COLLECTION);

    const dataFormatted = data ? JSON.parse(data) : [];

    return dataFormatted;
  } catch (error) {
    throw error;
  }
}
