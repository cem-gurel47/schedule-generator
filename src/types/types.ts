export type Employee = {
  name: string | null;
  id: string;
  position: string;
  department: string;
  email: string;
  priority: number;
  minHours: number;
  maxHours: number;
};

export type Availability = {
  id: string;
  userId: string;
  dayOfWeek: number;
  start: string;
  end: string;
};

export type Shift = {
  employee: Partial<Employee>;
  shiftStart: string;
  shiftEnd: string;
};

export type Constraint = {
  id: string;
  businessId: string;
  type: "MIN" | "MAX" | "EXACT";
  dayOfWeek: number;
  start: string;
  end: string;
  position: string;
  department: string;
  constraint: number;
};
