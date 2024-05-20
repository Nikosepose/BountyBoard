import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyTasksMain from "../../screens/MyTasksScreens/myTasksMain";


export default function MyTasksStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={MyTasksMain} />
        </Stack.Navigator>
    );
}