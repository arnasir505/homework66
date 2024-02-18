export interface Meal {
  time: string;
  name: string;
  calories: number;
}

export interface MutableMeal extends Meal {
  calories: string;
}
