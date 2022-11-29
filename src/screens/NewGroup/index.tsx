import React, { useState } from "react";
import { Alert } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Container, Content, Icon } from "./styles";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";

import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";

export function NewGroup() {
  const { navigate } = useNavigation();
  const [group, setGroup] = useState("");

  async function handleCreateTeam() {
    try {
      await groupCreate(group);

      navigate("players", { group });
    } catch (error) {
      console.log(error instanceof AppError);
      if (error instanceof AppError) {
        Alert.alert("Novo grupo", error.message);
      } else {
        Alert.alert("Novo grupo", "Não foi possível criar um novo grupo.");
      }
    }
    s;
  }
  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="crie uma turma para adicionar pessoas"
        />

        <Input placeholder="Nome da turma" onChangeText={setGroup} />

        <Button
          text="Criar"
          style={{ marginTop: 20 }}
          onPress={handleCreateTeam}
        />
      </Content>
    </Container>
  );
}
