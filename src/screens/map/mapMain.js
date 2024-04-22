import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const MapMain = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate('MapView')}
            >
                <Text style={styles.title}>Map View</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate('ListView')}
            >
                <Text style={styles.title}>List view</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    title: {
        fontSize: 18,
    },
    button: {
        position: 'bottom'
    },
    delete: {
        fontSize: 18,
        color: 'red'
    }
});

export default MapMain;