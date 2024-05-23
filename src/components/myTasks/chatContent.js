import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { sendMessage, subscribeToMessages } from '../../firebase/chat'

const ChatContent = ({ task }) => {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSendMessage = async () => {
        if (text) {
            try {
                const newMessage = await sendMessage(text, task.Assignee, task.CreatedBy, task.BoardID, task.CourseID, task.id);
                setMessages(prevMessages => [...prevMessages, newMessage]);
                setText('');
            } catch (error) {
                console.error("Error sending message: ", error);
            }
        }
    };

    useLayoutEffect(() => {
        const unsubscribe = subscribeToMessages(task.Assignee, task.CreatedBy, setMessages, task.BoardID, task.CourseID, task.id);
        return () => unsubscribe();
    }, [task.Assignee]);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} keyboardVerticalOffset={Platform.OS === "ios" ? 85 : 0}>
            <ScrollView style={styles.messagesContainer}>
                {messages.map((msg) => (
                    <View key={msg.id} style={msg.type === 'sent' ? styles.sentMessage : styles.receivedMessage}>
                        <Text style={styles.messageText}>{msg.text}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={setText}
                    placeholder="Type a message..."
                />
                <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    messagesContainer: {
        flex: 1,
        padding: 10,
    },
    sentMessage: {
        alignSelf: 'flex-end',
        marginRight: 10,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#dcf8c6',
        borderRadius: 20,
        maxWidth: '80%',
    },
    receivedMessage: {
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        maxWidth: '80%',
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    input: {
        flex: 1,
        padding: 10,
        backgroundColor: '#ffffff',
        marginRight: 10,
        borderRadius: 20,
    },
    sendButton: {
        backgroundColor: '#007bff',
        borderRadius: 20,
        padding: 10,
    },
    sendButtonText: {
        color: '#ffffff',
        fontSize: 16,
    },
});

export default ChatContent;
