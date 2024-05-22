import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainSettingsScreen from '../../components/settings/mainSettingsScreen.js';

export default function SettingsStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={MainSettingsScreen} />
        </Stack.Navigator>
    );
}