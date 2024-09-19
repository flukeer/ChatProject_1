import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const VideoCallScreen = ({ route, navigation }) => {
  const { contact } = route.params;
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  const toggleVideo = () => {
    setIsVideoOn(prevState => !prevState);
    // เรียกใช้ API หรือฟังก์ชันที่เกี่ยวข้องในการปิดวิดีโอ
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
      <View style={styles.videoContainer}>
        {/* ในกรณีที่ใช้ video stream ให้แสดงผลใน container นี้ */}
        {isVideoOn ? (
          <Text style={{ color: '#fff' }}>Video Stream</Text>
        ) : (
          <Text style={{ color: '#fff' }}>Video is off</Text>
        )}
      </View>
      <Text style={styles.name}>{contact.name}</Text>
      <View style={styles.controls}>
        <TouchableOpacity onPress={toggleVideo}>
          <Icon
            name={isVideoOn ? "video-camera" : "video-camera-slash"}
            type="font-awesome"
            size={30}
            color={isVideoOn ? "#007AFF" : "red"}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 20,
  },
  videoContainer: {
    width: '90%',
    height: '70%',
    backgroundColor: '#333',
    borderRadius: 10,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
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

export default VideoCallScreen;    