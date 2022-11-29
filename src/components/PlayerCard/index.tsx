import React from "react";

import { ButtonIcon } from "@components/ButtonIcon";

import { Container, Icon, Name } from "./styles";

interface PlayerCardProps {
  name: string;
  onRemove: () => void;
}

export function PlayerCard({ name, onRemove }: PlayerCardProps) {
  return (
    <Container>
      <Icon name="person" />
      <Name>{name}</Name>
      <ButtonIcon type="CLOSE" icon="close" onPress={onRemove} />
    </Container>
  );
}
