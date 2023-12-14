// module augmentation to add id to DefaultUser interface in next-auth types
import { User } from 'next-auth';
interface IUser extends DefaultUser {
  id: string;
}
declare module 'next-auth' {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}
declare module 'next-auth/jwt' {
  interface JWT extends IUser {}
}
