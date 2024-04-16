export interface IEmployees {
  _id: string,
  role: 'ADMIN' | 'USER',
  name: string,
  lastName: string,
  dateOfbirth: string,
  position: string,
  email: string
}