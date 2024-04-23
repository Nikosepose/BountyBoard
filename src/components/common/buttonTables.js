import React from 'react';
import { View, Text, TouchableOpacity, Button, FlatList, StyleSheet, SafeAreaView } from 'react-native';

const BoardList = ({ boards, onItemPress, isBountyHunter, toggleBountyHunter }) => {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={boards}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => onItemPress(item)}
                    >
                        <Text style={styles.title}>{item.sector}</Text>
                    </TouchableOpacity>
                )}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title={isBountyHunter ? "BountyPoster" : "BountyHunter"}
                    onPress={toggleBountyHunter}
                />
            </View>
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
    title: {
        fontSize: 18,
    },
    buttonContainer: {
        padding: 20,
    },
});

export default BoardList;