import { useNavigation } from "@react-navigation/native";
import React from "react";

import { BackButtonIcon, BackIcon, Container, Logo } from "./styles";

import logoImg from "@assets/logo.png";

interface HeaderProps {
  showBackButton?: boolean;
}

export function Header({ showBackButton = false }: HeaderProps) {
  const { navigate } = useNavigation();

  function handleGoBack() {
    navigate("groups");
  }

  return (
    <Container>
      {showBackButton && (
        <BackButtonIcon onPress={handleGoBack}>
          <BackIcon />
        </BackButtonIcon>
      )}

      <Logo source={logoImg} />
    </Container>
  );
}
