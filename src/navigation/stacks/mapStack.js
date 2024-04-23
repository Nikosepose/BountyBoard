import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MapMain from '../../screens/map/mapMain';
import MapView from "../../screens/map/mapView";
import ListView from "../../screens/map/listView";

export default function MapStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={MapMain} />
            <Stack.Screen name="MapView" component={MapView} />
            <Stack.Screen name="ListView" component={ListView} />
        </Stack.Navigator>
    );
}