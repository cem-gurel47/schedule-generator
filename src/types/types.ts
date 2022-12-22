export type Employee = {
  name: string;
  id: string;
  position: string;
  department?: string;
  email: string;
  phone: string;
  priority?: number;
};

export type Shift = {
  employee: Partial<Employee>;
  shiftStart: string;
  shiftEnd: string;
};
