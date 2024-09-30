import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera'; // ตรวจสอบการอิมพอร์ต Camera
import { Icon } from 'react-native-elements';

const VideoCallScreen = ({ route, navigation }) => {
  const { contact } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front); // ตรวจสอบว่าใช้ Camera.Constants.Type ถูกต้อง

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const toggleVideo = () => {
    setIsVideoOn(prevState => !prevState);
    // เรียกใช้ฟังก์ชันปิดหรือเปิดวิดีโอ
  };

  const endCall = () => {
    // เรียกใช้ฟังก์ชันหยุดสาย
    navigation.goBack();
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        {isVideoOn ? (
          <Camera
            style={styles.camera}
            type={type} // กำหนดชนิดของกล้อง (กล้องหน้า/หลัง)
            ref={ref => {
              setCameraRef(ref);
            }}
          />
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
  camera: {
    flex: 1,
    width: '100%',
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
