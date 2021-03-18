import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const CartScreen = (props) => {
  return (
    <View>
      <View style={styles.row}>
        <Text>Total sum $12</Text>
        <Button title='Order' />
      </View>
      <View style={styles.row}>
        <Text>2 book $12</Text>
        <Button title='delete' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
  },
});
export default CartScreen;
