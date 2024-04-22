import React, { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function ProfileScreen() {
    const navigation = useNavigation();

    // Mock student data
    const [students, setStudents] = useState([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'William Johnson' },
    ]);

    useFocusEffect(
        useCallback(() => {
            // This is where you might fetch or update data when the screen is focused
            // For demonstration, we're not changing the data
        }, [])
    );

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
                data={students}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => alert(`${item.name}'s profile!`)}>
                        <Text style={styles.title}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
            <Button
                title="Edit Profile"
                onPress={() => navigation.navigate('EditProfileScreen')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        width: '100%', // Ensure touchable area is wide
    },
    title: {
        fontSize: 18,
    },
});

export default ProfileScreen;
