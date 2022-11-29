import { TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Container, ButtonIconProps, Icon } from "./styles";

interface Props extends TouchableOpacityProps, ButtonIconProps {
  icon: keyof typeof MaterialIcons.glyphMap;
}

export function ButtonIcon({ type = "ADD", icon, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Icon type={type} name={icon} />      
    </Container>
  );
}
