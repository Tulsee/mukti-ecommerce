import { NewProduct, ProductRepository } from "../repositories/product.repository";

type ProductCreationPayload = Omit<NewProduct, "sellerId">;

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  public async createProduct(productData: ProductCreationPayload, sellerId: number) {
    const newProduct: NewProduct = {
      ...productData,
      sellerId,
    };
    return this.productRepository.createProduct(newProduct);
  }

  public async getAllProducts() {
    return this.productRepository.findAll();
  }
}
