import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const messages = {
  Mom: [
    "Thanks for always being there.",
    "I love your warmth and care.",
    "Your support means everything.",
  ],
  Dad: [
    "Your strength inspires me.",
    "Thank you for teaching me resilience.",
    "I appreciate all your sacrifices.",
  ],
  Sister: [
    "You're my forever best friend.",
    "Thanks for all the childhood memories.",
    "You always understand me without words.",
  ],
  Bhavya: [
    "Thanks for being a reliable housemate.",
    "You make home feel more comfortable.",
    "Appreciate all the shared moments and jokes.",
  ],
  Juhil: [
    "Group studies hit different with you!",
    "Thanks for always helping in class.",
    "You make tough days lighter.",
  ],
  Pinal: [
    "You're not just a classmate, but a friend.",
    "Thanks for always having my back during assignments.",
    "Class wouldn’t be the same without you.",
  ],
  Yash: [
    "Work’s a lot better with you around.",
    "Thanks for making stressful days fun.",
    "Appreciate your constant motivation at work.",
  ],
};

export default function MessageScreen({ route }) {
  const { category } = route.params;
  const selectedMessages = messages[category] || ['No messages available.'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category}'s Messages</Text>
      <FlatList
        data={selectedMessages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageBox}>
            <Text style={styles.message}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  messageBox: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
  },
  message: {
    fontSize: 16,
    lineHeight: 22,
  },
});