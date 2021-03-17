import React from 'react';
import { StyleSheet, View } from 'react-native';
import MealList from '../components/MealList';
import { CATEGORIES } from '../data/dummy-data';
import { useSelector } from 'react-redux';
import DefaultText from '../components/DefaultText';

const CategoryMealsScreen = (props) => {
  const catId = props.navigation.getParam('categoryId');

  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter((m) =>
    m.categoryIds.includes(catId)
  );
  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found check filters</DefaultText>
      </View>
    );
  }
  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam('categoryId');
  const selectedCat = CATEGORIES.find((c) => c.id === catId);

  return {
    headerTitle: selectedCat.title,
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryMealsScreen;
