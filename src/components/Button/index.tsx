import React from "react";
import { TouchableOpacityProps } from "react-native";
import { ButtonTypeProps, Container, Text } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  type?: ButtonTypeProps;
}

export function Button({ text, type = "PRIMARY", ...rest }: ButtonProps) {
  return (
    <Container type={type} {...rest}>
      <Text>{text}</Text>
    </Container>
  );
}
