"use client";

import React, { useState } from "react";
import { doc, updateDoc, collection, Firestore } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import type { ScheduledActivity } from "../types";

interface ActivityModalProps {
  activityId?: string;
  initialData?: any;
  scheduledActivities?: ScheduledActivity[];
  setScheduledActivities?: React.Dispatch<
    React.SetStateAction<ScheduledActivity[]>
  >;
}

const ActivityModal: React.FC<ActivityModalProps> = ({
  activityId,
  initialData,
}) => {
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

  return <div className="hidden" />;
};

export default ActivityModal;
