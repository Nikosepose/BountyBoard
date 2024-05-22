import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainProfileScreen from '../../components/profile/mainProfileScreen.js';

export default function ProfileStack({ user, onLogout }) {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main">
                {props => <MainProfileScreen {...props} user={user} onLogout={onLogout} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}