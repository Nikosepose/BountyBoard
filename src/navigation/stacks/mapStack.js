import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MapMain from '../../screens/mapScreens/mapMain';
import MapView from "../../screens/mapScreens/mapView";
import ListView from "../../screens/mapScreens/listView";

export default function MapStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={MapMain} />
            <Stack.Screen name="MapView" component={MapView} />
            <Stack.Screen name="ListView" component={ListView} />
            <Stack.Screen name="ListViewSub" component={ListView} />
        </Stack.Navigator>
    );
}