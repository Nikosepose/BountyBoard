import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BoardSelectionScreen from '../../components/board/BoardSelectionScreen';
import CourseSelectionScreen from '../../components/board/CourseSelectionScreen';
import TaskScreen from '../../components/board/TaskScreen';

const Stack = createStackNavigator();

export default function BoardStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BoardSelection" component={BoardSelectionScreen} />
            <Stack.Screen name="CourseSelection" component={CourseSelectionScreen} />
            <Stack.Screen name="TaskScreen" component={TaskScreen} />
        </Stack.Navigator>
    );
}
