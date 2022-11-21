import { SupplierInvoiceDTO } from "../dtos/SupplierInvoice";
import { ISupplierInvoiceRepository, IUsecase } from "../ports";

export class SaveSupplierInvoice implements IUsecase<SupplierInvoiceDTO, boolean> {
  constructor(
    private readonly supplierInvoiceRepository: ISupplierInvoiceRepository,
  ) {}

  async execute(supplierInvoice: SupplierInvoiceDTO): Promise<boolean> {    
    let days = 0
    let sum = 0
    supplierInvoice.history_table.forEach(history => {
      days += history.days
      sum += history.days * history.kwh_consumption
    })

    const average = sum / days
    return this.supplierInvoiceRepository.save({
      ...supplierInvoice,
      avg_kwh_consumption: Number(average.toFixed())
    });
  }
}