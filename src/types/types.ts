export type Employee = {
  name: string | null;
  id: string;
  position: string;
  department: string;
  email: string;
  priority: number;
};

export type Shift = {
  employee: Partial<Employee>;
  shiftStart: string;
  shiftEnd: string;
};
