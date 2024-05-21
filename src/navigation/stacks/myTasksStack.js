import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyTasksMain from "../../screens/MyTasksScreens/myTasksMain";
import TaskSelect from "../../screens/MyTasksScreens/myTasksSelect";


export default function MyTasksStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={MyTasksMain} />
            <Stack.Screen name="TaskSelect" component={TaskSelect} />
        </Stack.Navigator>
    );
}