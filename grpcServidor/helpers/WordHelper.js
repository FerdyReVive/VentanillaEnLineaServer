const { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, WidthType } = require('docx');
const fs = require('fs');
const axios = require('axios');


// Función para generar el documento Word
async function generateDocument(data, outputPath = './kardex.docx') {
    const doc = new Document();
  
    // Encabezado del documento
    doc.addSection({
      children: [
        new Paragraph({
          text: "Kardex de experiencias educativas",
          bold: true,
          alignment: "center",
        }),
        new Table({
          rows: [
            // Encabezados de la tabla
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ text: "NRC", bold: true })],
                  width: { size: 30, type: WidthType.PERCENTAGE },
                }),
                new TableCell({
                  children: [new Paragraph({ text: "Experiencia Educativa", bold: true })],
                  width: { size: 70, type: WidthType.PERCENTAGE },
                }),
              ],
            }),
            // Filas dinámicas
            ...data.map((item) =>
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph(item.nrc || "Sin NRC")],
                  }),
                  new TableCell({
                    children: [new Paragraph(item.nombre || "Sin Nombre")],
                  }),
                ],
              })
            ),
          ],
        }),
      ],
    });
  
    // Escribir el archivo Word
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputPath, buffer);
    console.log(`Documento generado: ${outputPath}`);
  }

async function fetchExperienciasPorUsuario(idUsuario) {
    try {
      const url = `http://192.168.1.20:8080/experiencias/${idUsuario}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOjUsIm5vbWJyZSI6ImZlciIsImlkVGlwb1VzdWFyaW8iOjEsImlhdCI6MTczNjk5ODk4NCwiZXhwIjoxNzM3MDAyNTg0fQ.9BTrnZqsPRn-A5PeN4xnHlP8-R4ozNK7lcz2kx-JKI8",
        },
      });
      return response.data; // Esto será el arreglo de experiencias
    } catch (error) {
      console.error('Error al consultar experiencias educativas:', error.message);
      throw new Error('No se pudo obtener la información del usuario.');
    }
}

module.exports = { fetchExperienciasPorUsuario, generateDocument };
