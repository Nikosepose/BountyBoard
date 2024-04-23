import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../../screens/profile/profileScreen.js';

export default function ProfileStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={ProfileScreen} />
        </Stack.Navigator>
    );
}