// components/settings/MainSettingsScreen.js
import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const MainSettingsScreen = ({ navigation }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Settings</Text>

            <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('Notifications')}>
                <Text style={styles.settingText}>Notification Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('PrivacyPolicy')}>
                <Text style={styles.settingText}>Privacy Policy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('About')}>
                <Text style={styles.settingText}>About</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    settingText: {
        fontSize: 18,
    },
});

export default MainSettingsScreen;
