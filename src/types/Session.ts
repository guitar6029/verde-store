import { UserType } from "./User";

export type Session = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  user: UserType | null;
};
