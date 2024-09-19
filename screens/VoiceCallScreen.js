import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const VoiceCallScreen = ({ route, navigation }) => {
  const { contact } = route.params;
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  const toggleMute = () => {
    setIsMuted(prevState => !prevState);
    // เรียกใช้ API หรือฟังก์ชันที่เกี่ยวข้องในการปิดเสียง
  };

  const endCall = () => {
    // เรียกใช้ API หรือฟังก์ชันที่เกี่ยวข้องในการหยุดสาย
    navigation.goBack(); // กลับไปที่หน้าก่อนหน้า
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(prevState => !prevState);
    // เรียกใช้ API หรือฟังก์ชันที่เกี่ยวข้องในการเปิดลำโพง
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{contact.name}</Text>
      <View style={styles.controls}>
        <TouchableOpacity onPress={toggleMute}>
          <Icon
            name={isMuted ? "microphone-slash" : "microphone"}
            type="font-awesome"
            size={30}
            color={isMuted ? "red" : "#007AFF"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={endCall}>
          <Icon name="phone" type="font-awesome" size={40} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleSpeaker}>
          <Icon
            name="volume-up"
            type="font-awesome"
            size={30}
            color={isSpeakerOn ? "green" : "#007AFF"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  name: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
});

export default VoiceCallScreen;
