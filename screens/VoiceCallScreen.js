import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const VoiceCallScreen = ({ route, navigation }) => {
  const { contact } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{contact.name}</Text>
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => { /* เพิ่มฟังก์ชันการปิดเสียง */ }}>
          <Icon name="microphone-slash" type="font-awesome" size={30} color="#007AFF" />
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
