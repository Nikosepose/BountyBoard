import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainProfileScreen from '../../components/profile/mainProfileScreen.js';
import BoardStack from "../stacks/boardStack";
import { Ionicons } from '@expo/vector-icons';
import HeaderButtons from "./headerButtons";
import LeaderboardStack from "../stacks/leaderboardStack";
import ProfileStack from "../stacks/profileStack";
import SettingsStack from "../stacks/settingsStack";
import MyTasksStack from "../stacks/myTasksStack";


export default function MyTabs({ user, onLogout }) {
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
                    } else if (route.name === 'MyTasks') {
                        iconName = focused ? 'clipboard' : 'clipboard-outline';
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
            <Tab.Screen name="Home" component={BoardStack} />
            <Tab.Screen name="MyTasks" component={MyTasksStack} />
            <Tab.Screen name="Profile">
                {props => <ProfileStack {...props} user={user} onLogout={onLogout} />}
            </Tab.Screen>
            <Tab.Screen
                name="Settings"
                component={SettingsStack}
                options={{ tabBarButton: () => null }}  // This hides the tab bar button
            />
        </Tab.Navigator>
    );
}