// settingsStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainSettingsScreen from '../../components/settings/mainSettingsScreen';
import NotificationSettingsScreen from '../../components/settings/NotificationSettingsScreen';

const Stack = createStackNavigator();

export default function SettingsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={MainSettingsScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Notifications" component={NotificationSettingsScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}
