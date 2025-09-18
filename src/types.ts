/**
 * Represents an unscheduled activity. These items can be dragged from the
 * unscheduled list onto the calendar. They do not yet have a class or date.
 */
export interface Activity {
  id: string;
  title: string;
  unit: string;
  classType: string;
}

/**
 * Represents an activity scheduled on the calendar. Extends Activity by
 * specifying the class and date to which it has been assigned.
 */
export interface ScheduledActivity extends Activity {
  class: string;
  date: string;
}