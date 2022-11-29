import React from "react";
import { TouchableOpacityProps } from "react-native";
import { ButtonFilterStyleProps, Container, Text } from "./styles";

interface ButtonFilterProps
  extends TouchableOpacityProps,
    ButtonFilterStyleProps {
  text: string;
}

export function ButtonFilter({
  text,
  isActive = false,
  ...rest
}: ButtonFilterProps) {
  return (
    <Container isActive={isActive} {...rest}>
      <Text isActive={isActive}>{text}</Text>
    </Container>
  );
}
