import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";

import { Container } from "./styles";

import { Button } from "@components/Button";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import { FlatList } from "react-native";

import { Loading } from "@components/Loading";
import { groupsGetAll } from "@storage/group/groupsGetAll";

export function Groups() {
  const { navigate } = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  function handleNewGroup() {
    navigate("newgroup");
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);

      const data = await groupsGetAll();

      setGroups(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenGroup(groupName: string) {
    navigate("players", { group: groupName });
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          keyExtractor={(item) => item}
          ListEmptyComponent={
            <ListEmpty message="Que tal cadastrar o primeiro grupo?" />
          }
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
        />
      )}

      <Button text="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
