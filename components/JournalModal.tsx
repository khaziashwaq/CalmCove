import { useEffect, useState } from "react";
import {
  X,
  CheckSquare,
  Square,
  ChevronRight,
  ChevronLeft,
  Circle,
} from "lucide-react";
import { POST } from "@/app/api/stories/route";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { User } from "firebase/auth";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onAddTodo: (text: string) => void;
  onToggleTodo: (id: string) => void;
  onUpdateTodo: (id: string, text: string) => void;
  onDeleteTodo: (id: string) => void;
}

const TodoList = ({
  todos,
  onAddTodo,
  onToggleTodo,
  onUpdateTodo,
  onDeleteTodo,
}: TodoListProps) => {
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    todo: Todo,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const target = e.target as HTMLDivElement;
      const text = target.innerText.trim();
      const container = target.closest(".todo-container");
      if (!container) return;

      // Update current todo if it was empty and is now filled
      if (text && !todo.text) {
        onUpdateTodo(todo.id, text);
      }

      // Add new todo if we're on the last item
      if (index === todos.length - 1) {
        onAddTodo("");
        // Wait for the new todo to be added to the DOM
        setTimeout(() => {
          const todoItems = container.querySelectorAll(
            '[data-todo-item="true"]'
          );
          const lastItem = todoItems[todoItems.length - 1];
          if (lastItem instanceof HTMLElement) {
            lastItem.focus();
          }
        }, 0);
      } else {
        // Move to next existing todo
        const todoItems = container.querySelectorAll('[data-todo-item="true"]');
        const nextItem = todoItems[index + 1];
        if (nextItem instanceof HTMLElement) {
          nextItem.focus();
        }
      }
    } else if (e.key === "Backspace" && !e.currentTarget.textContent) {
      e.preventDefault();
      if (todos.length > 1) {
        const container = e.currentTarget.closest(".todo-container");
        if (!container) return;
        const todoItems = container.querySelectorAll('[data-todo-item="true"]');
        const prevItem = todoItems[index - 1];
        onDeleteTodo(todo.id);
        if (prevItem instanceof HTMLElement) {
          prevItem.focus();
        }
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>, todo: Todo) => {
    const text = e.target.innerText.trim();
    if (text !== todo.text) {
      onUpdateTodo(todo.id, text);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-2 todo-container">
      {todos.map((todo, index) => (
        <div
          key={todo.id}
          className="flex items-start gap-2 group min-h-[24px]"
        >
          <button
            onClick={() => onToggleTodo(todo.id)}
            className="flex-shrink-0 focus:outline-none mt-0.5"
          >
            {todo.completed ? (
              <CheckSquare className="w-5 h-5 text-green-500" />
            ) : (
              <Square className="w-5 h-5 text-gray-400" />
            )}
          </button>
          <div
            contentEditable="true"
            data-todo-item="true"
            className={`flex-1 outline-none focus:outline-none focus:ring-0 ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
            onKeyDown={(e) => handleKeyDown(e, todo, index)}
            onBlur={(e) => handleBlur(e, todo)}
            suppressContentEditableWarning={true}
            style={{ caretColor: "auto" }}
          >
            {todo.text}
          </div>
        </div>
      ))}
    </div>
  );
};

interface BulletListProps {
  items: { id: string; text: string }[];
  onAddItem: (text: string) => void;
  onUpdateItem: (id: string, text: string) => void;
  onDeleteItem: (id: string) => void;
}

const BulletList = ({
  items,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
}: BulletListProps) => {
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    item: { id: string; text: string },
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const target = e.target as HTMLDivElement;
      const text = target.innerText.trim();
      const container = target.closest(".bullet-container");
      if (!container) return;

      // Update current item if it was empty and is now filled
      if (text && !item.text) {
        onUpdateItem(item.id, text);
      }

      // Add new item if we're on the last item
      if (index === items.length - 1) {
        onAddItem("");
        // Wait for the new item to be added to the DOM
        setTimeout(() => {
          const listItems = container.querySelectorAll(
            '[data-bullet-item="true"]'
          );
          const lastItem = listItems[listItems.length - 1];
          if (lastItem instanceof HTMLElement) {
            lastItem.focus();
          }
        }, 0);
      } else {
        // Move to next existing item
        const listItems = container.querySelectorAll(
          '[data-bullet-item="true"]'
        );
        const nextItem = listItems[index + 1];
        if (nextItem instanceof HTMLElement) {
          nextItem.focus();
        }
      }
    } else if (e.key === "Backspace" && !e.currentTarget.textContent) {
      e.preventDefault();
      if (items.length > 1) {
        const container = e.currentTarget.closest(".bullet-container");
        if (!container) return;
        const listItems = container.querySelectorAll(
          '[data-bullet-item="true"]'
        );
        const prevItem = listItems[index - 1];
        onDeleteItem(item.id);
        if (prevItem instanceof HTMLElement) {
          prevItem.focus();
        }
      }
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLDivElement>,
    item: { id: string; text: string }
  ) => {
    const text = e.target.innerText.trim();
    if (text !== item.text) {
      onUpdateItem(item.id, text);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-2 bullet-container">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="flex items-start gap-2 group min-h-[24px]"
        >
          <Circle className="w-2 h-2 mt-2 flex-shrink-0 text-gray-400" />
          <div
            contentEditable="true"
            data-bullet-item="true"
            className="flex-1 outline-none focus:outline-none focus:ring-0"
            onKeyDown={(e) => handleKeyDown(e, item, index)}
            onBlur={(e) => handleBlur(e, item)}
            suppressContentEditableWarning={true}
            style={{ caretColor: "auto" }}
          >
            {item.text}
          </div>
        </div>
      ))}
    </div>
  );
};

interface Item {
  id: string;
  title: string;
  type: "todo" | "text" | "list" | "bullet";
  todos: Todo[];
  content?: string;
  selectedEmotion?: string;
}

interface Insight {
  title: string;
  content: string;
  type: "info" | "success" | "warning";
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: { day: number; month: number; year: number } | null;
}

const emotions = [
  {
    emoji: "🌟",
    name: "Happy",
    color: "bg-gradient-to-br from-amber-100 to-yellow-50 shadow-lg",
    hover: "hover:from-amber-200 hover:to-yellow-100 hover:shadow-xl",
  },
  {
    emoji: "🌧️",
    name: "Sad",
    color: "bg-gradient-to-br from-sky-100 to-blue-50 shadow-lg",
    hover: "hover:from-sky-200 hover:to-blue-100 hover:shadow-xl",
  },
  {
    emoji: "⚡",
    name: "Angry",
    color: "bg-gradient-to-br from-rose-100 to-red-50 shadow-lg",
    hover: "hover:from-rose-200 hover:to-red-100 hover:shadow-xl",
  },
  {
    emoji: "🌸",
    name: "Calm",
    color: "bg-gradient-to-br from-emerald-100 to-green-50 shadow-lg",
    hover: "hover:from-emerald-200 hover:to-green-100 hover:shadow-xl",
  },
  {
    emoji: "🌊",
    name: "Anxious",
    color: "bg-gradient-to-br from-violet-100 to-purple-50 shadow-lg",
    hover: "hover:from-violet-200 hover:to-purple-100 hover:shadow-xl",
  },
  {
    emoji: "✨",
    name: "Grateful",
    color: "bg-gradient-to-br from-orange-100 to-amber-50 shadow-lg",
    hover: "hover:from-orange-200 hover:to-amber-100 hover:shadow-xl",
  },
];

const EmotionSelector = ({
  selectedEmotion,
  onSelect,
}: {
  selectedEmotion?: string;
  onSelect: (emotion: string) => void;
}) => {
  return (
    <div className="flex flex-wrap gap-2 m-4">
      {emotions.map((emotion) => (
        <button
          key={emotion.name}
          onClick={() => onSelect(emotion.name)}
          className={`p-2 rounded-lg flex flex-col items-center transition-all w-16 h-16 justify-center ${
            emotion.color
          } ${
            selectedEmotion === emotion.name
              ? "ring-2 ring-blue-400"
              : "hover:scale-105"
          }`}
        >
          <span className="text-2xl">{emotion.emoji}</span>
          <span className="text-xs font-medium">{emotion.name}</span>
        </button>
      ))}
    </div>
  );
};

export default function JournalModal({
  isOpen,
  onClose,
  selectedDate,
}: ModalProps) {
  const [items, setItems] = useState<Item[]>([
    {
      id: "mood",
      title: "How are we feeling today?",
      type: "text",
      content: "",
      selectedEmotion: undefined,
      todos: [],
    },
    {
      id: "todo-list",
      title: "Today's to-do list",
      type: "todo",
      todos: [{ id: "1", text: "", completed: false }],
    },
    {
      id: "gratitude",
      title: "I am Grateful for...",
      type: "bullet",
      content: "",
      todos: [{ id: "g1", text: "", completed: false }],
    },
    {
      id: "accomplishments",
      title: "Today's Wins 🏆",
      type: "bullet",
      content: "",
      todos: [{ id: "a1", text: "", completed: false }],
    },
    {
      id: "ideas",
      title: "Ideas & Inspiration 💡",
      type: "bullet",
      content: "",
      todos: [{ id: "i1", text: "", completed: false }],
    },
    {
      id: "tomorrow-goals",
      title: "Goals for Tomorrow 🎯",
      type: "bullet",
      content: "",
      todos: [{ id: "t1", text: "", completed: false }],
    },
    {
      id: "habits",
      title: "Habit Tracker",
      type: "list",
      todos: [
        { id: "h1", text: "Exercise", completed: false },
        { id: "h2", text: "Meditation", completed: false },
        { id: "h3", text: "Reading", completed: false },
        { id: "h4", text: "Water intake", completed: false },
        { id: "h5", text: "Healthy eating", completed: false },
      ],
    },
  ]);

  const [insights] = useState<Insight[]>([
    {
      title: "Today's Progress",
      content: "You've completed 3 tasks today! Keep up the good work!",
      type: "success",
    },
    {
      title: "Task Pattern",
      content:
        "You tend to be most productive in the morning. Consider scheduling important tasks early.",
      type: "info",
    },
    {
      title: "Upcoming",
      content: "You have 2 tasks planned for tomorrow.",
      type: "info",
    },
  ]);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const handleAddTodo = (itemId: string, text: string) => {
    const newItems = [...items];
    const itemIndex = newItems.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    newItems[itemIndex].todos = [...newItems[itemIndex].todos, newTodo];
    setItems(newItems);
  };

  const handleUpdateTodo = (itemId: string, todoId: string, text: string) => {
    const newItems = [...items];
    const itemIndex = newItems.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) return;

    const todoIndex = newItems[itemIndex].todos.findIndex(
      (t) => t.id === todoId
    );
    if (todoIndex !== -1) {
      newItems[itemIndex].todos[todoIndex].text = text;
      setItems(newItems);
    }
  };

  const handleToggleTodo = (itemId: string, todoId: string) => {
    const newItems = [...items];
    const itemIndex = newItems.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) return;

    const todoIndex = newItems[itemIndex].todos.findIndex(
      (t) => t.id === todoId
    );
    if (todoIndex !== -1) {
      newItems[itemIndex].todos[todoIndex].completed =
        !newItems[itemIndex].todos[todoIndex].completed;
      setItems(newItems);
    }
  };

  const handleDeleteTodo = (itemId: string, todoId: string) => {
    const newItems = [...items];
    const itemIndex = newItems.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) return;

    if (newItems[itemIndex].todos.length > 1) {
      newItems[itemIndex].todos = newItems[itemIndex].todos.filter(
        (t) => t.id !== todoId
      );
      setItems(newItems);
    }
  };

  const handleEdit = (itemId: string, content: string) => {
    const newItems = [...items];
    const itemIndex = newItems.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) return;

    newItems[itemIndex].content = content;
    setItems(newItems);
  };

  const handleEmotionSelect = (itemId: string, emotion: string) => {
    const newItems = [...items];
    const itemIndex = newItems.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) return;

    newItems[itemIndex].selectedEmotion = emotion;
    setItems(newItems);
  };

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
    return () => unsubscribe();
  }, []);

  const [journalEntry, setJournalEntry] = useState<string>("");

  const handleSave = async () => {
    try {
      if (!user) {
        console.log("No user logged in");
        alert("Please log in to save your journal entry.");
        return;
      }

      const moodItem = items.find((item) => item.id === "mood");
      const todoItem = items.find((item) => item.id === "todo-list");
      const gratitudeItem = items.find((item) => item.id === "gratitude");
      const winsItem = items.find((item) => item.id === "accomplishments");
      const ideasItem = items.find((item) => item.id === "ideas");
      const goalsItem = items.find((item) => item.id === "tomorrow-goals");
      const habitsItem = items.find((item) => item.id === "habits");

      console.log("Selected date:", selectedDate);
      const journalData = {
        date: `${selectedDate?.year}-${(selectedDate?.month ?? 0) + 1}-${
          selectedDate?.day
        }`,
        mood: moodItem?.selectedEmotion || "Neutral",
        daily_tasks: JSON.stringify(todoItem?.todos || []),
        goals_for_tomorrow: goalsItem?.todos.map((t) => t.text).join("\n"),
        creative_ideas: ideasItem?.todos.map((t) => t.text).join("\n"),
        habit_tracker: JSON.stringify(habitsItem?.todos || []),
        todays_wins: winsItem?.todos.map((t) => t.text).join("\n"),
        gratitude_list: gratitudeItem?.todos.map((t) => t.text).join("\n"),
        personal_reflections: moodItem?.content || "",
      };
      console.log("Preparing to save journal data:", journalData);

      const token = await user.getIdToken();
      console.log("Got auth token:", token.substring(0, 10) + "...");

      console.log("Making API request to /api/journal");
      const response = await fetch("/api/journal", {
        method: "POST",
        body: JSON.stringify(journalData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response status:", response.status);
      const responseText = await response.text();
      console.log("Raw response:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
        console.log("Parsed response data:", data);
      } catch (e) {
        console.error("Failed to parse response as JSON:", e);
        throw new Error("Server returned invalid JSON");
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to save to database");
      }

      console.log("Journal saved successfully to database");
      onClose(); // Close modal after successful save
    } catch (error: unknown) {
      console.error("Failed to save journal to database:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to save journal. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100 visible " : "opacity-0 invisible"
      }`}
    >
      <div className="bg-white p-6 rounded-lg h-[90vh] w-[90vw] shadow-lg flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {selectedDate?.day}/{(selectedDate?.month ?? 0) + 1}/
            {selectedDate?.year}
          </h2>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            save
          </button>
          <button onClick={onClose}>
            <X />
          </button>
        </div>
        <div className="flex-1 min-h-0 flex gap-6">
          <div className="flex-1 flex flex-col lg:grid lg:grid-cols-3 gap-4 lg:gap-4 overflow-y-auto p-2">
            {items.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-lg border border-gray-200 hover:border-blue-400 transition-colors p-4 flex flex-col mb-4 lg:mb-0 ${
                  item.id === "mood"
                    ? "lg:col-span-2 lg:row-span-5"
                    : item.id === "todo-list"
                    ? "lg:col-span-1 lg:row-span-3"
                    : ""
                }`}
              >
                <h3 className="font-medium mb-3">{item.title}</h3>
                <div className="flex-1 overflow-y-auto">
                  {item.type === "todo" || item.type === "list" ? (
                    <TodoList
                      todos={item.todos}
                      onAddTodo={(text) => handleAddTodo(item.id, text)}
                      onToggleTodo={(todoId) =>
                        handleToggleTodo(item.id, todoId)
                      }
                      onUpdateTodo={(todoId, text) =>
                        handleUpdateTodo(item.id, todoId, text)
                      }
                      onDeleteTodo={(todoId) =>
                        handleDeleteTodo(item.id, todoId)
                      }
                    />
                  ) : item.type === "bullet" ? (
                    <BulletList
                      items={item.todos}
                      onAddItem={(text) => handleAddTodo(item.id, text)}
                      onUpdateItem={(itemId, text) =>
                        handleUpdateTodo(item.id, itemId, text)
                      }
                      onDeleteItem={(itemId) =>
                        handleDeleteTodo(item.id, itemId)
                      }
                    />
                  ) : (
                    <div className="h-full flex flex-col">
                      <EmotionSelector
                        selectedEmotion={item.selectedEmotion}
                        onSelect={(emotion) =>
                          handleEmotionSelect(item.id, emotion)
                        }
                      />
                      <div
                        contentEditable="true"
                        onBlur={(e) => handleEdit(item.id, e.target.innerText)}
                        className="flex-1 break-words whitespace-pre-wrap overflow-x-hidden outline-none focus:outline-none focus:ring-0 empty:before:content-['Write_your_reflections_here...'] empty:before:text-gray-400"
                        style={{ caretColor: "auto" }}
                      >
                        {item.content}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div
            className={`transition-all duration-300 ease-in-out flex ${
              isSidebarCollapsed ? "w-8" : "w-80 opacity-100"
            }`}
          >
            <div className="relative flex-1 bg-gray-50 rounded-lg p-4 overflow-hidden">
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className={`absolute ${
                  isSidebarCollapsed
                    ? "left-1/2 -translate-x-1/2"
                    : "left-0 -translate-x-4"
                } top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors`}
                aria-label={
                  isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
                }
              >
                {isSidebarCollapsed ? (
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <div
                className={`transition-opacity duration-300 ${
                  isSidebarCollapsed ? "opacity-0" : "opacity-100"
                }`}
              >
                <h3 className="text-lg font-semibold mb-4">Insights</h3>
                <div className="space-y-4">
                  {insights.map((insight, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        insight.type === "success"
                          ? "bg-green-50 border border-green-200"
                          : insight.type === "warning"
                          ? "bg-yellow-50 border border-yellow-200"
                          : "bg-blue-50 border border-blue-200"
                      }`}
                    >
                      <h4
                        className={`font-medium mb-1 ${
                          insight.type === "success"
                            ? "text-green-700"
                            : insight.type === "warning"
                            ? "text-yellow-700"
                            : "text-blue-700"
                        }`}
                      >
                        {insight.title}
                      </h4>
                      <p
                        className={`text-sm ${
                          insight.type === "success"
                            ? "text-green-600"
                            : insight.type === "warning"
                            ? "text-yellow-600"
                            : "text-blue-600"
                        }`}
                      >
                        {insight.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
