import React, { RefObject } from "react";
import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";
import { Container } from "./styles";

interface TextInputCustomProps extends TextInputProps {
  inputRef?: RefObject<TextInput>;
}

export function Input({ inputRef, ...rest }: TextInputCustomProps) {
  const { COLORS } = useTheme();

  return (
    <Container
      placeholderTextColor={COLORS.GRAY_300}
      {...rest}
      ref={inputRef}
    />
  );
}
