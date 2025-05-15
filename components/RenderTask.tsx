import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface Task {
  id: string;
  title: string;
  subtitle?: string;
  completed: boolean;
  dueDate?: Date;
}

interface RenderTaskProps {
  item: Task;
  toggleTask: (id: string) => void;
}

const RenderTask = ({ item, toggleTask }: RenderTaskProps) => (
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
      {item.dueDate && (
        <Text
          className={`text-sm ${
            item.completed ? "line-through text-gray-500" : "text-gray-400"
          }`}
        >
          Due: {item.dueDate.toLocaleDateString()} at{" "}
          {item.dueDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      )}
    </View>
  </TouchableOpacity>
);

export default RenderTask;
