import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import selectChatScreen from "../../screens/chatScreens/selectChatScreen";
import mainChatScreen from "../../screens/chatScreens/mainChatScreen";

export default function ChatStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="SelectChat" component={selectChatScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="MainChatScreen" component={mainChatScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}