import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const OrdersScreen = (props) => {
  const [moreInfo, setMoreInfo] = useState(false);
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.limitInfo}>
          <Text>$12</Text>
          <Button title='More' onPress={() => setMoreInfo(!moreInfo)} />
          <Text>Date </Text>
        </View>
        {moreInfo ? (
          <View style={styles.moreInfo}>
            <Text>Items</Text>
            <Text>2 books $12</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Orders',
    headerLeft: () => {
      return (
        <Ionicons
          name='ios-menu'
          size={25}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      );
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    margin: 20,
    textAlign: 'center',
  },
  container: {
    borderWidth: 1,
    borderColor: 'black',
  },
  limitInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  moreInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default OrdersScreen;
