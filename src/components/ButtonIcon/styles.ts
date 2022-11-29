import styled from "styled-components/native";
import { MaterialIcons } from '@expo/vector-icons';

type ButtonIconTypeProps = "ADD" | "CLOSE";

export interface ButtonIconProps {
  type: ButtonIconTypeProps;
}

export const Container = styled.TouchableOpacity`
	width: 56px;
	height: 56px;

	align-items: center;
	justify-content: center;

	margin-left: 12px;
`;

export const Icon = styled(MaterialIcons).attrs<ButtonIconProps>(({ theme, type}) => ({
	size: 32,
	color: type === "ADD" ? theme.COLORS.GREEN_700 : theme.COLORS.RED
}))``;
