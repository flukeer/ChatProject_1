import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const VideoCallScreen = ({ route, navigation }) => {
  const { contact } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        {/* เพิ่มหน้าจอวิดีโอ */}
      </View>
      <Text style={styles.name}>{contact.name}</Text>
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => { /* เพิ่มฟังก์ชันการปิดวิดีโอ */ }}>
          <Icon name="video-camera" type="font-awesome" size={30} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { /* เพิ่มฟังก์ชันการหยุดสาย */ }}>
          <Icon name="phone" type="font-awesome" size={40} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { /* เพิ่มฟังก์ชันการเปิดลำโพง */ }}>
          <Icon name="volume-up" type="font-awesome" size={30} color="#007AFF" />
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
