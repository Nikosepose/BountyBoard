import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";
import { useNavigation } from "@react-navigation/native";


const SelectChatScreen = () => {
    const screenNavigation = useNavigation();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchUsers = async () => {
        try {
            const collectionRef = collection(db, 'users');
            const usersSnapshot = await getDocs(collectionRef);
            const usersData = usersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsers(usersData);
        } catch (error) {
            console.error("Error fetching users: ", error);
        } finally {
            setLoading(false);
        }
        };
        fetchUsers();
    }, [auth.currentUser]);






    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => screenNavigation.navigate('MainChatScreen', { selectedUserId: item.id })}>
                        <Text style={{padding: 20, fontSize: 20}}>{item.email}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>

    );
}

export default SelectChatScreen;

