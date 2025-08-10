import { Iproduct } from "./iproduct";

export interface CartItem extends Iproduct {
  quantity: number;
}