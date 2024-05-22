import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ListView from "../../components/board/listView";

export default function BoardStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ListView" component={ListView} />
        </Stack.Navigator>
    );
}