import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const initialMessages = {
  '1': [
    { id: '1', text: 'Hey Arune!', sender: 'me' },
    { id: '2', text: 'What\'s up?', sender: 'other' },
  ],
  '2': [
    { id: '1', text: 'Hello Kearttisak!', sender: 'me' },
    { id: '2', text: 'Good to hear from you.', sender: 'other' },
  ],
  '3': [
    { id: '1', text: 'Putipong, how are you?', sender: 'me' },
    { id: '2', text: 'All is well, thanks!', sender: 'other' },
  ],
  '4': [
    { id: '1', text: 'Hi Walailak!', sender: 'me' },
    { id: '2', text: 'Nice to meet you.', sender: 'other' },
  ],
};

const ChatScreen = ({ route, navigation }) => {
  const { chatId, contact } = route.params;
  const [messages, setMessages] = useState(initialMessages[chatId]);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim() === '') return; // ไม่ส่งข้อความว่าง
    setMessages(prevMessages => [
      ...prevMessages,
      { id: (prevMessages.length + 1).toString(), text: message, sender: 'me' },
    ]);
    setMessage('');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: contact?.name || 'Chat',
      headerRight: () => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 80, marginRight: 10 }}>
          <Icon
            name="phone"
            type="font-awesome"
            color="#007AFF"
            onPress={() => navigation.navigate('VoiceCall', { contact })}
          />
          <Icon
            name="video-camera"
            type="font-awesome"
            color="#007AFF"
            onPress={() => navigation.navigate('VideoCall', { contact })}
          />
        </View>
      ),
    });
  }, [navigation, contact]);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
            <Text style={styles.message}>{item.text}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={sendMessage}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  message: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default ChatScreen;
