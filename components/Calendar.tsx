"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import JournalModal from "./JournalModal";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebaseConfig";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface ContinuousCalendarProps {
  onClick?: (_day: number, _month: number, _year: number) => void;
}

const Calendar: React.FC<ContinuousCalendarProps> = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<{
    day: number;
    month: number;
    year: number;
  } | null>(null);
  const today = new Date();
  const dayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());
  const [entryMoods, setEntryMoods] = useState<Map<string, string>>(new Map());
  const [user, setUser] = useState<User | null>(null);
  const monthOptions = monthNames.map((month, index) => ({
    name: month,
    value: `${index}`,
  }));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  // Fetch entry moods to show emoji indicators on calendar
  const fetchEntryMoods = useCallback(async () => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const response = await fetch("/api/journal/progress", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.entryMoods) {
          setEntryMoods(new Map(Object.entries(data.entryMoods)));
        }
      }
    } catch (error) {
      console.error("Failed to fetch entry moods:", error);
    }
  }, [user]);

  useEffect(() => {
    fetchEntryMoods();
  }, [fetchEntryMoods]);

  // Refresh entry moods when modal closes
  const handleModalClose = () => {
    setIsOpen(false);
    fetchEntryMoods();
  };

  useEffect(() => {
    // Scroll to today's date when component mounts
    scrollToDay(today.getMonth(), today.getDate());
  }, []);

  const scrollToDay = (monthIndex: number, dayIndex: number) => {
    const targetDayIndex = dayRefs.current.findIndex(
      (ref) =>
        ref &&
        ref.getAttribute("data-month") === `${monthIndex}` &&
        ref.getAttribute("data-day") === `${dayIndex}`
    );

    const targetElement = dayRefs.current[targetDayIndex];

    if (targetDayIndex !== -1 && targetElement) {
      const container = document.querySelector(".calendar-container");
      const elementRect = targetElement.getBoundingClientRect();
      const is2xl = window.matchMedia("(min-width: 1536px)").matches;
      const offsetFactor = is2xl ? 3 : 2.5;

      if (container) {
        const containerRect = container.getBoundingClientRect();
        const offset =
          elementRect.top -
          containerRect.top -
          containerRect.height / offsetFactor +
          elementRect.height / 2;

        container.scrollTo({
          top: container.scrollTop + offset,
          behavior: "smooth",
        });
      } else {
        const offset =
          window.scrollY +
          elementRect.top -
          window.innerHeight / offsetFactor +
          elementRect.height / 2;

        window.scrollTo({
          top: offset,
          behavior: "smooth",
        });
      }
    }
  };

  const handlePrevYear = () => setYear((prevYear) => prevYear - 1);
  const handleNextYear = () => setYear((prevYear) => prevYear + 1);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const monthIndex = parseInt(event.target.value, 10);
    setSelectedMonth(monthIndex);
    scrollToDay(monthIndex, 1);
  };

  const handleTodayClick = () => {
    setYear(today.getFullYear());
    scrollToDay(today.getMonth(), today.getDate());
  };

  const handleDayClick = (day: number, month: number, year: number) => {
    if (!onClick) {
      return;
    }
    if (month < 0) {
      onClick(day, 11, year - 1);
    } else {
      onClick(day, month, year);
    }
  };

  const handleModal = (day: number, month: number, year: number) => {
    setIsOpen(true);
    setSelectedDate({ day, month, year });
  };

  const generateCalendar = useMemo(() => {
    const today = new Date();

    const daysInYear = (): { month: number; day: number }[] => {
      const daysInYear = [];
      const startDayOfWeek = new Date(year, 0, 1).getDay();

      if (startDayOfWeek < 6) {
        for (let i = 0; i < startDayOfWeek; i++) {
          daysInYear.push({ month: -1, day: 32 - startDayOfWeek + i });
        }
      }

      for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
          daysInYear.push({ month, day });
        }
      }

      const lastWeekDayCount = daysInYear.length % 7;
      if (lastWeekDayCount > 0) {
        const extraDaysNeeded = 7 - lastWeekDayCount;
        for (let day = 1; day <= extraDaysNeeded; day++) {
          daysInYear.push({ month: 0, day });
        }
      }

      return daysInYear;
    };

    const calendarDays = daysInYear();

    const calendarWeeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      calendarWeeks.push(calendarDays.slice(i, i + 7));
    }

    // Pre-compute the first valid date index to avoid O(n²) check per cell
    const firstValidIndex = calendarDays.findIndex(
      ({ month, day }) => month >= 0 && new Date(year, month, day) <= today
    );

    const calendar = calendarWeeks.map((week, weekIndex) => (
      <div className="flex w-full" key={`week-${weekIndex}`}>
        {week.map(({ month, day }, dayIndex) => {
          const index = weekIndex * 7 + dayIndex;
          const isNewMonth =
            index === 0 || calendarDays[index - 1].month !== month;
          const isToday =
            today.getMonth() === month &&
            today.getDate() === day &&
            today.getFullYear() === year;

          const dateStr = `${year}-${month + 1}-${day}`;
          const entryMood = entryMoods.get(dateStr);
          const hasEntry = !!entryMood;

          const isFutureDate = new Date(year, month, day) > today;
          const isPastDate = !isToday && !isFutureDate;
          const isDisabledDate = isFutureDate || index < firstValidIndex || (isPastDate && !hasEntry);

          const moodEmojiMap: Record<string, string> = {
            Happy: "🌟",
            Sad: "🌧️",
            Excited: "⚡",
            Peaceful: "🌸",
            Anxious: "🌊",
            Tired: "😴",
            Neutral: "😐",
          };

          return (
            <div
              key={`${month}-${day}`}
              ref={(el) => {
                dayRefs.current[index] = el;
              }}
              data-month={month}
              data-day={day}
              onClick={(e) => {
                if (!isDisabledDate) {
                  handleDayClick(day, month, year);
                  handleModal(day, month, year);
                }
              }}
              className={`relative m-[-0.5px] group aspect-square w-full grow rounded-lg border border-sand-200/40 font-medium transition-all duration-300 sm:-m-px sm:rounded-xl sm:border md:rounded-2xl lg:rounded-3xl ${
                isDisabledDate ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:border-rose-300 hover:shadow-soft"
              } ${
                hasEntry ? "bg-gradient-to-br from-rose-50/60 to-rose-100/40 border-rose-200/60" : ""
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 flex size-4 items-center justify-center rounded-full text-[10px] sm:size-5 sm:text-xs sm:left-1 sm:top-1 md:size-6 md:text-sm lg:left-2 lg:top-2 lg:size-8 lg:text-base ${
                  isToday ? "bg-rose-300 font-semibold text-white shadow-glow" : ""
                } ${
                  month < 0 || isFutureDate
                    ? "text-sand-400"
                    : "text-sand-700"
                }`}
              >
                {day}
              </span>
              {hasEntry && entryMood && (
                <span className="absolute flex items-center justify-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm sm:text-lg md:text-2xl lg:text-4xl 2xl:text-5xl" title={entryMood}>
                  {moodEmojiMap[entryMood] || "😐"}
                </span>
              )}
              {isNewMonth && (
                <span className="absolute bottom-0 left-0 w-full truncate px-0.5 text-[9px] font-medium text-sand-300/70 sm:text-sm sm:px-1.5 md:text-lg lg:bottom-2.5 lg:left-3.5 lg:-mb-1 lg:w-fit lg:px-0 lg:text-xl 2xl:mb-[-4px] 2xl:text-2xl">
                  {monthNames[month]}
                </span>
              )}
              {!isFutureDate && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModal(day, month, year);
                  }}
                  className="absolute right-1 top-1 sm:right-2 sm:top-2 rounded-full opacity-0 transition-all focus:opacity-100 group-hover:opacity-100"
                >
                  <svg
                    className="size-5 sm:size-8 scale-90 text-rose-300 transition-all hover:scale-100 group-focus:scale-100"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          );
        })}
      </div>
    ));

    return <div>{calendar}</div>;
  }, [year, entryMoods]);

  useEffect(() => {
    const calendarContainer = document.querySelector(".calendar-container");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const month = parseInt(
              entry.target.getAttribute("data-month")!,
              10
            );
            setSelectedMonth(month);
          }
        });
      },
      {
        root: calendarContainer,
        rootMargin: "-75% 0px -25% 0px",
        threshold: 0,
      }
    );

    dayRefs.current.forEach((ref) => {
      if (ref && ref.getAttribute("data-day") === "15") {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="scrollbar-hide calendar-container max-h-full overflow-y-scroll rounded-t-3xl bg-sand-50/90 backdrop-blur-sm pb-10 text-sand-800">
      <div className="sticky -top-px z-[10] w-full rounded-t-2xl sm:rounded-t-3xl bg-sand-50/95 backdrop-blur-xl px-3 pt-5 sm:px-5 sm:pt-7 md:px-8 md:pt-8 border-b border-sand-200/30">
        <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Select
              name="month"
              value={`${selectedMonth}`}
              options={monthOptions}
              onChange={handleMonthChange}
            />
            <button
              onClick={handleTodayClick}
              type="button"
              className="rounded-2xl border border-sand-200 bg-white/60 px-3 py-1.5 text-sm font-medium text-sand-700 hover:bg-sand-100 transition-all duration-300 lg:px-5 lg:py-2.5"
            >
              Today
            </button>
          </div>
          <div className="flex w-fit items-center justify-between">
            <button
              onClick={handlePrevYear}
              className="rounded-full border border-sand-200 p-1 transition-all duration-300 hover:bg-sand-100 sm:p-2"
            >
              <svg
                className="size-5 text-sand-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m15 19-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="min-w-16 text-center text-lg font-medium text-sand-800 sm:min-w-20 sm:text-xl">
              {year}
            </h1>
            <button
              onClick={handleNextYear}
              className="rounded-full border border-sand-200 p-1 transition-all duration-300 hover:bg-sand-100 sm:p-2"
            >
              <svg
                className="size-5 text-sand-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m9 5 7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid w-full grid-cols-7 justify-between text-sand-500">
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className="w-full border-b border-sand-200/40 py-2 text-center text-sm font-medium"
            >
              {day}
            </div>
          ))}
        </div>
      </div>
      {isOpen && selectedDate && (
        <JournalModal
          isOpen={isOpen}
          selectedDate={selectedDate}
          onClose={handleModalClose}
        />
      )}
      <div className="w-full px-3 pt-3 sm:px-5 sm:pt-4 md:px-8 md:pt-6">{generateCalendar}</div>
    </div>
  );
};

export interface SelectProps {
  name: string;
  value: string;
  label?: string;
  options: { name: string; value: string }[];
  onChange: (_event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export const Select = ({
  name,
  value,
  label,
  options = [],
  onChange,
  className,
}: SelectProps) => (
  <div className={`relative ${className}`}>
    {label && (
      <label htmlFor={name} className="mb-2 block font-medium text-slate-800">
        {label}
      </label>
    )}
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="cursor-pointer rounded-2xl border border-sand-200 bg-white/60 py-1.5 pl-2 pr-6 text-sm font-medium text-sand-700 hover:bg-sand-100 transition-all duration-300 sm:rounded-2xl sm:py-2.5 sm:pl-3 sm:pr-8"
      required
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-1 sm:pr-2">
      <svg
        className="size-5 text-sand-500"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  </div>
);
export default Calendar;
