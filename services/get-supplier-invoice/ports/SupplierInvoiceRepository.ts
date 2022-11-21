import { CompleteSupplierInvoiceDTO } from "../../../shared/dtos/SupplierInvoice";

export interface ISupplierInvoiceRepository {
  list(): Promise<CompleteSupplierInvoiceDTO[]>
}