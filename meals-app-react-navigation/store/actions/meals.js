export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';

export const toggleFavorire = (mealId) => {
  return {
    type: TOGGLE_FAVORITE,
    mealId,
  };
};

export const setFilters = (filterSettings) => {
  return {
    type: SET_FILTERS,
    filters: filterSettings,
  };
};
