import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SolutionContent = () => (
    <View style={styles.container}>
        <Text style={styles.text}>Solution Content</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 16,
    },
});

export default SolutionContent;