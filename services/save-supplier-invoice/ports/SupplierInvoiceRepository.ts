import { CompleteSupplierInvoiceDTO } from "../../../shared/dtos/SupplierInvoice";

export interface ISupplierInvoiceRepository {
  save(supplierInvoice: CompleteSupplierInvoiceDTO): Promise<boolean>
}