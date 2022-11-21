export type SupplierInvoiceDTO = {
  name: string
  address: {
    line1: string
    line2: string
    line3: string
  }
  cpf: string
  client_number: string
  installation_number: string
  reference_month: string
  due_date: number
  total_value: number
  connection_type: string
  issue_date: number
  history_table: {
    reference_month: string
    kwh_consumption: number
    days: number
  }[]
}

export type CompleteSupplierInvoiceDTO = SupplierInvoiceDTO & {
  avg_kwh_consumption: number
}