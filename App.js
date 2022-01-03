import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import React, { useState } from 'react';
import { Image, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from 'expo-asset';
import { NavigationContainer } from "@react-navigation/native";
import Root from "./navigation/Root";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient();

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
const loadImages = (images) => images.map(image => {
  if(typeof image === "string") {
    return Image.prefetch(image);
  }
  else {
    return Asset.loadAsync(image);
  }
});

export default function App() {
  // hook을 이용한 preloading
  // useAssets & useFonts를 쓰면 loading 함수에서 다른 작업을 하지 못함
  const [assets] = useAssets([require("./assets/logo.jpeg")])
  const [loaded] = Font.useFonts(Ionicons.font);
  const [ready, setReady] = useState(false);

  const onFinish = () => setReady(true);
  const startLoading = async() => {
    // loading 할 때 모든 것을 담는 곳
    // init DB
    // get user avat
    // ...Etc

    //await new Promise(resolve => setTimeout(resolve, 2000));
    // await Font.loadAsync(Ionicons.font);
    const fonts = loadFonts([Ionicons.font]);
    const images = loadImages(
      [require("./assets/logo.jpeg"),
      "https://reactnative.dev/img/tiny_logo.png"]);
    await Promise.all([...fonts, ...images])
  };
  const isDark = useColorScheme() === "dark";
  
  if(!ready) {
    return (
      <AppLoading
        startAsync={startLoading} 
        onFinish={onFinish}
        onError={console.error}      
      />
    );
  }
  return  (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

