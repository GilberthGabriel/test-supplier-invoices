import { DynamoDB } from 'aws-sdk';
import { CompleteSupplierInvoiceDTO } from '../../../shared/dtos/SupplierInvoice';
import { ISupplierInvoiceRepository } from '../ports';

const dynamoDb = new DynamoDB.DocumentClient()

export class DynamoSupplierInvoiceRepository implements ISupplierInvoiceRepository {
  async list(): Promise<CompleteSupplierInvoiceDTO[]> {
    const data = await dynamoDb.scan({
      TableName: process.env.DYNAMODB_TABLE || '',
    }).promise()

    return data.Items as CompleteSupplierInvoiceDTO[]
  }
}