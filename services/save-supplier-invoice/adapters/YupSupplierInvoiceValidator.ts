import { ISupplierInvoiceValidator } from '../ports'
import * as yup from 'yup'

const Schema = yup.object().shape({
  name: yup.string().required(),
  address: yup.object().shape({
    line1: yup.string().required(),
    line2: yup.string().required(),
    line3: yup.string().required()
  }),
  cpf: yup.string().required(),
  client_number: yup.string().required(),
  installation_number: yup.string().required(),
  reference_month: yup.string().required(),
  due_date: yup.number().required(),
  total_value: yup.number().required(),
  connection_type: yup.string().required(),
  issue_date: yup.number().required(),
  history_table: yup.array().of(
    yup.object().shape({
      reference_month: yup.string().required(),
      kwh_consumption: yup.number().required(),
      days: yup.number().required()
    })
  )
})

export class YupSupplierInvoiceValidator implements ISupplierInvoiceValidator {
  validate(data: unknown): boolean {
    return Schema.isValidSync(data)
  }
}
 