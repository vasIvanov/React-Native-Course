import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const CategoriesScreen = (props) => {
  console.log(props);
  return (
    <View style={styles.screen}>
      <Text>categories screen</Text>
      <Button title='Go to Meals' />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoriesScreen;
