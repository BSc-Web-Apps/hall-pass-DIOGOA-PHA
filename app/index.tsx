import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Feed the cat", completed: false },
    { id: "2", title: "Submit Assignment", completed: false },
    { id: "3", title: "Library Research", completed: true },
    { id: "4", title: "Group Project Meeting", completed: false },
    { id: "5", title: "Read Chapter 5", completed: false },
    { id: "6", title: "Submit Essay", completed: true },
    { id: "7", title: "Quiz Preparation", completed: false },
    { id: "8", title: "Lab Report Submission", completed: false },
    { id: "9", title: "Project Proposal", completed: true },
  ]);

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const renderTask = ({ item }) => (
    <TouchableOpacity
      className="flex flex-row items-center p-4 border-b border-gray-700"
      onPress={() => toggleTask(item.id)}
    >
      <Ionicons
        name={item.completed ? "checkbox" : "square-outline"}
        size={24}
        color={item.completed ? "#FF5733" : "#FFFFFF"}
      />
      <Text
        className={`ml-4 text-lg ${
          item.completed ? "line-through text-gray-400" : "text-white"
        }`}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-black p-6">
      <Text className="text-3xl text-white font-bold mb-6">HallPass</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
      />
    </View>
  );
}
