// screens/ChatScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { firestore } from '../firebase';
import firebase from 'firebase/app';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const unsubscribe = firestore.collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(messages);
      });

    return () => unsubscribe();
  }, []);

  const sendMessage = () => {
    firestore.collection('messages').add({
      text: message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Text>{item.text}</Text>}
        keyExtractor={item => item.id}
      />
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
});

export default ChatScreen;
