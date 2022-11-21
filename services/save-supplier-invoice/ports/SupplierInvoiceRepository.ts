import { SaveSupplierInvoiceDTO } from "../dtos/SupplierInvoice";

export interface ISupplierInvoiceRepository {
  save(supplierInvoice: SaveSupplierInvoiceDTO): Promise<boolean>
}