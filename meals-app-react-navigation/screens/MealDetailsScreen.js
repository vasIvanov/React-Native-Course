import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const MealDetailsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>MealDetailsScreen</Text>
      <Button
        title='Go to Categories'
        onPress={() => props.navigation.popToTop()}
      />
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
export default MealDetailsScreen;
