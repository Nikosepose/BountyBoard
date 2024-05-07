import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainProfileScreen from '../../screens/profileScreens/mainProfileScreen.js';
import MapStack from "../stacks/mapStack";
import { Ionicons } from '@expo/vector-icons';
import HeaderButtons from "../../components/common/headerButtons";
import LeaderboardStack from "../stacks/leaderboardStack";
import ChatStack from "../stacks/chatStack";
import ProfileStack from "../stacks/profileStack";
import SettingsStack from "../stacks/settingsStack";


export default function MyTabs() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Leaderboard') {
                        iconName = focused ? 'trophy' : 'trophy-outline';
                    } else if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Chat') {
                        iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person-circle' : 'person-circle-outline';
                    } else {
                        return null;
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerRight: () => <HeaderButtons navigation={navigation} />
            })}
        >
            <Tab.Screen name="Leaderboard" component={LeaderboardStack} />
            <Tab.Screen name="Home" component={MapStack} />
            <Tab.Screen name="Chat" component={ChatStack} />
            <Tab.Screen name="Profile" component={ProfileStack} />
            <Tab.Screen
                name="Settings"
                component={SettingsStack}
                options={{ tabBarButton: () => null }}  // This hides the tab bar button
            />
        </Tab.Navigator>
    );
}
