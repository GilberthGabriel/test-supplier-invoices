import {SNSEvent} from 'aws-lambda';
import { DynamoSupplierInvoiceRepository, YupSupplierInvoiceValidator } from './adapters';
import { ValidateSupplierInvoice } from './usecases';
import { SaveSupplierInvoice } from './usecases/SaveSupplierInvoice';

exports.handle = async (event: SNSEvent) => {
  const repository = new DynamoSupplierInvoiceRepository()
  const saveUsecase = new SaveSupplierInvoice(repository)
  const validateUsecase = new ValidateSupplierInvoice(new YupSupplierInvoiceValidator())
  event.Records.forEach(async record => {
    const message = JSON.parse(record.Sns.Message)
    if (await validateUsecase.execute(message)) {
      await saveUsecase.execute(JSON.parse(record.Sns.Message))
    }
  });
}