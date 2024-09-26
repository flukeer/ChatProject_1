import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const chats = [
  { id: '1', name: 'Arune', message: 'Whats up?', time: '13:23', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: '2', name: 'Kearttisak', message: 'Good to from you', time: '12:43', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: '3', name: 'Putipong', message: 'All is well, thanks', time: '09:50', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: '4', name: 'Walailak', message: 'Nice to meet', time: '20:22', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
  // เพิ่มรายชื่อผู้ใช้แบบสุ่มเพิ่มเติม
  { id: '5', name: 'Siriwan', message: 'เห็นภาพนี้ยัง?', time: '10:15', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
  { id: '6', name: 'Kritsada', message: 'ขอบคุณมากนะ!', time: '11:30', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' },
  { id: '7', name: 'Chanika', message: 'คิดถึงจัง', time: '08:45', avatar: 'https://randomuser.me/api/portraits/women/7.jpg' },
  { id: '8', name: 'Nattapong', message: 'ได้ไปดูหนังมั้ย?', time: '12:00', avatar: 'https://randomuser.me/api/portraits/men/8.jpg' },
  { id: '9', name: 'Parichat', message: 'เดี๋ยวไปเจอกัน', time: '14:50', avatar: 'https://randomuser.me/api/portraits/women/9.jpg' },
  { id: '10', name: 'Thanawat', message: 'พรุ่งนี้ว่างมั้ย?', time: '16:10', avatar: 'https://randomuser.me/api/portraits/men/10.jpg' },
  { id: '11', name: 'Kanchana', message: 'เพิ่งกลับจากเที่ยว', time: '18:30', avatar: 'https://randomuser.me/api/portraits/women/11.jpg' },
  { id: '12', name: 'Apichai', message: 'สวัสดีตอนเช้า', time: '07:15', avatar: 'https://randomuser.me/api/portraits/men/12.jpg' },
  { id: '13', name: 'Sureeporn', message: 'พร้อมแล้ว!', time: '19:45', avatar: 'https://randomuser.me/api/portraits/women/13.jpg' },
  { id: '14', name: 'Sarawut', message: 'คิดถึงทุกคน', time: '20:05', avatar: 'https://randomuser.me/api/portraits/men/14.jpg' },
  { id: '15', name: 'Panita', message: 'ได้รับข้อความแล้ว', time: '21:20', avatar: 'https://randomuser.me/api/portraits/women/15.jpg' },
  { id: '16', name: 'Wichai', message: 'เจอกันพรุ่งนี้', time: '22:10', avatar: 'https://randomuser.me/api/portraits/men/16.jpg' },
  { id: '17', name: 'Sukanya', message: 'มีเรื่องจะเล่าให้ฟัง', time: '23:05', avatar: 'https://randomuser.me/api/portraits/women/17.jpg' },
  { id: '18', name: 'Anusorn', message: 'ตกลงยังไง?', time: '08:30', avatar: 'https://randomuser.me/api/portraits/men/18.jpg' },
  { id: '19', name: 'Pimchanok', message: 'อยากไปเที่ยวทะเล', time: '09:45', avatar: 'https://randomuser.me/api/portraits/women/19.jpg' },
  { id: '20', name: 'Chakrit', message: 'คืนนี้มีเวลาให้มั้ย?', time: '17:30', avatar: 'https://randomuser.me/api/portraits/men/20.jpg' },
];

const ChatListScreen = ({ navigation }) => {
  const [chatList, setChatList] = useState(chats);

  // ฟังก์ชันในการโหลดข้อความล่าสุดจาก AsyncStorage
  const loadLastMessages = async () => {
    const updatedChats = await Promise.all(
      chats.map(async chat => {
        const lastMessage = await AsyncStorage.getItem(`lastMessage_${chat.id}`);
        return {
          ...chat,
          message: lastMessage || chat.message, // ถ้าไม่มีข้อความล่าสุดก็ใช้ข้อความเริ่มต้น
        };
      })
    );
    setChatList(updatedChats);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadLastMessages(); // โหลดข้อความล่าสุดทุกครั้งที่กลับมาที่หน้านี้
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={chatList}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.chatContainer} 
            onPress={() => navigation.navigate('Chat', { name: item.name, chatId: item.id, contact: item })}
          >
            <Avatar
              rounded
              size="medium"
              source={{ uri: item.avatar }}
            />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.message}>{item.message}</Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: '#555',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
});

export default ChatListScreen;
