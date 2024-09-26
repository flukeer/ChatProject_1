import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // เพิ่มการ import
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
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  // ฟังก์ชันในการโหลดข้อความจาก AsyncStorage
  const loadMessages = async () => {
    try {
      const storedMessages = await AsyncStorage.getItem(`chat_${chatId}`);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        setMessages(initialMessages[chatId] || []); // ถ้าไม่มีข้อมูลใน AsyncStorage ให้ใช้ข้อความเริ่มต้น
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  // ฟังก์ชันในการบันทึกข้อความลงใน AsyncStorage
  const saveMessages = async (newMessages) => {
    try {
      await AsyncStorage.setItem(`chat_${chatId}`, JSON.stringify(newMessages));
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  };

  

  useEffect(() => {
    loadMessages(); // โหลดข้อความเมื่อหน้าจอนี้ถูกเปิดครั้งแรก
  }, []);

  const sendMessage = () => {
    if (message.trim() === '') return;
    const newMessage = { id: (messages.length + 1).toString(), text: message, sender: 'me' };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setMessage('');
    saveMessages(updatedMessages); // บันทึกข้อความทั้งหมดลงใน AsyncStorage
    
    // บันทึกข้อความล่าสุดลงใน AsyncStorage เพื่อให้ ChatListScreen ใช้งานได้
    AsyncStorage.setItem(`lastMessage_${chatId}`, message);
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
