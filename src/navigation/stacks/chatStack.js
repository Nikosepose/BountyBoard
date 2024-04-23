import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import mainChatScreen from "../../screens/chatScreens/mainChatScreen";

export default function ChatStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={mainChatScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}