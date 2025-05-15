import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function LandingPage() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-black p-6">
      <View className="flex-1 justify-center items-center">
        <Text className="text-4xl text-white font-bold mb-12">HallPass</Text>

        <View className="w-full max-w-md space-y-6">
          {/* Social Widget */}
          <TouchableOpacity
            className="bg-gray-800 p-6 rounded-xl border-2 border-gray-700 active:border-brand-primary"
            onPress={() => router.push("social" as any)}
          >
            <View className="flex-row items-center space-x-4">
              <View className="bg-gray-700 p-3 rounded-lg">
                <Ionicons name="people" size={32} color="#FF5733" />
              </View>
              <View className="flex-1">
                <Text className="text-xl text-white font-semibold mb-1">
                  Social Hub
                </Text>
                <Text className="text-gray-400">
                  Connect with friends and share your progress
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

          {/* Notes Widget */}
          <TouchableOpacity
            className="bg-gray-800 p-6 rounded-xl border-2 border-gray-700 active:border-brand-primary"
            onPress={() => router.push("notes" as any)}
          >
            <View className="flex-row items-center space-x-4">
              <View className="bg-gray-700 p-3 rounded-lg">
                <Ionicons name="document-text" size={32} color="#FF5733" />
              </View>
              <View className="flex-1">
                <Text className="text-xl text-white font-semibold mb-1">
                  Notes & Tasks
                </Text>
                <Text className="text-gray-400">
                  Manage your tasks and take notes
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
