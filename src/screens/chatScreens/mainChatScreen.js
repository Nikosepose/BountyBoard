import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView,  Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { collection, addDoc, orderBy, query, onSnapshot, where } from "@firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";


const MainChatScreen = () => {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    const route = useRoute();
    const { selectedUserId } = route.params;

    const sendMessage = async () => {
        console.log('sending message', text);
        if (text) {
            const newMessage = {
                id: messages.length + 1,
                type: 'sent',
                text: text,
                createdAt: new Date(),
                user: {
                    _id: auth?.currentUser?.uid,
                    name: auth?.currentUser?.displayName || "Fer",
                },
                receivedUser: {
                    _id: selectedUserId
                }
            };
            try {
                await addDoc(collection(db, 'chats'), {
                    ...newMessage,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                });

                setMessages(prevMessages =>[...prevMessages, newMessage]);
                setText('');
            } catch (error) {
                console.error("Error writing document: ", error);
            }
        }
    };

    useLayoutEffect(() => {
        if (!auth.currentUser) {
            console.log("Something went wrong");
            return;
        }

        const collectionRef = collection(db, 'chats');
        const q = query(collectionRef,
            where('user._id', '==', auth.currentUser.uid),
            where('receivedUser._id', '==', selectedUserId),
            orderBy('createdAt', 'asc')
        );

        const unsubscribe = onSnapshot(q, snapshot => {
            console.log("Snapshot doc count: ", snapshot.docs.length);
            const loadedMessages = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
                type: doc.data().user._id === auth.currentUser?.uid ? 'sent' : 'received',
            }));
            setMessages(loadedMessages);
            console.log("Message loaded: ", loadedMessages);
        }, error => {
            console.error("Failed to fetch chat: ", error);
        });
        return () => unsubscribe();
    }, [auth.currentUser, selectedUserId]);




    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container } keyboardVerticalOffset={Platform.OS === "ios" ? 85 : 0}>
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
