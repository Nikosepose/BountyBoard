import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from '../../components/auth/AuthScreen';

export default function AuthStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}