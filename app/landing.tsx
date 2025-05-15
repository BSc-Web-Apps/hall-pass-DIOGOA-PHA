import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import landingImage from "./assets/images/landing-image-saved.png";

export default function LandingPage() {
  const router = useRouter();
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>HallPass ✅</Text>

        <View style={styles.imageWrapper}>
          <Image source={landingImage} style={styles.image} />
        </View>

        <Text style={styles.tagline}>Uni. Sorted.</Text>

        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => setStarted(true)}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.featureContainer}>
      {/* Social Widget */}
      <TouchableOpacity
        style={styles.widget}
        onPress={() => router.push("social" as any)}
      >
        <View style={styles.widgetContent}>
          <View style={styles.iconContainer}>
            <Ionicons name="people" size={32} color="#FF5733" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.widgetTitle}>Social Hub</Text>
            <Text style={styles.widgetSubtitle}>
              Connect with friends and share your progress
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </View>
      </TouchableOpacity>

      {/* Notes Widget */}
      <TouchableOpacity
        style={styles.widget}
        onPress={() => router.push("notes" as any)}
      >
        <View style={styles.widgetContent}>
          <View style={styles.iconContainer}>
            <Ionicons name="document-text" size={32} color="#FF5733" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.widgetTitle}>Notes & Tasks</Text>
            <Text style={styles.widgetSubtitle}>
              Manage your tasks and take notes
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 30,
  },
  imageWrapper: {
    borderRadius: 100,
    overflow: "hidden",
    marginBottom: 30,
  },
  image: {
    width: 200,
    height: 200,
  },
  tagline: {
    color: "#ccc",
    fontSize: 20,
    marginBottom: 40,
  },
  getStartedButton: {
    backgroundColor: "#FF5733",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  getStartedText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  featureContainer: {
    flex: 1,
    backgroundColor: "#000",
    padding: 24,
    justifyContent: "center",
  },
  widget: {
    backgroundColor: "#1F2937",
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#374151",
    marginBottom: 16,
  },
  widgetContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#374151",
    padding: 10,
    borderRadius: 10,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  widgetTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  widgetSubtitle: {
    color: "#9CA3AF",
  },
});
