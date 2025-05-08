import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { RenderTask } from "../app/index";

// Mock @expo/vector-icons
jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
}));

// Mock lucide-react-native
jest.mock("lucide-react-native", () => ({
  Plus: "Plus",
}));

describe("RenderTask", () => {
  test("renders a task", () => {
    const task = {
      id: "1",
      title: "Test Task",
      subtitle: "Test Category",
      completed: false,
    };
    const mockToggleTask = jest.fn();

    render(<RenderTask item={task} toggleTask={mockToggleTask} />);

    // Check if the title and category are displayed
    const titleElement = screen.getByText("Test Task");
    const categoryElement = screen.getByText("Test Category");
    expect(titleElement).toBeTruthy();
    expect(categoryElement).toBeTruthy();
  });
});
