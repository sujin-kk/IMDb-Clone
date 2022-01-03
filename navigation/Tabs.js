import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Stack from "./Stack"
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { ImageComponent, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, YELLOW_COLOR } from "../colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const isDark = useColorScheme() === "dark";
    return (
    <Tab.Navigator
        sceneContainerStyle={{
          backgroundColor: isDark ? BLACK_COLOR : "white",
        }}
        initialRouteName="Movies"
        screenOptions={{
            unmountOnBlur: true, // caching, not fetch again
            headerShown: false,
            tabBarStyle: { backgroundColor: isDark ? BLACK_COLOR : "white" },
            tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
            tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY,
            headerStyle: { backgroundColor: isDark ? BLACK_COLOR : "white" },
            headerTitleStyle: { color: isDark ? "white" : BLACK_COLOR },
            tabBarLabelStyle: { fontSize: 12, fontWeight: "600", marginTop: -5, }
        }}
    >
        <Tab.Screen name="Movies" component={Movies} options={{
            tabBarIcon : ({ focused, color, size }) => {
                return <Ionicons name={focused ? "film" : "film-outline"} size={size} color={color} />
            }
        }} />
        <Tab.Screen name="TV" component={Tv} options={{
            tabBarIcon : ({ focused, color, size }) => {
                return <Ionicons name={focused ? "tv" : "tv-outline"} size={size} color={color} />
            }
        }} />
        <Tab.Screen name="Search" component={Search} options={{
            tabBarIcon : ({ focused, color, size }) => {
                return <Ionicons name={focused ? "search" : "search-outline"} size={size} color={color} />
            }
        }} />
    </Tab.Navigator>
    )
};

export default Tabs;