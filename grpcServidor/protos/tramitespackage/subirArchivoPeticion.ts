// Original file: tramites.proto


export interface subirArchivoPeticion {
  'idTramite'?: (number);
  'nombreArchivo'?: (string);
  'extension'?: (string);
  'contenido'?: (Buffer | Uint8Array | string);
}

export interface subirArchivoPeticion__Output {
  'idTramite'?: (number);
  'nombreArchivo'?: (string);
  'extension'?: (string);
  'contenido'?: (Buffer);
}
