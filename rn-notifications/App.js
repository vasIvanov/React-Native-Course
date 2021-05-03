import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  const [pushToken, setPushToken] = useState();
  //iOS require Permissions
  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        if (statusObj.status !== 'granted') {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== 'granted') {
          throw new Error('Permission not granted');
        }
      })
      .then(() => {
        return Notifications.getExpoPushTokenAsync();
      })
      .then((res) => {
        const token = res.data;
        setPushToken(token);
      })
      .catch((err) => {
        return null;
      });
  }, []);

  useEffect(() => {
    const backgroundSub = Notifications.addNotificationResponseReceivedListener(
      (res) => {
        console.log(res);
      }
    );

    const foregroundSub = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );

    return () => {
      backgroundSub.remove();
      foregroundSub.remove();
    };
  }, []);

  const triggerNotificationHandler = () => {
    // Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: 'My first local notification',
    //     body: 'This is first local notification',
    //   },
    //   trigger: {
    //     seconds: 10,
    //   },
    // });
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: pushToken,
        data: { extraData: 'some data' },
        title: 'Sent via the app',
        body: 'The notifu is from the app',
      }),
    });
  };

  return (
    <View style={styles.container}>
      <Button
        title='Trigger Notifications'
        onPress={triggerNotificationHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
