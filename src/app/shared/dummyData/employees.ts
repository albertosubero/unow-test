import { IEmployees } from "../interfaces/employees.interface";

export const employeesListDummyData: IEmployees[] = [
  {
    email: 'alberto-c@a.com',
    role: 'ADMIN',
    name: 'Alberto',
    lastName: 'Subero',
    dateOfbirth: {
      day: 22,
      month: 4,
      year: 1991
    },
    position: 'scrum master',
  },
  {
    email: 'pedro-c@a.com',
    role: 'USER',
    name: 'Pedro',
    lastName: 'Parra',
    dateOfbirth: {
      day: 22,
      month: 3,
      year: 1987
    },
    position: 'front-end developer',
  },
  {
    email: 'maria-c@a.com',
    role: 'USER',
    name: 'Maria',
    lastName: 'Ramirez',
    dateOfbirth: {
      day: 12,
      month: 12,
      year: 1995
    },
    position: 'help desk',
  }
]