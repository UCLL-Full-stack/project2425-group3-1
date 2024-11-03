export type Bmi = {
  id?: number;
  length: number;
  weight: number;
};

export type Goal = {
  id?: number;
  goalType: string;
};

export type Profile = {
  id?: number;
  lastName: string;
  firstName: string;
  email: string;
};

export type Schedule = {
  id?: number;
  date: Date;
  calorieBurn: number;
  totalTime: number;
  workouts: Workout[];
};

export type User = {
  id?: number;
  name: string;
  password: string;
};

export type Workout = {
  id: number;
  location: string;
  level: number;
  time: number;
  name: string;
  calorie: number;
  muscle: string;
  muscleImage: string;
};

//TypeScript geeft een waarschuwing als je probeert een object te maken dat niet aan deze structuur voldoet,
// wat veel typefouten voorkomt en je code betrouwbaarder maakt.
