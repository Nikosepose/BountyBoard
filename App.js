import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import MyTabs from "./src2/navigation/tabs/myTabs";
import AuthStack from "./src2/navigation/stacks/authStack";
import { auth } from './src2/firebase/firebaseConfig';

export default function App() {
    const Stack = createStackNavigator();
    const [user, setUser] = useState(null); // State to keep track of user's authentication status

    useEffect(() => {
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

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Logout Failed", error.message);
        }
    };

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {
                    user ? (
                        // If the user is logged in, go directly to the main bottomTabs
                        <Stack.Screen name="Main">
                            {props => <MyTabs {...props} user={user} onLogout={handleLogout} />}
                        </Stack.Screen>
                    ) : (
                        // If not logged in, show the authentication stack
                        <Stack.Screen name="Authentication" component={AuthStack} options={{ headerShown: false }} />
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}