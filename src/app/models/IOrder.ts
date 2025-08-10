export interface IOrderProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
}

export interface IOrder {
  id: number;               
  userId: number;           
  date: string;             // تاريخ الطلب (مثلاً ISO string)
  total: number;            
  products: IOrderProduct[];
  status?: string;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;  
}
