import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";

import { Button } from "@components/Button";
import { ButtonFilter } from "@components/ButtonFilter";
import { ButtonIcon } from "@components/ButtonIcon";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ListEmpty } from "@components/ListEmpty";
import { PlayerCard } from "@components/PlayerCard";

import { groupDelete } from "@storage/group/groupDelete";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/playerStorageDTO";

import { Loading } from "@components/Loading";
import { AppError } from "@utils/AppError";
import {
  Container,
  FilterContainer,
  Form,
  NumberOfParticipantsLabel,
} from "./styles";

interface RouteParamsProps {
  group: string;
}

export function Players() {
  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParamsProps;

  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);

      const playersByTeam = await playersGetByGroupAndTeam(group, team);

      setPlayers(playersByTeam);
    } catch (error) {
      if (error instanceof AppError) return Alert.alert(error.message);
      else {
        console.error(error);
        return Alert.alert("Erro ao listar os participantes.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0)
      return Alert.alert("Informe o nome do participante para adicionar.");

    if (!team) return Alert.alert("Selecione o time para adicionar.");

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();
      setNewPlayerName("");
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) return Alert.alert(error.message);
      else {
        console.error(error);
        return Alert.alert("Erro ao adicionar novo participante.");
      }
    }
  }

  async function handleRemovePlayer(player: string, group: string) {
    try {
      await playerRemoveByGroup(player, group);

      await fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) return Alert.alert(error.message);
      else {
        console.error(error);
        return Alert.alert("Erro ao remover o participante.");
      }
    }
  }

  async function handleDeleteGroup() {
    try {
      Alert.alert("Remover", `Deseja remover a turma ${group}?`, [
        { text: "Não", style: "cancel" },
        {
          text: "Sim",
          onPress: async () => {
            await groupDelete(group);

            navigation.navigate("groups");
          },
        },
      ]);
    } catch (error) {
      if (error instanceof AppError) return Alert.alert(error.message);
      else {
        console.error(error);
        return Alert.alert("Erro ao deletar o grupo.");
      }
    }
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="Adicione a galera e separe os times" />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome do participante"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon type="ADD" icon="add" onPress={handleAddPlayer} />
      </Form>

      <FilterContainer>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ButtonFilter
              text={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <NumberOfParticipantsLabel>{players.length}</NumberOfParticipantsLabel>
      </FilterContainer>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handleRemovePlayer(item.name, group)}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há participantes" />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && {
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        />
      )}

      <Button
        text="Remover turma"
        type="SECONDARY"
        onPress={handleDeleteGroup}
      />
    </Container>
  );
}
