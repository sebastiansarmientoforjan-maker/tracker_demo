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

/**
 * Home page of the tracker application. This page displays a calendar and a list of
 * unscheduled activities that can be dragged onto the calendar. It also renders
 * various modals (activity, holiday, teacher, and schedule editing). The state
 * for scheduled activities is managed via the Auth context.
 */
const Home: React.FC = () => {
  // Destructure values from the authentication context. These include the
  // authenticated user, class lists and colours, scheduled activities state
  // and setter, and any message to display to the user.
  const {
    user,
    classes,
    classDetails,
    classColors,
    scheduledActivities,
    setScheduledActivities,
    message,
  } = useAuth();

  // Local state for activities that haven’t been scheduled yet. These can be
  // dragged and dropped onto the calendar. This example initialises two
  // placeholder activities.
  const [unscheduledActivities, setUnscheduledActivities] = useState<Activity[]>([
    { id: "a1", title: "Actividad 1", unit: "Unit 1", classType: "Standard" },
    { id: "a2", title: "Actividad 2", unit: "Unit 2", classType: "Advanced" },
  ]);

  // Track which activity is currently being dragged. When drag starts, this
  // becomes the activity; when dropped it becomes null again.
  const [draggedActivity, setDraggedActivity] = useState<Activity | null>(null);

  // Handler for dropping an activity onto the calendar. It creates a new
  // ScheduledActivity, appends it to the scheduled list via the context setter,
  // removes the activity from the unscheduled list, and resets the drag state.
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
    setUnscheduledActivities((prev) =>
      prev.filter((a) => a.id !== activity.id)
    );
    setDraggedActivity(null);
  };

  // Handler for initiating a drag; stores the dragged activity so that the
  // calendar drop handler knows what to schedule.
  const handleDragStart = (activity: Activity) => {
    setDraggedActivity(activity);
  };

  return (
    <main className="min-h-screen p-4 flex flex-col items-center bg-gray-100 font-sans">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">8th Grade Tracker</h1>

      {user ? (
        <p className="mb-4 text-green-600">
          Sesión iniciada: {user.email}
        </p>
      ) : (
        <p className="mb-4 text-red-600">No hay usuario autenticado</p>
      )}

      <div className="flex flex-col md:flex-row w-full max-w-7xl gap-4">
        {/* Left pane: list of unscheduled activities */}
        <div className="md:w-1/4">
          <UnscheduledActivities
            unscheduledActivities={unscheduledActivities}
            handleDragStart={handleDragStart}
          />
        </div>

        {/* Right pane: calendar */}
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

      {/* Render the modals without passing scheduledActivities or setScheduledActivities */}
      <ActivityModal />
      <HolidayModal />
      <TeacherModal />
      <EditScheduleModal />

      {/* Display any message from the context */}
      {message && (
        <div className="mt-4 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md shadow">
          {message}
        </div>
      )}
    </main>
  );
};

export default Home;
