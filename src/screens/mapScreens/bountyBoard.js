import React, { useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, Alert, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const BountyBoard = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { boardId, courses } = route.params;  // Destructure to get courses directly

    const [isBountyHunter, setIsBountyHunter] = useState(false);
    const toggleBountyHunterMode = () => setIsBountyHunter(!isBountyHunter);
    const [ActiveCourses, setActiveCourses] = useState(courses);  // Initialize with courses passed in

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={ActiveCourses}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => Alert.alert("Course Info", `ID: ${item.id}, Title: ${item.title}`)}
                    >
                        <Text style={styles.title}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />
            {isBountyHunter ? (
                <View style={styles.buttonContainer}>
                    <Button title="BountyPoster" onPress={toggleBountyHunterMode} />
                </View>
            ) : (
                <View style={styles.buttonContainer}>
                    <Button title="BountyHunter" onPress={toggleBountyHunterMode} />
                </View>
            )}
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    content: {
        flex: 1,
        justifyContent: 'top',
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
    buttonContainer: {
        padding: 20,
    },
});

export default BountyBoard;