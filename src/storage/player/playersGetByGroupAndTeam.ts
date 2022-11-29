import { playersGetByGroup } from "./playersGetByGroup";

export async function playersGetByGroupAndTeam(group: string, team: string) {
  try {
    const storagedPlayersByGroup = await playersGetByGroup(group);

    const filteredPlayersByTeam = storagedPlayersByGroup.filter(
      (player) => player.team === team
    );

    return filteredPlayersByTeam;
  } catch (error) {
    throw error;
  }
}
