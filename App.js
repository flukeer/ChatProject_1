import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatListScreen from './screens/ChatListScreen';
import ChatScreen from './screens/ChatScreen';
import VoiceCallScreen from './screens/VoiceCallScreen';
import VideoCallScreen from './screens/VideoCallScreen';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ChatList" component={ChatListScreen} options={{ headerTitle: 'แชท' }} />
        <Stack.Screen 
          name="Chat" 
          component={ChatScreen} 
          options={({ route }) => ({ title: route.params.name })} 
        />
        <Stack.Screen name="VoiceCall" component={VoiceCallScreen} />
        <Stack.Screen name="VideoCall" component={VideoCallScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return <AppNavigator />;
} 