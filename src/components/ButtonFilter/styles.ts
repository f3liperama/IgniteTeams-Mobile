import styled, { css } from "styled-components/native";

export interface ButtonFilterStyleProps {
  isActive?: boolean;
}

export const Container = styled.TouchableOpacity<ButtonFilterStyleProps>`
  ${({ theme, isActive }) =>
    isActive &&
    css`
      border: 1px solid ${theme.COLORS.GREEN_700};
    `};

  align-self: flex-start;

  border-radius: 4px;
  margin-right: 12px;

  height: 38px;
  min-width: 70px;

  align-items: center;
  justify-content: center;

  padding: 8px 12px;
`;

export const Text = styled.Text<ButtonFilterStyleProps>`
  text-transform: uppercase;

  ${({ theme, isActive }) =>
    css`
      font-family: ${theme.FONT_FAMILY.BOLD};
      font-size: ${theme.FONT_SIZE.SM}px;
      color: ${isActive ? theme.COLORS.WHITE : theme.COLORS.GRAY_200}; 
    `};
`;

