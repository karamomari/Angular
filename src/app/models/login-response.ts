import { IUser } from "./iuser";

export interface LoginResponse {
    accessToken: string;
    user: IUser;
}
