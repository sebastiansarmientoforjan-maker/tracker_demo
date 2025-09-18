"use client";

import React from "react";
import type { ScheduledActivity, Activity } from "../types";

interface CalendarProps {
  classes: string[];
  classDetails: Record<string, any>;
  classColors: Record<string, string>;
  scheduledActivities: ScheduledActivity[];
  setScheduledActivities: React.Dispatch<
    React.SetStateAction<ScheduledActivity[]>
  >;
  draggedActivity: Activity | null;
  setDraggedActivity: React.Dispatch<React.SetStateAction<Activity | null>>;
  handleDropOnCalendar: (
    activity: Activity,
    className: string,
    date: string
  ) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  classes,
  classColors,
  scheduledActivities,
  draggedActivity,
  setDraggedActivity,
  handleDropOnCalendar,
}) => {
  // Etiquetas de días en español
  const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  // Para la demo generamos 7 fechas; puedes generar el mes completo dinámicamente
  const dates = Array.from({ length: 7 }, (_, i) => `2025-09-2${i + 1}`);

  return (
    <div className="space-y-2">
      {/* Encabezado con días de la semana */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-gray-600"
          >
            {day}
          </div>
        ))}
      </div>
      {/* Celdas del calendario */}
      <div className="grid grid-cols-7 gap-2">
        {dates.map((date) => (
          <div
            key={date}
            className="min-h-[120px] bg-white border border-gray-200 rounded-lg p-2"
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
            {/* Etiqueta de la fecha */}
            <div className="text-xs font-semibold text-gray-500 mb-1">
              {date}
            </div>
            {/* Muestra las actividades programadas para esta fecha */}
            {scheduledActivities
              .filter((act) => act.date === date)
              .map((act) => (
                <div
                  key={act.id}
                  className="text-xs font-medium rounded mb-1 px-1 py-0.5"
                  style={{
                    backgroundColor: classColors[act.class] || "#bfdbfe",
                    color: "#fff",
                  }}
                >
                  {act.title}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
