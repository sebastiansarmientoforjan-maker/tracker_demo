"use client";

import React from "react";
import type { Activity } from "../types";

interface UnscheduledActivitiesProps {
  unscheduledActivities: Activity[];
  handleDragStart: (activity: Activity) => void;
}

const UnscheduledActivities: React.FC<UnscheduledActivitiesProps> = ({
  unscheduledActivities,
  handleDragStart,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      {/* Cabecera */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Actividades sin programar
      </h2>
      {/* Lista de actividades */}
      <div className="space-y-3">
        {unscheduledActivities.map((activity) => (
          <div
            key={activity.id}
            draggable
            onDragStart={() => handleDragStart(activity)}
            className="p-3 bg-gray-100 rounded-md border border-gray-300 hover:bg-gray-200 cursor-grab select-none"
          >
            <p className="font-medium text-gray-700">{activity.title}</p>
            <p className="text-sm text-gray-500">
              Unidad: {activity.unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnscheduledActivities;
