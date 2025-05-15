import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import RenderTask from "../components/RenderTask";

// Mock @expo/vector-icons
jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
}));

// Mock lucide-react-native
jest.mock("lucide-react-native", () => ({
  Plus: "Plus",
}));

// Mock @react-native-community/datetimepicker
jest.mock("@react-native-community/datetimepicker", () => "DateTimePicker");

describe("RenderTask", () => {
  test("renders a task", () => {
    const task = {
      id: "1",
      title: "Test Task",
      subtitle: "Test Category",
      completed: false,
      dueDate: new Date("2024-10-20T14:00:00"),
    };
    const mockToggleTask = jest.fn();

    render(<RenderTask item={task} toggleTask={mockToggleTask} />);

    // Check if the title and category are displayed
    const titleElement = screen.getByText("Test Task");
    const categoryElement = screen.getByText("Test Category");
    expect(titleElement).toBeTruthy();
    expect(categoryElement).toBeTruthy();

    // Check if the due date is displayed
    const dueDateText = screen.getByText(/Due: .* at .*/);
    expect(dueDateText).toBeTruthy();
  });
});
