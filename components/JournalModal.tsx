import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  X,
  CheckSquare,
  Square,
  ChevronRight,
  ChevronLeft,
  Circle,
  Sparkles,
} from "lucide-react";
import { POST } from "@/app/api/stories/route";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { User } from "firebase/auth";
import ScribbleButton from "@/components/ScribbleButton";

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
    index: number,
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
            '[data-todo-item="true"]',
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
    index: number,
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
            '[data-bullet-item="true"]',
          );
          const lastItem = listItems[listItems.length - 1];
          if (lastItem instanceof HTMLElement) {
            lastItem.focus();
          }
        }, 0);
      } else {
        // Move to next existing item
        const listItems = container.querySelectorAll(
          '[data-bullet-item="true"]',
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
          '[data-bullet-item="true"]',
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
    item: { id: string; text: string },
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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: { day: number; month: number; year: number } | null;
}

const emotions = [
  {
    emoji: "🌟",
    name: "Happy",
    color: "bg-gradient-to-br from-cream-100 to-cream-50 shadow-soft",
    hover: "hover:from-cream-200 hover:to-cream-100 hover:shadow-warm",
  },
  {
    emoji: "🌧️",
    name: "Sad",
    color: "bg-gradient-to-br from-calm-100 to-calm-50 shadow-soft",
    hover: "hover:from-calm-200 hover:to-calm-100 hover:shadow-warm",
  },
  {
    emoji: "⚡",
    name: "Excited",
    color: "bg-gradient-to-br from-rose-100 to-rose-50 shadow-soft",
    hover: "hover:from-rose-200 hover:to-rose-100 hover:shadow-warm",
  },
  {
    emoji: "🌸",
    name: "Peaceful",
    color: "bg-gradient-to-br from-sage-100 to-sage-50 shadow-soft",
    hover: "hover:from-sage-200 hover:to-sage-100 hover:shadow-warm",
  },
  {
    emoji: "🌊",
    name: "Anxious",
    color: "bg-gradient-to-br from-lavender-100 to-lavender-50 shadow-soft",
    hover: "hover:from-lavender-200 hover:to-lavender-100 hover:shadow-warm",
  },
  {
    emoji: "😴",
    name: "Tired",
    color: "bg-gradient-to-br from-sand-100 to-sand-50 shadow-soft",
    hover: "hover:from-sand-200 hover:to-sand-100 hover:shadow-warm",
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
          className={`p-2.5 rounded-2xl flex flex-col items-center transition-all duration-300 w-16 h-16 justify-center ${
            emotion.color
          } ${
            selectedEmotion === emotion.name
              ? "ring-2 ring-lavender-400 scale-105"
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

  interface AIInsights {
    mood_reflection: string;
    pattern_insight: string | null;
    gentle_prompt: string;
    coping_suggestion: string | null;
  }

  const [aiInsights, setAiInsights] = useState<AIInsights | null>(null);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [entryLoading, setEntryLoading] = useState(false);
  const [groqKey, setGroqKey] = useState<string>("");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [keyInput, setKeyInput] = useState("");

  // Load saved API key from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("calmcove_groq_key");
    if (saved) setGroqKey(saved);
  }, []);

  const saveGroqKey = () => {
    const trimmed = keyInput.trim();
    if (trimmed) {
      localStorage.setItem("calmcove_groq_key", trimmed);
      setGroqKey(trimmed);
      setShowKeyInput(false);
      setKeyInput("");
    }
  };

  const removeGroqKey = () => {
    localStorage.removeItem("calmcove_groq_key");
    setGroqKey("");
    setAiInsights(null);
  };

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
      (t) => t.id === todoId,
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
      (t) => t.id === todoId,
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
        (t) => t.id !== todoId,
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

  const fetchAIInsights = useCallback(async () => {
    if (!user || !selectedDate || !groqKey) return;
    setInsightsLoading(true);
    try {
      const token = await user.getIdToken();

      const moodItem = items.find((i) => i.id === "mood");
      const gratitudeItem = items.find((i) => i.id === "gratitude");
      const winsItem = items.find((i) => i.id === "accomplishments");
      const goalsItem = items.find((i) => i.id === "tomorrow-goals");
      const ideasItem = items.find((i) => i.id === "ideas");

      const currentEntry = {
        mood: moodItem?.selectedEmotion || null,
        personal_reflections: moodItem?.content || "",
        gratitude_list: gratitudeItem?.todos
          .map((t) => t.text)
          .filter(Boolean)
          .join(", "),
        todays_wins: winsItem?.todos
          .map((t) => t.text)
          .filter(Boolean)
          .join(", "),
        goals_for_tomorrow: goalsItem?.todos
          .map((t) => t.text)
          .filter(Boolean)
          .join(", "),
        creative_ideas: ideasItem?.todos
          .map((t) => t.text)
          .filter(Boolean)
          .join(", "),
      };

      const res = await fetch("/api/ai/insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-AI-Key": groqKey,
        },
        body: JSON.stringify({ currentEntry }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data._error) {
          console.error("[AI Insights] Server error:", data._error);
        }
        setAiInsights(data);
      } else {
        console.error(
          "[AI Insights] Request failed:",
          res.status,
          await res.text(),
        );
      }
    } catch (error) {
      console.error("Failed to fetch AI insights:", error);
    } finally {
      setInsightsLoading(false);
    }
  }, [user, selectedDate, items, groqKey]);

  // Load existing journal entry when modal opens for a specific date
  useEffect(() => {
    if (!isOpen || !selectedDate || !user) return;

    const loadEntry = async () => {
      setEntryLoading(true);
      try {
        const dateStr = `${selectedDate.year}-${selectedDate.month + 1}-${selectedDate.day}`;
        const token = await user.getIdToken();
        const response = await fetch(`/api/journal?date=${dateStr}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) return;
        const entry = await response.json();
        if (!entry || (Array.isArray(entry) && entry.length === 0)) return;

        const data = Array.isArray(entry) ? entry[0] : entry;
        if (!data) return;

        setItems((prev) => {
          const newItems = [...prev];

          // Restore mood
          const moodIdx = newItems.findIndex((i) => i.id === "mood");
          if (moodIdx !== -1) {
            newItems[moodIdx] = {
              ...newItems[moodIdx],
              selectedEmotion: data.mood || undefined,
              content: data.personal_reflections || "",
            };
          }

          // Restore daily tasks
          const todoIdx = newItems.findIndex((i) => i.id === "todo-list");
          if (todoIdx !== -1 && data.daily_tasks) {
            try {
              const tasks = JSON.parse(data.daily_tasks);
              if (tasks.length > 0) {
                newItems[todoIdx] = { ...newItems[todoIdx], todos: tasks };
              }
            } catch {}
          }

          // Restore gratitude
          const gratIdx = newItems.findIndex((i) => i.id === "gratitude");
          if (gratIdx !== -1 && data.gratitude_list) {
            const lines = data.gratitude_list
              .split("\n")
              .filter((l: string) => l.trim());
            if (lines.length > 0) {
              newItems[gratIdx] = {
                ...newItems[gratIdx],
                todos: lines.map((text: string, i: number) => ({
                  id: `g${i + 1}`,
                  text,
                  completed: false,
                })),
              };
            }
          }

          // Restore wins
          const winsIdx = newItems.findIndex((i) => i.id === "accomplishments");
          if (winsIdx !== -1 && data.todays_wins) {
            const lines = data.todays_wins
              .split("\n")
              .filter((l: string) => l.trim());
            if (lines.length > 0) {
              newItems[winsIdx] = {
                ...newItems[winsIdx],
                todos: lines.map((text: string, i: number) => ({
                  id: `a${i + 1}`,
                  text,
                  completed: false,
                })),
              };
            }
          }

          // Restore ideas
          const ideasIdx = newItems.findIndex((i) => i.id === "ideas");
          if (ideasIdx !== -1 && data.creative_ideas) {
            const lines = data.creative_ideas
              .split("\n")
              .filter((l: string) => l.trim());
            if (lines.length > 0) {
              newItems[ideasIdx] = {
                ...newItems[ideasIdx],
                todos: lines.map((text: string, i: number) => ({
                  id: `i${i + 1}`,
                  text,
                  completed: false,
                })),
              };
            }
          }

          // Restore goals
          const goalsIdx = newItems.findIndex((i) => i.id === "tomorrow-goals");
          if (goalsIdx !== -1 && data.goals_for_tomorrow) {
            const lines = data.goals_for_tomorrow
              .split("\n")
              .filter((l: string) => l.trim());
            if (lines.length > 0) {
              newItems[goalsIdx] = {
                ...newItems[goalsIdx],
                todos: lines.map((text: string, i: number) => ({
                  id: `t${i + 1}`,
                  text,
                  completed: false,
                })),
              };
            }
          }

          // Restore habits
          const habitsIdx = newItems.findIndex((i) => i.id === "habits");
          if (habitsIdx !== -1 && data.habit_tracker) {
            try {
              const habits = JSON.parse(data.habit_tracker);
              if (habits.length > 0) {
                newItems[habitsIdx] = { ...newItems[habitsIdx], todos: habits };
              }
            } catch {}
          }

          return newItems;
        });
      } catch (error) {
        console.error("Failed to load journal entry:", error);
      } finally {
        setEntryLoading(false);
      }
    };

    loadEntry();
  }, [isOpen, selectedDate, user]);

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

  return createPortal(
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center bg-sand-900/30 backdrop-blur-sm transition-all duration-300 ${
        isOpen ? "opacity-100 visible " : "opacity-0 invisible"
      }`}
    >
      <div className="journal-page p-6 rounded-3xl h-[90vh] w-[90vw] shadow-warm flex flex-col border border-sand-300/40">
        {entryLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="animate-pulse text-4xl mb-3">📖</div>
            <p className="text-sm text-sand-500 font-medium">
              Loading your entry...
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4 pl-12 relative z-10">
              <h2
                className="text-2xl font-bold text-sand-800"
                style={{ fontFamily: "'Virgil', cursive" }}
              >
                📖 {selectedDate?.day}/{(selectedDate?.month ?? 0) + 1}/
                {selectedDate?.year}
              </h2>
              <div className="flex items-center gap-3">
                <ScribbleButton
                  onClick={handleSave}
                  className="text-sm px-5 py-2"
                >
                  Save Entry ✏️
                </ScribbleButton>
                <button
                  onClick={onClose}
                  className="text-sand-500 hover:text-sand-700 transition-colors p-1"
                >
                  <X />
                </button>
              </div>
            </div>
            <div className="flex-1 min-h-0 flex gap-6 pl-12 relative z-10">
              <div className="flex-1 flex flex-col lg:grid lg:grid-cols-3 gap-4 lg:gap-4 overflow-y-auto p-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`journal-card rounded-2xl hover:border-sand-400/60 transition-all duration-300 p-4 flex flex-col mb-4 lg:mb-0 ${
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
                            suppressContentEditableWarning={true}
                            onBlur={(e) =>
                              handleEdit(item.id, e.target.innerText)
                            }
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
                <div className="relative flex-1 bg-sand-100/50 rounded-2xl p-4 overflow-hidden border border-sand-200/40 backdrop-blur-sm">
                  <button
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className={`absolute ${
                      isSidebarCollapsed
                        ? "left-1/2 -translate-x-1/2"
                        : "left-0 -translate-x-4"
                    } top-1/2 -translate-y-1/2 w-8 h-8 bg-sand-50 rounded-full shadow-soft flex items-center justify-center hover:bg-sand-100 transition-all duration-300 border border-sand-200/40`}
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
                    className={`transition-opacity duration-300 overflow-y-auto max-h-full ${
                      isSidebarCollapsed ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-sand-800 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-lavender-500" />
                        Insights
                      </h3>
                      {!isSidebarCollapsed && groqKey && (
                        <button
                          onClick={fetchAIInsights}
                          disabled={insightsLoading}
                          className="text-xs px-2 py-1 rounded-full bg-lavender-100/60 text-lavender-600 hover:bg-lavender-200/60 transition-colors disabled:opacity-50"
                        >
                          {insightsLoading ? "Thinking..." : "Refresh ✨"}
                        </button>
                      )}
                    </div>

                    {!groqKey ? (
                      <div className="space-y-3">
                        <div className="p-4 rounded-2xl bg-lavender-50/80 border border-lavender-200/40">
                          <p className="text-sm text-lavender-700 mb-3">
                            ✨ Get personalized AI insights that reflect your
                            emotions and patterns.
                          </p>
                          <p className="text-xs text-lavender-600 mb-3">
                            You'll need a free Groq API key — no credit card
                            required. It takes 30 seconds:
                          </p>
                          <ol className="text-xs text-lavender-600 space-y-1 mb-4 list-decimal list-inside">
                            <li>
                              Go to{" "}
                              <a
                                href="https://console.groq.com/keys"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline font-medium hover:text-lavender-800"
                              >
                                console.groq.com/keys
                              </a>
                            </li>
                            <li>Sign up (free) &amp; click "Create API Key"</li>
                            <li>Paste it below</li>
                          </ol>
                          {showKeyInput ? (
                            <div className="space-y-2">
                              <input
                                type="password"
                                value={keyInput}
                                onChange={(e) => setKeyInput(e.target.value)}
                                onKeyDown={(e) =>
                                  e.key === "Enter" && saveGroqKey()
                                }
                                placeholder="Paste your API key here..."
                                className="w-full text-xs px-3 py-2 rounded-xl border border-lavender-200 bg-white/80 focus:outline-none focus:ring-1 focus:ring-lavender-300"
                                style={{ fontFamily: "monospace" }}
                              />
                              <div className="flex gap-2 justify-end">
                                <button
                                  onClick={saveGroqKey}
                                  className="text-xs px-3 py-1.5 rounded-xl border border-lavender-200 text-lavender-600 hover:bg-lavender-50 transition-colors"
                                >
                                  Save Key
                                </button>
                                <button
                                  onClick={() => {
                                    setShowKeyInput(false);
                                    setKeyInput("");
                                  }}
                                  className="text-xs px-3 py-1.5 rounded-xl border border-lavender-200 text-lavender-600 hover:bg-lavender-50 transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                              <p className="text-[10px] text-lavender-400">
                                🔒 Your key is stored locally in your browser
                                only. Never sent anywhere except Groq's API.
                              </p>
                            </div>
                          ) : (
                            <button
                              onClick={() => setShowKeyInput(true)}
                              className="w-full text-sm px-4 py-2 rounded-xl bg-lavender-500 text-sand-500 hover:bg-sand-200 transition-colors"
                            >
                              Set Up AI Insights
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {insightsLoading ? (
                          <div className="flex flex-col items-center justify-center py-8 text-sand-400">
                            <div className="animate-pulse text-2xl mb-2">
                              🌱
                            </div>
                            <p className="text-sm">
                              Reflecting on your words...
                            </p>
                          </div>
                        ) : aiInsights ? (
                          <>
                            <div className="p-3 rounded-2xl bg-sage-50/80 border border-sage-200/40">
                              <h4 className="font-medium mb-1 text-xs text-sage-700">
                                🌿 Mood Reflection
                              </h4>
                              <p className="text-sm leading-relaxed text-sage-600">
                                {aiInsights.mood_reflection}
                              </p>
                            </div>
                            {aiInsights.pattern_insight && (
                              <div className="p-3 rounded-2xl bg-lavender-50/80 border border-lavender-200/40">
                                <h4 className="font-medium mb-1 text-xs text-lavender-700">
                                  💜 Pattern Insight
                                </h4>
                                <p className="text-sm leading-relaxed text-lavender-600">
                                  {aiInsights.pattern_insight}
                                </p>
                              </div>
                            )}
                            <div className="p-3 rounded-2xl bg-cream-50/80 border border-cream-200/40">
                              <h4 className="font-medium mb-1 text-xs text-cream-700">
                                🌤️ Gentle Prompt
                              </h4>
                              <p className="text-sm leading-relaxed text-cream-600 italic">
                                {aiInsights.gentle_prompt}
                              </p>
                            </div>
                            {aiInsights.coping_suggestion && (
                              <div className="p-3 rounded-2xl bg-rose-50/80 border border-rose-200/40">
                                <h4 className="font-medium mb-1 text-xs text-rose-700">
                                  🌸 Coping Suggestion
                                </h4>
                                <p className="text-sm leading-relaxed text-rose-600">
                                  {aiInsights.coping_suggestion}
                                </p>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-8 text-sand-400">
                            <p className="text-sm text-center">
                              Click "Refresh ✨" to get personalized insights
                              based on your entry
                            </p>
                          </div>
                        )}
                        <button
                          onClick={removeGroqKey}
                          className="w-full text-[10px] text-sand-400 hover:text-sand-600 transition-colors mt-2"
                        >
                          Remove API Key
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
