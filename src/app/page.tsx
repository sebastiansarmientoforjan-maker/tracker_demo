"use client";

import React, { useState } from "react";
import Calendar from "../components/Calendar";
import UnscheduledActivities from "../components/UnscheduledActivities";
import ActivityModal from "../components/ActivityModal";
import HolidayModal from "../components/HolidayModal";
import TeacherModal from "../components/TeacherModal";
import EditScheduleModal from "../components/EditScheduleModal";
import { useAuth } from "../components/AuthContext";
import { ScheduledActivity, Activity } from "../types";

const Home: React.FC = () => {
  const {
    user,
    classes,
    classDetails,
    classColors,
    scheduledActivities,
    setScheduledActivities,
    message,
  } = useAuth();

  // Lista inicial de actividades no programadas.
  const [unscheduledActivities, setUnscheduledActivities] = useState<Activity[]>([
    { id: "a1", title: "Actividad 1", unit: "Unit 1", classType: "Standard" },
    { id: "a2", title: "Actividad 2", unit: "Unit 2", classType: "Advanced" },
  ]);

  // Estado para la actividad que se está arrastrando.
  const [draggedActivity, setDraggedActivity] = useState<Activity | null>(null);

  // Cuando sueltas una actividad sobre el calendario.
  const handleDropOnCalendar = (
    activity: Activity,
    className: string,
    date: string
  ) => {
    const newScheduled: ScheduledActivity = {
      ...activity,
      class: className,
      date,
    };
    setScheduledActivities((prev) => [...prev, newScheduled]);
    // Elimina la actividad de la lista de no programadas.
    setUnscheduledActivities((prev) => prev.filter((a) => a.id !== activity.id));
    setDraggedActivity(null);
  };

  // Cuando comienzas a arrastrar una actividad.
  const handleDragStart = (activity: Activity) => {
    setDraggedActivity(activity);
  };

  return (
    <main className="min-h-screen p-4 flex flex-col items-center bg-gray-100 font-sans">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">8th Grade Tracker</h1>

      {user ? (
        <p className="mb-4 text-green-600">Sesión iniciada: {user.email}</p>
      ) : (
        <p className="mb-4 text-red-600">No hay usuario autenticado</p>
      )}

      <div className="flex flex-col md:flex-row w-full max-w-7xl gap-4">
        <div className="md:w-1/4">
          <UnscheduledActivities
            unscheduledActivities={unscheduledActivities}
            handleDragStart={handleDragStart}
          />
        </div>
        <div className="md:w-3/4">
          <Calendar
            classes={classes}
            classDetails={classDetails}
            classColors={classColors}
            scheduledActivities={scheduledActivities}
            setScheduledActivities={setScheduledActivities}
            draggedActivity={draggedActivity}
            setDraggedActivity={setDraggedActivity}
            handleDropOnCalendar={handleDropOnCalendar}
          />
        </div>
      </div>

      {/* Los modales aún son marcadores de posición */}
      <ActivityModal />
      <HolidayModal />
      <TeacherModal />
      <EditScheduleModal />

      {message && (
        <div className="mt-4 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md shadow">
          {message}
        </div>
      )}
    </main>
  );
};

export default Home;
