import { DynamoDB } from 'aws-sdk';
import { CompleteSupplierInvoiceDTO } from '../../../shared/dtos/SupplierInvoice';
import { ISupplierInvoiceRepository } from '../ports';

const dynamoDb = new DynamoDB.DocumentClient()

export class DynamoSupplierInvoiceRepository implements ISupplierInvoiceRepository {
  async save(supplierInvoice: CompleteSupplierInvoiceDTO): Promise<boolean> {
    const params = {
      TableName: process.env.DYNAMODB_TABLE || '',
      Item: {
        ...supplierInvoice
      }
    }

    try {
      await dynamoDb.put(params).promise();
      return true;
    } catch (e) {
      return false
    }
  }
}