import * as Notifications from "expo-notifications";

export async function scheduleExerciseNotification(
  hour: number,
  minute: number,
  weekday: number
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "BreakBuddy says: Time to Move!",
      body: "Do 10 sit-ups or a quick stretch!",
      sound: true,
    },
    trigger: {
      hour,
      minute,
      weekday,
      type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
    },
  });
}
