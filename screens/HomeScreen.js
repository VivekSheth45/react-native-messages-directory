import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList,
  Modal, Pressable, Alert, TextInput, Switch
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const initialCategories = [
  { title: 'Mom', emoji: '👩‍🦳' },
  { title: 'Dad', emoji: '👨‍🦳' },
  { title: 'Sister', emoji: '👧' },
  { title: 'Bhavya', emoji: '🏡' },
  { title: 'Juhil', emoji: '👨‍🎓' },
  { title: 'Pinal', emoji: '👩‍🎓' },
  { title: 'Yash', emoji: '💼' },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState(initialCategories);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isRename, setIsRename] = useState(false);
  const [renameText, setRenameText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const themeStyles = darkMode ? dark : light;

  const handleRename = () => {
    setCategories(prev =>
      prev.map(item =>
        item.title === selectedCategory ? { ...item, title: renameText || item.title } : item
      )
    );
    setModalVisible(false);
    setIsRename(false);
    setRenameText('');
  };

  const handleDelete = () => {
    setCategories(prev => prev.filter(item => item.title !== selectedCategory));
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, themeStyles.container]}>
      <View style={styles.header}>
        <Text style={[styles.title, themeStyles.title]}>Messenger</Text>
        <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.title}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.circle, themeStyles.circle]}
            onPress={() => navigation.navigate('Message', { category: item.title })}
            onLongPress={() => {
              setSelectedCategory(item.title);
              setModalVisible(true);
            }}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={[styles.circleText, themeStyles.text]}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => {
          setModalVisible(false);
          setIsRename(false);
          setRenameText('');
        }}
      >
        <View style={styles.modalBackground}>
          <View style={[styles.modalContainer, themeStyles.modal]}>
            {isRename ? (
              <>
                <Text style={styles.modalTitle}>Rename</Text>
                <TextInput
                  style={styles.input}
                  value={renameText}
                  placeholder="Enter new name"
                  onChangeText={setRenameText}
                />
                <Pressable style={styles.modalButton} onPress={handleRename}>
                  <Text style={styles.modalButtonText}>SAVE</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>Options</Text>
                <Pressable style={styles.modalButton} onPress={() => {
                  setIsRename(true);
                  setRenameText(selectedCategory);
                }}>
                  <Text style={styles.modalButtonText}>RENAME</Text>
                </Pressable>
                <Pressable style={styles.modalButton} onPress={handleDelete}>
                  <Text style={styles.modalButtonText}>DELETE</Text>
                </Pressable>
                <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
                  <Text style={[styles.modalButtonText, { color: 'red' }]}>CANCEL</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const light = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
  title: {
    color: '#000',
  },
  text: {
    color: '#fff',
  },
  circle: {
    backgroundColor: '#87ceeb',
  },
  modal: {
    backgroundColor: '#fff',
  },
});

const dark = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
  },
  title: {
    color: '#fff',
  },
  text: {
    color: '#fff',
  },
  circle: {
    backgroundColor: '#1e1e1e',
  },
  modal: {
    backgroundColor: '#333',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  grid: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  circleText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  emoji: {
    fontSize: 28,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 260,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#007AFF',
  },
  modalButton: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    width: '100%',
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
});