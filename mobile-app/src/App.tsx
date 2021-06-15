import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  initiateSocket,
  subscribeToChat,
  disconnectSocket,
  sendMessage,
} from './helpers/socket.io';

import { Message } from './types/socket.io/types';

const App: React.FC = () => {
  const [messageInputValue, setMessageInputValue] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  useEffect(() => {
    initiateSocket();
    subscribeToChat((error: Error | null, newChatMessage: Message) => {
      console.log('error is ', error);
      if (error) {
        return;
      }
      setChatMessages((previousChatMessages: Message[]) => [
        ...previousChatMessages,
        newChatMessage,
      ]);
    });
    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Chat:</Text>
      <TextInput
        value={messageInputValue}
        onChangeText={(inputValue) => setMessageInputValue(inputValue)}
      />
      <TouchableWithoutFeedback
        onPress={() => {
          sendMessage(messageInputValue);
          setMessageInputValue('');
        }}
      >
        <Text>Send</Text>
      </TouchableWithoutFeedback>
      <View style={styles.textContainer}>
        {chatMessages.map((message) => (
          <Text key={`${message}_${Date.now()}`}>{message}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
  },
  textContainer: {
    marginTop: 12,
  },
});

export default App;
