import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";

import theme from "@theme/index";


import { Loading } from "@components/Loading";
import { Routes } from "@routes/index";

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {fontsLoaded ? <Routes /> : <Loading />}
    </ThemeProvider>
  );
}
