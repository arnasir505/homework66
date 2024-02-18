export interface ApiMeal {
  time: string;
  name: string;
  calories: number;
}

export interface Meal extends ApiMeal {
  id: string;
}

export interface MutableMeal extends ApiMeal {
  calories: string;
}

export interface ApiMeals {
  [id: string]: ApiMeal;
}
