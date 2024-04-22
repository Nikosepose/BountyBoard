import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsScreen from '../../screens/settings/settingsScreen.js';

export default function SettingsStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={SettingsScreen} />
        </Stack.Navigator>
    );
}