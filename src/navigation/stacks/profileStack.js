import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainProfileScreen from '../../screens/profileScreens/mainProfileScreen.js';

export default function ProfileStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={MainProfileScreen} />
        </Stack.Navigator>
    );
}