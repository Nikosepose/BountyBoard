import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createStackNavigator } from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import MyTabs from "./src/navigation/tabs/myTabs";
import AuthStack from "./src/navigation/stacks/AuthStack";

export default function App() {
    const Stack = createStackNavigator();
    const [user, setUser] = useState(null); // State to keep track of user's authentication status

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUser(user);
            } else {
                // User is signed out
                setUser(null);
            }
        });

        // Cleanup subscription on unmount
        return unsubscribe;
    }, []);
  return (
      <NavigationContainer>
          <Stack.Navigator>
              {
                  user ? (
                      // If the user is logged in, go directly to the main tabs
                      <Stack.Screen name="Main" component={MyTabs} options={{ headerShown: false }} />
                  ) : (
                      // If not logged in, show the authentication stack
                      <Stack.Screen name="Authentication" component={AuthStack} options={{ headerShown: false }} />
                  )
              }
          </Stack.Navigator>
      </NavigationContainer>
  );
}