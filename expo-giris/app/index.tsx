import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import './global.css';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [taskText, setTaskText] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState('');

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.title = 'Yapılacaklar Listesi';
    }
  }, []);

  const addTask = () => {
    if (taskText.trim() === '') return;
    setTasks([...tasks, taskText.trim()]);
    setTaskText('');
  };

  const deleteTask = (index: number) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const openEditModal = (index: number) => {
    setEditIndex(index);
    setEditedTask(tasks[index]);
  };

  const saveEdit = () => {
    if (editIndex !== null && editedTask.trim() !== '') {
      const updated = [...tasks];
      updated[editIndex] = editedTask.trim();
      setTasks(updated);
      setEditIndex(null);
      setEditedTask('');
    }
  };

  const handleEdit = (index: number) => {
    if (Platform.OS === 'web') {
      openEditModal(index);
    } else {
      Alert.prompt(
        'Görevi Düzenle',
        '',
        (newText) => {
          if (!newText || newText.trim() === '') return;
          const updated = [...tasks];
          updated[index] = newText.trim();
          setTasks(updated);
        },
        'plain-text',
        tasks[index]
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6" edges={['bottom']}>
      <StatusBar style="light" hidden />

      <Text className="text-4xl font-extrabold text-white mb-6 text-center">📝 Yapılacaklar Listesi</Text>

      <View className="flex-row mb-4">
        <TextInput
          className="border-2 border-gray-300 focus:border-blue-500 rounded-lg p-3 w-full text-lg shadow-md"
          placeholder="Yeni görev girin..."
          value={taskText}
          onChangeText={setTaskText}
        />
        <TouchableOpacity
          onPress={addTask}
          className="bg-fuchsia-600 px-6 py-3 ml-4 rounded-full shadow-xl hover:bg-fuchsia-700 transition-all duration-300"
        >
          <Text className="text-white font-bold text-lg">Ekle</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View className="flex-row justify-between items-center mb-4 bg-white p-4 rounded-lg shadow-lg">
            <Text className="text-lg font-medium text-gray-800">{item}</Text>
            <View className="flex-row space-x-4">
              <TouchableOpacity
                onPress={() => handleEdit(index)}
                className="bg-yellow-500 px-4 py-2 rounded-full"
              >
                <Text className="text-white font-semibold">Düzenle</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteTask(index)}
                className="bg-red-600 px-4 py-2 rounded-full"
              >
                <Text className="text-white font-semibold">Sil</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {editIndex !== null && Platform.OS === 'web' && (
        <View className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <View className="bg-white p-6 rounded-lg shadow-xl w-4/5 max-w-lg">
            <Text className="text-xl font-semibold mb-4">Görevi Düzenle</Text>
            <TextInput
              value={editedTask}
              onChangeText={setEditedTask}
              className="border-2 border-gray-300 p-3 rounded-lg w-full mb-4"
              placeholder="Görevi düzenleyin..."
            />
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={saveEdit}
                className="bg-green-500 px-6 py-2 rounded-full"
              >
                <Text className="text-white font-semibold">Kaydet</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { setEditIndex(null); setEditedTask(''); }}
                className="bg-gray-500 px-6 py-2 rounded-full"
              >
                <Text className="text-white font-semibold">İptal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
