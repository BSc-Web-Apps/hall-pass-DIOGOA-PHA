import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Plus } from "lucide-react-native";

interface Task {
  id: string;
  title: string;
  subtitle?: string;
  completed: boolean;
}
interface RenderTaskProps {
  item: Task;
  toggleTask: (id: string) => void;
}
export const RenderTask = ({ item, toggleTask }: RenderTaskProps) => (
  <TouchableOpacity
    className="flex flex-row items-start p-4 border-b border-gray-700"
    onPress={() => toggleTask(item.id)}
  >
    <Ionicons
      name={item.completed ? "checkbox" : "square-outline"}
      size={24}
      color={item.completed ? "#FF5733" : "#FFFFFF"}
      style={{ marginTop: 4 }}
    />
    <View className="ml-4">
      <Text
        className={`text-lg font-semibold ${
          item.completed ? "line-through text-gray-400" : "text-white"
        }`}
      >
        {item.title}
      </Text>
      {item.subtitle && (
        <Text
          className={`text-sm ${
            item.completed ? "line-through text-gray-500" : "text-gray-400"
          }`}
        >
          {item.subtitle}
        </Text>
      )}
    </View>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const initialTasks: Task[] = [
      {
        id: "1",
        title: "Submit Assignment",
        subtitle: "Due: Oct 20",
        completed: false,
      },
      {
        id: "2",
        title: "Library Research",
        subtitle: "Economics",
        completed: true,
      },
      {
        id: "3",
        title: "Group Project Meeting",
        subtitle: "Prepare slides",
        completed: false,
      },
      {
        id: "4",
        title: "Read Chapter 5",
        subtitle: "For next class",
        completed: false,
      },
      {
        id: "5",
        title: "Submit Essay",
        subtitle: "English Literature",
        completed: true,
      },
      {
        id: "6",
        title: "Quiz Preparation",
        subtitle: "Math Quiz",
        completed: false,
      },
      {
        id: "7",
        title: "Lab Report Submission",
        subtitle: "Physics Lab",
        completed: false,
      },
      {
        id: "8",
        title: "Project Proposal",
        subtitle: "History Project",
        completed: true,
      },
    ];
    setTasks(initialTasks);
  }, []);

  const toggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View className="flex-1 bg-black p-6">
      <Text className="text-3xl text-white font-bold mb-6">HallPass</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => RenderTask({ item, toggleTask })}
      />
      <View className="relative flex flex-row items-center justify-center w-full">
        <View className="absolute -bottom-0 flex flex-row items-center justify-center w-20 h-20 p-4 bg-brand-primary rounded-full">
          <Plus size={32} color="hsl(11, 72%, 3%)" />
        </View>
      </View>
    </View>
  );
}
