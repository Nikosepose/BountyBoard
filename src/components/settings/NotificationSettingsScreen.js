// components/settings/NotificationSettingsScreen.js
import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import data from '../../data/data.json';

const NotificationSettingsScreen = () => {
    const navigation = useNavigation();
    const [chatEnabled, setChatEnabled] = useState(false);
    const [taskEnabled, setTaskEnabled] = useState(false);
    const [boardSubscriptions, setBoardSubscriptions] = useState({});
    const [courseSubscriptions, setCourseSubscriptions] = useState({});

    const toggleChat = () => setChatEnabled(!chatEnabled);
    const toggleTask = () => setTaskEnabled(!taskEnabled);
    const toggleBoardSubscription = (boardId) => {
        setBoardSubscriptions(prev => ({
            ...prev,
            [boardId]: !prev[boardId]
        }));
    };
    const toggleCourseSubscription = (courseId) => {
        setCourseSubscriptions(prev => ({
            ...prev,
            [courseId]: !prev[courseId]
        }));
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Notification Settings</Text>

            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Enable Chat Notifications</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={chatEnabled ? "#f5dd4b" : "#f4f3f4"}
                    onValueChange={toggleChat}
                    value={chatEnabled}
                />
            </View>

            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Enable Task Notifications</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={taskEnabled ? "#f5dd4b" : "#f4f3f4"}
                    onValueChange={toggleTask}
                    value={taskEnabled}
                />
            </View>

            <Text style={styles.subTitle}>Boards and Courses</Text>
            {data.boards.map(board => (
                <View key={board.id} style={styles.boardContainer}>
                    <View style={styles.settingItem}>
                        <Text style={styles.settingText}>{board.name}</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={boardSubscriptions[board.id] ? "#f5dd4b" : "#f4f3f4"}
                            onValueChange={() => toggleBoardSubscription(board.id)}
                            value={boardSubscriptions[board.id] || false}
                        />
                    </View>
                    {board.courses.map(course => (
                        <View key={course.id} style={[styles.settingItem, styles.courseItem, !boardSubscriptions[board.id] && styles.disabledItem]}>
                            <Text style={styles.settingText}>{course.title}</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={courseSubscriptions[course.id] ? "#f5dd4b" : "#f4f3f4"}
                                onValueChange={() => toggleCourseSubscription(course.id)}
                                value={courseSubscriptions[course.id] || false}
                                disabled={!boardSubscriptions[board.id]}
                            />
                        </View>
                    ))}
                </View>
            ))}
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
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 20,
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
    boardContainer: {
        marginVertical: 10,
    },
    courseItem: {
        paddingLeft: 40,
    },
    disabledItem: {
        opacity: 0.5,
    },
});

export default NotificationSettingsScreen;
