import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import ChatContent from './chatContent';
import DetailsContent from './detailsContent';
import FilesContent from './filesContent';
import SolutionContent from './solutionContent';

const TaskSelect = () => {
    const [selectedTab, setSelectedTab] = useState('chat');
    const route = useRoute();
    const { task } = route.params;
    const navigation = useNavigation();

    const renderContent = () => {
        switch (selectedTab) {
            case 'chat':
                return <ChatContent task={task} />;
            case 'details':
                return <DetailsContent task={task} />;
            case 'files':
                return <FilesContent task={task}/>;
            case 'solution':
                return <SolutionContent task={task}/>;
            default:
                return null;
        }
    };

    const handleSwitchTask = () => {
        navigation.navigate('Main');  // Navigate back to the main screen
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.taskTitle}>{task.Title}</Text>
                <TouchableOpacity style={styles.dropdown} onPress={handleSwitchTask}>
                    <Text style={styles.dropdownText}>Switch Task</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.navBar}>
                {['chat', 'details', 'files', 'solution'].map(tab => (
                    <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)} style={styles.navItem}>
                        <Ionicons name={tab === 'chat' ? 'chatbubbles' : tab === 'details' ? 'information-circle' : tab === 'files' ? 'document' : 'bulb'} size={24} color={selectedTab === tab ? '#6200ea' : '#000'} />
                        <Text style={[styles.navText, { color: selectedTab === tab ? '#6200ea' : '#000' }]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.content}>
                {renderContent()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 15,
        backgroundColor: '#6200ea',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    taskTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    dropdown: {
        padding: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    dropdownText: {
        color: '#6200ea',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#eee',
        paddingVertical: 10,
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        marginTop: 5,
        fontSize: 12,
    },
    content: {
        flex: 1,
    },
});

export default TaskSelect;
