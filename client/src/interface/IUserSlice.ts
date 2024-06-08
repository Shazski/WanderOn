export interface IUserSlice {
 user : {
  email: string;
  username: string;
  _id:string
 }
 loading: boolean
 error: string
}

export interface IUser {
  email: string;
  username: string;
  password: string;
}