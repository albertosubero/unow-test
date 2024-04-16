export interface IEmployees {
  email: string,
  role: 'ADMIN' | 'USER',
  name: string,
  lastName: string,
  dateOfbirth: IDate,
  position: string,
}

export interface IDate {
  day: number,
  month: number,
  year: number,
}