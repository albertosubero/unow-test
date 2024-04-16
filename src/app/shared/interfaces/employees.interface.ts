export interface IEmployees {
  email: string,
  role: 'ADMIN' | 'USER',
  name: string,
  lastName: string,
  dateOfbirth: {
    day: number,
    month: number,
    year: number,
  },
  position: number,
}