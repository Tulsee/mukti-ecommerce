import { NewProduct, ProductFilterOptions, ProductRepository } from "../repositories/product.repository";

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

  public async getAllProducts(options: ProductFilterOptions) {
    const { products, total } = await this.productRepository.findAll(options);

    return {
      data: products,
      pagination: {
        totalItems: total,
        totalPages: Math.ceil(total / options.limit),
        currentPage: options.page,
        limit: options.limit,
      },
    };
  }
}
