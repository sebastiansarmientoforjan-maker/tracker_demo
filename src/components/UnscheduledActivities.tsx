"use client";

import React from "react";
import type { Activity } from "../types";

interface UnscheduledActivitiesProps {
  unscheduledActivities: Activity[];
  handleDragStart: (activity: Activity) => void;
}

/**
 * Lista de actividades no programadas. Cada elemento es draggable y al iniciar
 * el drag se envía al padre.
 */
const UnscheduledActivities: React.FC<UnscheduledActivitiesProps> = ({
  unscheduledActivities,
  handleDragStart,
}) => {
  return (
    <div className="p-2 border rounded-md bg-white shadow">
      <h2 className="text-lg font-semibold mb-2">Actividades sin programar</h2>
      <ul className="list-none p-0 m-0">
        {unscheduledActivities.map((activity) => (
          <li
            key={activity.id}
            draggable={true}
            onDragStart={() => handleDragStart(activity)}
            className="mb-1 p-2 border rounded bg-gray-50 cursor-grab"
          >
            {activity.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnscheduledActivities;
