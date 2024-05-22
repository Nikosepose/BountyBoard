import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LeaderBoardMainScreen from "../../components/leaderboard/mainLeaderBoardScreen";

export default function LeaderboardStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={LeaderBoardMainScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}