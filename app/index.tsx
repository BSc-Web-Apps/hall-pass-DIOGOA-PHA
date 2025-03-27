import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CalendarIcon from "./assets/icons/svg/calendar-icon.svg";
import TaskIcon from "./assets/icons/svg/task-icon.svg";
import MainButton from "./assets/icons/svg/main-button.svg";

interface Task {
  id: string;
  title: string;
  category: string;
  completed: boolean;
}

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Feed the cat",
      category: "Personal Chores",
      completed: false,
    },
    {
      id: "2",
      title: "Submit Assignment",
      category: "School",
      completed: false,
    },
    {
      id: "3",
      title: "Library Research",
      category: "Economics",
      completed: true,
    },
    {
      id: "4",
      title: "Group Project Meeting",
      category: "Work",
      completed: false,
    },
    { id: "5", title: "Read Chapter 5", category: "Study", completed: false },
    {
      id: "6",
      title: "Submit Essay",
      category: "English Literature",
      completed: true,
    },
    {
      id: "7",
      title: "Quiz Preparation",
      category: "Math Quiz",
      completed: false,
    },
    {
      id: "8",
      title: "Lab Report Submission",
      category: "Physics Lab",
      completed: false,
    },
    {
      id: "9",
      title: "Project Proposal",
      category: "History Project",
      completed: true,
    },
  ]);

  const toggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const renderTask = ({ item }: { item: Task }) => (
    <TouchableOpacity
      className="flex flex-col p-4 border-b border-gray-700"
      onPress={() => toggleTask(item.id)}
    >
      <View className="flex flex-row items-center">
        <Ionicons
          name={item.completed ? "checkbox" : "square-outline"}
          size={24}
          color={item.completed ? "#FF5733" : "#FFFFFF"}
        />
        <View className="ml-4">
          <Text
            className={`text-lg ${
              item.completed ? "line-through text-gray-400" : "text-white"
            }`}
          >
            {item.title}
          </Text>
          <Text className="text-sm text-gray-500">{item.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-black p-6">
      <View className="flex flex-row justify-between items-center mb-6">
        <Text className="text-4xl text-white font-bold">HallPass</Text>
        <Ionicons name="checkmark-circle" size={32} color="#FFFFFF" />
      </View>
      <Text className="text-2xl text-white font-semibold mb-4">
        Today's Tasks
      </Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
      />
      <View className="absolute bottom-6 left-0 right-0 flex flex-row justify-around items-center">
        <TaskIcon width={32} height={32} />
        <TouchableOpacity>
          <MainButton width={64} height={64} />
        </TouchableOpacity>
        <CalendarIcon width={32} height={32} />
      </View>
    </View>
  );
}
