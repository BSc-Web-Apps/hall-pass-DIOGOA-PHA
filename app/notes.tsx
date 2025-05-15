import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Plus } from "lucide-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface Task {
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

export default function NotesPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    subtitle: "",
    dueDate: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");
  const [dateInput, setDateInput] = useState("");
  const [timeInput, setTimeInput] = useState("");

  useEffect(() => {
    const initialTasks: Task[] = [
      {
        id: "1",
        title: "Submit Assignment",
        subtitle: "Due: Oct 20",
        completed: false,
        dueDate: new Date("2024-10-20T14:00:00"),
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

  useEffect(() => {
    if (newTask.dueDate) {
      setDateInput(newTask.dueDate.toLocaleDateString());
      setTimeInput(
        newTask.dueDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
  }, [newTask.dueDate]);

  const toggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        subtitle: newTask.subtitle,
        dueDate: newTask.dueDate,
        completed: false,
      };
      setTasks((prevTasks) => [...prevTasks, task]);
      setNewTask({ title: "", subtitle: "", dueDate: new Date() });
      setModalVisible(false);
    }
  };

  const onDateTimeChange = (event: any, selectedDate?: Date) => {
    if (pickerMode === "date") {
      setShowDatePicker(false);
      if (selectedDate) {
        const currentDate = newTask.dueDate;
        selectedDate.setHours(currentDate.getHours(), currentDate.getMinutes());
        setNewTask((prev) => ({ ...prev, dueDate: selectedDate }));
      }
    } else {
      setShowTimePicker(false);
      if (selectedDate) {
        const currentDate = newTask.dueDate;
        selectedDate.setFullYear(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        );
        setNewTask((prev) => ({ ...prev, dueDate: selectedDate }));
      }
    }
  };

  const handleDateInputChange = (text: string) => {
    setDateInput(text);
    try {
      const [month, day, year] = text.split("/").map((num) => parseInt(num));
      if (month && day && year) {
        const newDate = new Date(newTask.dueDate);
        newDate.setMonth(month - 1);
        newDate.setDate(day);
        newDate.setFullYear(year);
        setNewTask((prev) => ({ ...prev, dueDate: newDate }));
      }
    } catch (error) {
      // Invalid date format, ignore
    }
  };

  const handleTimeInputChange = (text: string) => {
    setTimeInput(text);
    try {
      const [time, period] = text.split(" ");
      const [hours, minutes] = time.split(":").map((num) => parseInt(num));
      if (hours && minutes) {
        const newDate = new Date(newTask.dueDate);
        let adjustedHours = hours;
        if (period === "PM" && hours !== 12) adjustedHours += 12;
        if (period === "AM" && hours === 12) adjustedHours = 0;
        newDate.setHours(adjustedHours, minutes);
        setNewTask((prev) => ({ ...prev, dueDate: newDate }));
      }
    } catch (error) {
      // Invalid time format, ignore
    }
  };

  const openDatePicker = () => {
    setPickerMode("date");
    setShowDatePicker(true);
  };

  const openTimePicker = () => {
    setPickerMode("time");
    setShowTimePicker(true);
  };

  return (
    <View className="flex-1 bg-black p-6">
      <Text className="text-3xl text-white font-bold mb-6">Notes & Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RenderTask item={item} toggleTask={toggleTask} />
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-gray-800 p-6 rounded-lg w-11/12">
            <Text className="text-2xl text-white font-bold mb-4">New Task</Text>

            <TextInput
              className="bg-gray-700 text-white p-3 rounded-lg mb-3"
              placeholder="Task Title"
              placeholderTextColor="#9CA3AF"
              value={newTask.title}
              onChangeText={(text) =>
                setNewTask((prev) => ({ ...prev, title: text }))
              }
            />

            <TextInput
              className="bg-gray-700 text-white p-3 rounded-lg mb-3"
              placeholder="Subtitle (optional)"
              placeholderTextColor="#9CA3AF"
              value={newTask.subtitle}
              onChangeText={(text) =>
                setNewTask((prev) => ({ ...prev, subtitle: text }))
              }
            />

            <View className="mb-4">
              <Text className="text-white mb-2">Due Date and Time</Text>
              <View className="flex-row space-x-3">
                <View className="flex-1">
                  <TextInput
                    className="bg-gray-700 text-white p-3 rounded-lg"
                    placeholder="MM/DD/YYYY"
                    placeholderTextColor="#9CA3AF"
                    value={dateInput}
                    onChangeText={handleDateInputChange}
                  />
                  <Pressable
                    className="mt-1 bg-gray-600 p-2 rounded-lg"
                    onPress={openDatePicker}
                  >
                    <Text className="text-white text-center">
                      Use Date Picker
                    </Text>
                  </Pressable>
                </View>
                <View className="flex-1">
                  <TextInput
                    className="bg-gray-700 text-white p-3 rounded-lg"
                    placeholder="HH:MM AM/PM"
                    placeholderTextColor="#9CA3AF"
                    value={timeInput}
                    onChangeText={handleTimeInputChange}
                  />
                  <Pressable
                    className="mt-1 bg-gray-600 p-2 rounded-lg"
                    onPress={openTimePicker}
                  >
                    <Text className="text-white text-center">
                      Use Time Picker
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>

            {(showDatePicker || showTimePicker) && (
              <DateTimePicker
                value={newTask.dueDate}
                mode={pickerMode}
                display="default"
                onChange={onDateTimeChange}
              />
            )}

            <View className="flex-row justify-end space-x-3">
              <Pressable
                className="bg-gray-600 px-4 py-2 rounded-lg"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white">Cancel</Text>
              </Pressable>
              <Pressable
                className="bg-brand-primary px-4 py-2 rounded-lg"
                onPress={handleAddTask}
              >
                <Text className="text-white">Add Task</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View className="relative flex flex-row items-center justify-center w-full">
        <TouchableOpacity
          className="absolute -bottom-0 flex flex-row items-center justify-center w-20 h-20 p-4 bg-brand-primary rounded-full"
          onPress={() => setModalVisible(true)}
        >
          <Plus size={32} color="hsl(11, 72%, 3%)" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
