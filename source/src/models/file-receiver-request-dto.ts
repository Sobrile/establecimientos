/* tslint:disable */
import { Client } from './client';
import { FileRequestDTO } from './file-request-dto';
export interface FileReceiverRequestDto {
  channel_operation_id?: number;
  client?: Client;
  file?: FileRequestDTO;
  timestamp?: string;
}
