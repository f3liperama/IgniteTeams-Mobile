import styled, { css } from "styled-components/native";

export type ButtonTypeProps = "PRIMARY" | "SECONDARY";

interface ButtonProps {
  type: ButtonTypeProps;
}

export const Container = styled.TouchableOpacity<ButtonProps>`
  flex: 1;

  min-height: 56px;
  max-height: 56px;

  border-radius: 6px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme, type }) =>
    type === "SECONDARY" ? theme.COLORS.RED_DARK : theme.COLORS.GREEN_700};
`;

export const Text = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `};
`;
