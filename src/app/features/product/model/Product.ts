// src/app/features/product/model/Product.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

// src/app/features/product/model/Product.ts
export interface ProductResponse {
  data: Product[]
}
