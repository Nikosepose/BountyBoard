import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

const MainChatScreen = () => {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, type: 'received', text: 'Hello! How can I help you today?' },
        { id: 2, type: 'sent', text: 'I need help with an issue.' },
        // Add more messages as needed for demo
    ]);

    const sendMessage = () => {
        if (text) {
            setMessages([...messages, { id: messages.length + 1, type: 'sent', text }]);
            setText('');
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
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
                <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
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

export default MainChatScreen;
