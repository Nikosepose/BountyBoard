import React, { useState, useCallback, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert , FlatList, TouchableOpacity} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { fetchBountyBoards }  from '../../../functions/firebase/firestoreDB';

const ListView = () => {
    const navigation = useNavigation();

    const [isBountyHunter, setIsBountyHunter] = useState(false);
    const toggleBountyHunterMode = () => setIsBountyHunter(!isBountyHunter);
    const [ActiveBoards, setActiveBoards] = useState([]);

    const getBountyBoards = async ( ) => {
        try {
            const activeBoardsArray = await fetchBountyBoards();
            setActiveBoards(activeBoardsArray);
        } catch (error) {
            console.error("Error fetching active boards: ", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            getBountyBoards();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={ActiveBoards}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => navigation.navigate('EditGradePoints', { AttendingStudent: item })}
                    >
                        <Text style={styles.title}>{item.sector}</Text>
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

export default ListView;