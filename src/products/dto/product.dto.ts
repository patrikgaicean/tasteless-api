import { Condition } from "./interfaces";

export class ProductDto {
  productId?: number;
  discId?: number;
  condition: Condition;
  price: number;
  deleted?: boolean;
}
