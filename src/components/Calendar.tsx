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
  // Generamos 7 fechas de ejemplo.
  const dates = Array.from({ length: 7 }, (_, i) => `2025-09-2${i + 1}`);

  return (
    <div className="grid grid-cols-7 gap-2">
      {dates.map((date) => (
        <div
          key={date}
          className="border p-2 min-h-[100px]"
          // Permite soltar elementos.
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            if (draggedActivity) {
              handleDropOnCalendar(
                draggedActivity,
                classes[0] ?? "default",
                date
              );
              setDraggedActivity(null);
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
