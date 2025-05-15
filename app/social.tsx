import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SocialPage() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-black p-6 pt-12">
      {/* Back Button */}
      <TouchableOpacity onPress={router.back} className="mb-4">
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      <Text className="text-3xl text-white font-bold mb-6">Social Hub</Text>
      <Text className="text-gray-400">Coming soon...</Text>
    </View>
  );
}
