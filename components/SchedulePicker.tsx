// components/SchedulePicker.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  Pressable,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function SchedulePicker() {
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const toggleDay = (dayIndex: number) => {
    setSelectedDays((prev) =>
      prev.includes(dayIndex)
        ? prev.filter((d) => d !== dayIndex)
        : [...prev, dayIndex]
    );
  };

  const scheduleNotifications = async () => {
    for (let day of selectedDays) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "BreakBuddy Reminder",
          body: "Time for your quick desk workout 💪",
        },
        trigger: {
          weekday: day + 1, // 1 (Sun) to 7 (Sat)
          hour: time.getHours(),
          minute: time.getMinutes(),
          type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
        },
      });
    }
    alert("Notifications scheduled!");
  };

  const cancelOne = async (id: string) => {
    await Notifications.cancelScheduledNotificationAsync(id);
  };
  const viewScheduledNotifications = async () => {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    console.log("🔔 Scheduled Notifications:", scheduled);
    // alert(`You have ${scheduled.length} scheduled notifications`);
    return (
      <ScrollView style={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
          Scheduled Notifications
        </Text>

        {scheduled.length === 0 && <Text>No notifications scheduled.</Text>}

        {scheduled.map((notif) => {
          const trigger = notif.trigger;
          let timeInfo = "Unknown";

          // Narrow the type: check if it's a calendar-based trigger
          if (trigger && "hour" in trigger && "minute" in trigger) {
            const day =
              "weekday" in trigger && trigger.weekday
                ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
                    trigger.weekday - 1
                  ]
                : "";

            timeInfo = `${day} at ${String(trigger.hour).padStart(
              2,
              "0"
            )}:${String(trigger.minute).padStart(2, "0")}`;
          }

          return (
            <View
              key={notif.identifier}
              style={
                {
                  /* styles */
                }
              }
            >
              <Text>{notif.content.title}</Text>
              <Text>{notif.content.body}</Text>
              <Text>{timeInfo}</Text>
              <Button
                title="Cancel"
                onPress={() => cancelOne(notif.identifier)}
              />
            </View>
          );
        })}
      </ScrollView>
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Pick a time:</Text>

      <Pressable onPress={() => setShowPicker(true)}>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>
          ⏰{" "}
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(e, selected) => {
            setShowPicker(false);
            if (selected) setTime(selected);
          }}
        />
      )}

      <Text style={{ fontSize: 20, marginVertical: 10 }}>Select days:</Text>
      <View
        style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 20 }}
      >
        {weekdays.map((day, i) => (
          <Pressable
            key={i}
            onPress={() => toggleDay(i)}
            style={{
              padding: 10,
              margin: 5,
              borderRadius: 8,
              backgroundColor: selectedDays.includes(i) ? "#4ade80" : "#e5e7eb",
            }}
          >
            <Text>{day}</Text>
          </Pressable>
        ))}
      </View>

      <Button title="Schedule Notifications" onPress={scheduleNotifications} />
      <Button
        title="View Scheduled Notifications"
        onPress={viewScheduledNotifications}
      />
    </View>
  );
}
