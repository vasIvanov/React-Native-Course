import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';

const CategoryMealsScreen = (props) => {
  const catId = props.navigation.getParam('categoryId');
  const selectedCat = CATEGORIES.find((c) => c.id === catId);
  return (
    <View style={styles.screen}>
      <Text>CategoryMealsScreen</Text>
      <Text>{selectedCat.title}</Text>
      <Button
        title='Go to Details'
        onPress={() => {
          props.navigation.navigate({ routeName: 'MealDetail' });
          // props.navigation.push('MealDetail');
        }}
      />
      <Button title='Go Back' onPress={() => props.navigation.goBack()} />
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

export default CategoryMealsScreen;
