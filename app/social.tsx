import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MessageCirclePlus, UserPlus } from "lucide-react-native";

interface User {
  id: string;
  name: string;
  status: string;
}

const initialUsers: User[] = [
  { id: "1", name: "Alice Johnson", status: "Online" },
  { id: "2", name: "Bob Smith", status: "Busy" },
  { id: "3", name: "Charlie Brown", status: "Offline" },
];

export default function SocialPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [friends, setFriends] = useState<User[]>([]);

  const addFriend = (user: User) => {
    if (friends.find((f) => f.id === user.id)) {
      Alert.alert("Already Friends", `${user.name} is already your friend.`);
      return;
    }
    setFriends([...friends, user]);
    Alert.alert("Friend Added", `You added ${user.name} as a friend.`);
  };

  const openChat = (user: User) => {
    Alert.alert("Chat", `Opening chat with ${user.name}...`);
  };

  const renderUser = ({ item }: { item: User }) => (
    <View className="flex-row justify-between items-center bg-zinc-800 rounded-xl p-4 mb-3">
      <View>
        <Text className="text-white text-lg font-semibold">{item.name}</Text>
        <Text className="text-gray-400 text-sm">{item.status}</Text>
      </View>
      <View className="flex-row space-x-4">
        <TouchableOpacity onPress={() => addFriend(item)}>
          <UserPlus color="#10b981" size={22} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openChat(item)}>
          <MessageCirclePlus color="#3b82f6" size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFriend = ({ item }: { item: User }) => (
    <View className="flex-row justify-between items-center bg-zinc-700 rounded-xl p-3 mb-2">
      <Text className="text-white font-medium">{item.name}</Text>
      <TouchableOpacity onPress={() => openChat(item)}>
        <Ionicons name="chatbox-ellipses-outline" size={22} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-black px-6 pt-12">
      <Text className="text-3xl text-white font-bold mb-4">Social</Text>

      <Text className="text-xl text-white font-semibold mb-2">All Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderUser}
      />

      <Text className="text-xl text-white font-semibold mt-6 mb-2">
        Friends
      </Text>
      {friends.length === 0 ? (
        <Text className="text-gray-400">No friends yet. Add someone!</Text>
      ) : (
        <FlatList
          data={friends}
          keyExtractor={(item) => item.id}
          renderItem={renderFriend}
        />
      )}
    </View>
  );
}
