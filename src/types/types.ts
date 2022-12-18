export type Employee = {
  name: string;
  id: string;
  position: string;
};

export type Shift = {
  employee: Employee;
  shiftStart: string;
  shiftEnd: string;
};
