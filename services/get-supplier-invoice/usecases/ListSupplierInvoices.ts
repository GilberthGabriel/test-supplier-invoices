import { CompleteSupplierInvoiceDTO } from "../../../shared/dtos/SupplierInvoice";
import { IUsecase } from "../../../shared/ports/Usecase";
import { ISupplierInvoiceRepository } from "../ports/SupplierInvoiceRepository";

export class ListSupplierInvoices implements IUsecase<undefined, CompleteSupplierInvoiceDTO[]> {
  constructor(private readonly repository: ISupplierInvoiceRepository) { }

  execute(): Promise<CompleteSupplierInvoiceDTO[]> {
    return this.repository.list()
  }
}