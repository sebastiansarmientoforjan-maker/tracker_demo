export interface Activity {
  id: string;
  title: string;
  unit: string;
  classType: string;
}

export interface ScheduledActivity extends Activity {
  class: string;
  date: string;
}
