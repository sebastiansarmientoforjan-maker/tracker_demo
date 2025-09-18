"use client";

import React from "react";
import type { ScheduledActivity, Activity } from "../types";

interface CalendarProps {
  classes: string[];
  classDetails: Record<string, any>;
  classColors: Record<string, string>;
  scheduledActivities: ScheduledActivity[];
  setScheduledActivities: React.Dispatch<React.SetStateAction<ScheduledActivity[]>>;
  draggedActivity: Activity | null;
  setDraggedActivity: React.Dispatch<React.SetStateAction<Activity | null>>;
  handleDropOnCalendar: (activity: Activity, className: string, date: string) => void;
}

/**
 * Simplified placeholder calendar component. Renders a basic grid of dates and
 * displays scheduled activities. Allows dropping an activity onto a cell by
 * clicking it when draggedActivity is set.
 */
const Calendar: React.FC<CalendarProps> = ({
  classes,
  classDetails,
  classColors,
  scheduledActivities,
  setScheduledActivities,
  draggedActivity,
  setDraggedActivity,
  handleDropOnCalendar,
}) => {
  // For demonstration, generate a static list of dates (e.g., 7 days). In a
  // real application you would generate this based on the current month.
  const dates = Array.from({ length: 7 }, (_, i) => `2025-09-2${i + 1}`);

  return (
    <div className="grid grid-cols-7 gap-2">
      {dates.map((date) => (
        <div
          key={date}
          className="border p-2 min-h-[100px]"
          onClick={() => {
            if (draggedActivity) {
              // Schedule the dragged activity in the first class for simplicity
              handleDropOnCalendar(draggedActivity, classes[0] ?? "default", date);
            }
          }}
        >
          <div className="font-bold mb-1">{date}</div>
          {scheduledActivities
            .filter((act) => act.date === date)
            .map((act) => (
              <div key={act.id} className="text-sm bg-blue-200 p-1 rounded mb-1">
                {act.title}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Calendar;