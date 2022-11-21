import { DynamoSupplierInvoiceRepository } from "./adapters/DynamoSupplierInvoiceRepository";
import { ListSupplierInvoices } from "./usecases";

exports.handle = async () => {
  const repo = new DynamoSupplierInvoiceRepository()
  const usecase = new ListSupplierInvoices(repo)
  const result = await usecase.execute()

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
}