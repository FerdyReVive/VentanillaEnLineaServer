import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { filemanagementClient as _tramitespackage_filemanagementClient, filemanagementDefinition as _tramitespackage_filemanagementDefinition } from './tramitespackage/filemanagement';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  tramitespackage: {
    descargarArchivoPeticion: MessageTypeDefinition
    descargarArchivoRespuesta: MessageTypeDefinition
    filemanagement: SubtypeConstructor<typeof grpc.Client, _tramitespackage_filemanagementClient> & { service: _tramitespackage_filemanagementDefinition }
    subirArchivoPeticion: MessageTypeDefinition
    subirArchivoRespuesta: MessageTypeDefinition
  }
}

