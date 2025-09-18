"use client";

import React, { useState } from "react";
import { doc, updateDoc, collection, Firestore } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import type { ScheduledActivity } from "../types";

/**
 * Props for ActivityModal. In addition to the optional identifiers for the
 * activity to be edited, it accepts optional scheduledActivities and
 * setScheduledActivities props purely for type-compatibility with older
 * call sites. These are ignored by the component itself.
 */
interface ActivityModalProps {
  activityId?: string;
  initialData?: any;
  scheduledActivities?: ScheduledActivity[];
  setScheduledActivities?: React.Dispatch<React.SetStateAction<ScheduledActivity[]>>;
}

/**
 * Modal component for editing an activity. Fetches the Firestore instance and
 * user from context and allows updating the activity document. The UI is
 * intentionally hidden here; you can expose it when you are ready to show
 * the modal.
 */
const ActivityModal: React.FC<ActivityModalProps> = ({ activityId, initialData }) => {
  const { db, user } = useAuth();

  const [activityName, setActivityName] = useState(initialData?.name || "");
  const [activityDescription, setActivityDescription] = useState(
    initialData?.description || ""
  );

  const updateActivity = async () => {
    if (!user || !db || !activityId) {
      console.error(
        "Usuario no autenticado, base de datos no disponible o ID de actividad faltante."
      );
      return;
    }

    try {
      const updatedActivityData = {
        name: activityName,
        description: activityDescription,
        updatedAt: new Date(),
      };

      const activityDocRef = doc(
        collection(db as Firestore, `artifacts/${user.uid}/activities`),
        activityId
      );
      await updateDoc(activityDocRef, updatedActivityData);
      console.log("Actividad actualizada exitosamente con ID: ", activityId);
    } catch (e) {
      console.error("Error al actualizar la actividad: ", e);
    }
  };

  // Hide the modal by default. Insert your own UI here when ready.
  return <div className="hidden" />;
};

export default ActivityModal;
