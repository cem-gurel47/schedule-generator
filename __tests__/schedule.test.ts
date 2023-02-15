import {
  getEmployeeAvailabilitiesForDayOfWeek,
  getLongestAvailableTimeForEmployee,
  findConstraintsForTheEmployee,
  getShiftDurationAsHours,
} from "@utils/helpers";

import type { Availability } from "@models/types";

const employee = {
  id: "1",
  name: "John",
  businessId: "1",
  department: "women",
  position: "cashier",
  minHours: 15,
  maxHours: 40,
  email: "",
  priority: 1,
};

const availabilities = [
  {
    dayOfWeek: 1,
    start: "09:00",
    end: "17:00",
    id: "1",
    userId: "1",
  },
  {
    dayOfWeek: 1,
    start: "11:00",
    end: "17:00",
    id: "2",
    userId: "1",
  },
  {
    dayOfWeek: 1,
    start: "12:00",
    end: "17:00",
    id: "3",
    userId: "1",
  },
];

describe("get Employee Availabilities For Day Of Week", () => {
  it("should return the availabilities for the day of week", () => {
    const availabilities = [
      {
        dayOfWeek: 1,
        start: "2021-09-20T09:00:00.000Z",
        end: "2021-09-20T17:00:00.000Z",
        id: "1",
        userId: "1",
      },
      {
        dayOfWeek: 2,
        start: "2021-09-20T09:00:00.000Z",
        end: "2021-09-20T17:00:00.000Z",
        id: "2",
        userId: "1",
      },
      {
        dayOfWeek: 3,
        start: "2021-09-20T09:00:00.000Z",
        end: "2021-09-20T17:00:00.000Z",
        id: "3",
        userId: "1",
      },
      {
        dayOfWeek: 4,
        start: "2021-09-20T09:00:00.000Z",
        end: "2021-09-20T17:00:00.000Z",
        id: "4",
        userId: "1",
      },
      {
        dayOfWeek: 5,
        start: "2021-09-20T09:00:00.000Z",
        end: "2021-09-20T17:00:00.000Z",
        id: "5",
        userId: "1",
      },
      {
        dayOfWeek: 6,
        start: "2021-09-20T09:00:00.000Z",
        end: "2021-09-20T17:00:00.000Z",
        id: "6",
        userId: "1",
      },
      {
        dayOfWeek: 7,
        start: "2021-09-20T09:00:00.000Z",
        end: "2021-09-20T17:00:00.000Z",
        id: "7",
        userId: "1",
      },
    ];

    const dayOfWeek = 1;

    const result = getEmployeeAvailabilitiesForDayOfWeek(
      availabilities,
      dayOfWeek
    );

    expect(result.length).toEqual(1);
  });
});

describe("get Longest Available Time For Employee", () => {
  it("should return the longest available time for the employee", () => {
    const result = getLongestAvailableTimeForEmployee(availabilities);

    expect(result.start).toEqual("09:00");
    expect(result.end).toEqual("17:00");
  });
});

describe("find Constraints For The Employee", () => {
  it("should return the constraints for the employee", () => {
    const constraints = [
      {
        id: "1",
        department: "women",
        position: "cashier",
        dayOfWeek: 1,
        start: "09:00",
        end: "12:00",
        type: "MAX" as const,
        businessId: "1",
        constraint: 4,
      },
      {
        id: "2",
        department: "women",
        position: "cashier",
        dayOfWeek: 1,
        start: "12:00",
        end: "14:00",
        type: "MAX" as const,
        businessId: "1",
        constraint: 4,
      },
    ];

    const availabilities = [
      {
        dayOfWeek: 1,
        start: "09:00",
        end: "13:00",
        id: "1",
        userId: "1",
      },
      {
        dayOfWeek: 1,
        start: "14:00",
        end: "17:00",
        id: "2",
        userId: "1",
      },
      {
        dayOfWeek: 1,
        start: "12:00",
        end: "17:00",
        id: "3",
        userId: "1",
      },
    ];

    const result = findConstraintsForTheEmployee(
      constraints,
      availabilities,
      employee,
      1
    );

    console.log(result);

    expect(result.length).toEqual(2);
  });
});

describe("get Shift Duration As Hours", () => {
  it("should return the shift duration as hours", () => {
    const result = getShiftDurationAsHours(availabilities[0] as Availability);

    expect(result).toEqual(8);
  });
});
