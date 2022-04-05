import { PaymentMethod, ShippingMethod } from "./interfaces";

export class OrderDto {
  orderId?: number;
  userId: number;
  addressId: number;
  orderDate: string;
  shippingType: ShippingMethod;
  paymentMethod: PaymentMethod;
  paid?: boolean;
  shipped?: boolean;
  delivered?: boolean;
}
