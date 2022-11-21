import { ISupplierInvoiceValidator, IUsecase } from "../ports";

export class ValidateSupplierInvoice implements IUsecase<unknown, boolean>{
  constructor (private readonly supplierInvoiceValidator: ISupplierInvoiceValidator) {}

  async execute(input: unknown): Promise<boolean> {
    return this.supplierInvoiceValidator.validate(input)
  }
}