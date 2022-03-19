export class OrderDto {
  orderId?: number;
  userId: number;
  orderDate: string;
  shipped?: boolean;
  delivered?: boolean;
}
