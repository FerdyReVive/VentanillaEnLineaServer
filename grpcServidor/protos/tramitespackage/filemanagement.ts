// Original file: tramites.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { descargarArchivoPeticion as _tramitespackage_descargarArchivoPeticion, descargarArchivoPeticion__Output as _tramitespackage_descargarArchivoPeticion__Output } from '../tramitespackage/descargarArchivoPeticion';
import type { descargarArchivoRespuesta as _tramitespackage_descargarArchivoRespuesta, descargarArchivoRespuesta__Output as _tramitespackage_descargarArchivoRespuesta__Output } from '../tramitespackage/descargarArchivoRespuesta';
import type { reporteRespuesta as _tramitespackage_reporteRespuesta, reporteRespuesta__Output as _tramitespackage_reporteRespuesta__Output } from '../tramitespackage/reporteRespuesta';
import type { reporteSolicitud as _tramitespackage_reporteSolicitud, reporteSolicitud__Output as _tramitespackage_reporteSolicitud__Output } from '../tramitespackage/reporteSolicitud';
import type { subirArchivoPeticion as _tramitespackage_subirArchivoPeticion, subirArchivoPeticion__Output as _tramitespackage_subirArchivoPeticion__Output } from '../tramitespackage/subirArchivoPeticion';
import type { subirArchivoRespuesta as _tramitespackage_subirArchivoRespuesta, subirArchivoRespuesta__Output as _tramitespackage_subirArchivoRespuesta__Output } from '../tramitespackage/subirArchivoRespuesta';

export interface filemanagementClient extends grpc.Client {
  descargarArchivo(argument: _tramitespackage_descargarArchivoPeticion, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_tramitespackage_descargarArchivoRespuesta__Output>): grpc.ClientUnaryCall;
  descargarArchivo(argument: _tramitespackage_descargarArchivoPeticion, metadata: grpc.Metadata, callback: grpc.requestCallback<_tramitespackage_descargarArchivoRespuesta__Output>): grpc.ClientUnaryCall;
  descargarArchivo(argument: _tramitespackage_descargarArchivoPeticion, options: grpc.CallOptions, callback: grpc.requestCallback<_tramitespackage_descargarArchivoRespuesta__Output>): grpc.ClientUnaryCall;
  descargarArchivo(argument: _tramitespackage_descargarArchivoPeticion, callback: grpc.requestCallback<_tramitespackage_descargarArchivoRespuesta__Output>): grpc.ClientUnaryCall;
  
  generarDocumento(argument: _tramitespackage_reporteSolicitud, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_tramitespackage_reporteRespuesta__Output>): grpc.ClientUnaryCall;
  generarDocumento(argument: _tramitespackage_reporteSolicitud, metadata: grpc.Metadata, callback: grpc.requestCallback<_tramitespackage_reporteRespuesta__Output>): grpc.ClientUnaryCall;
  generarDocumento(argument: _tramitespackage_reporteSolicitud, options: grpc.CallOptions, callback: grpc.requestCallback<_tramitespackage_reporteRespuesta__Output>): grpc.ClientUnaryCall;
  generarDocumento(argument: _tramitespackage_reporteSolicitud, callback: grpc.requestCallback<_tramitespackage_reporteRespuesta__Output>): grpc.ClientUnaryCall;
  
  subirArchivo(argument: _tramitespackage_subirArchivoPeticion, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_tramitespackage_subirArchivoRespuesta__Output>): grpc.ClientUnaryCall;
  subirArchivo(argument: _tramitespackage_subirArchivoPeticion, metadata: grpc.Metadata, callback: grpc.requestCallback<_tramitespackage_subirArchivoRespuesta__Output>): grpc.ClientUnaryCall;
  subirArchivo(argument: _tramitespackage_subirArchivoPeticion, options: grpc.CallOptions, callback: grpc.requestCallback<_tramitespackage_subirArchivoRespuesta__Output>): grpc.ClientUnaryCall;
  subirArchivo(argument: _tramitespackage_subirArchivoPeticion, callback: grpc.requestCallback<_tramitespackage_subirArchivoRespuesta__Output>): grpc.ClientUnaryCall;
  
}

export interface filemanagementHandlers extends grpc.UntypedServiceImplementation {
  descargarArchivo: grpc.handleUnaryCall<_tramitespackage_descargarArchivoPeticion__Output, _tramitespackage_descargarArchivoRespuesta>;
  
  generarDocumento: grpc.handleUnaryCall<_tramitespackage_reporteSolicitud__Output, _tramitespackage_reporteRespuesta>;
  
  subirArchivo: grpc.handleUnaryCall<_tramitespackage_subirArchivoPeticion__Output, _tramitespackage_subirArchivoRespuesta>;
  
}

export interface filemanagementDefinition extends grpc.ServiceDefinition {
  descargarArchivo: MethodDefinition<_tramitespackage_descargarArchivoPeticion, _tramitespackage_descargarArchivoRespuesta, _tramitespackage_descargarArchivoPeticion__Output, _tramitespackage_descargarArchivoRespuesta__Output>
  generarDocumento: MethodDefinition<_tramitespackage_reporteSolicitud, _tramitespackage_reporteRespuesta, _tramitespackage_reporteSolicitud__Output, _tramitespackage_reporteRespuesta__Output>
  subirArchivo: MethodDefinition<_tramitespackage_subirArchivoPeticion, _tramitespackage_subirArchivoRespuesta, _tramitespackage_subirArchivoPeticion__Output, _tramitespackage_subirArchivoRespuesta__Output>
}
