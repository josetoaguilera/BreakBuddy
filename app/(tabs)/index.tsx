// app/index.tsx
import { View, Button } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import * as Notifications from "expo-notifications";
import { scheduleExerciseNotification } from "../../utils/scheduler"; // assume you saved it there
import SchedulePicker from "@/components/SchedulePicker";

export default function HomeScreen() {
  const router = useRouter();
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        // console.log("User tapped notification:", response);

        // Example: Navigate to a specific screen
        router.push("/explore"); // Slash is needed
      }
    );

    return () => {
      subscription.remove(); // Clean up listener
    };
  }, []);

  // async function scheduleNotification() {
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "Time to Move!",
  //       body: "Stand up and stretch! 🚶‍♂️",
  //     },
  //     trigger: {
  //       type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
  //       seconds: 5,
  //       repeats: false,
  //     },
  //   });
  // }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* <Button title="Schedule Exercise" onPress={scheduleNotification} /> */}
      {/* <Button
        title="Remind me at 10:30 AM every day"
        onPress={() => scheduleExerciseNotification(21, 15, 3)}
      /> */}
      <SchedulePicker />
    </View>
  );
}
