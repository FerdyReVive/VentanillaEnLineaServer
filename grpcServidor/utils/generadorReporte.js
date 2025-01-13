const { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, AlignmentType } = require('docx');

async function generarReporteKardex(experiencias, usuario) {
  try {
    const doc = new Document();

    doc.addSection({
      children: [
        new Paragraph({
          children: [new TextRun({ text: "Kardex de calificaciones", bold: true, size: 28 })],
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
          children: [new TextRun({ text: `Usuario: ${usuario.nombre}`, size: 24 })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),
        generarTabla(experiencias),
        new Paragraph({
          children: [new TextRun({ text: "Universidad Veracruzana", bold: true, size: 20 })],
          alignment: AlignmentType.CENTER,
          spacing: { before: 400 },
        }),
      ],
    });

    // En lugar de guardar el archivo, devuelve el buffer directamente
    const buffer = await Packer.toBuffer(doc);
    return buffer; // Devuelve el buffer del documento
  } catch (error) {
    console.error("Error al generar el reporte:", error.message);
    throw error;
  }
}

function generarTabla(experiencias) {
  const headerRow = new TableRow({
    children: [
      new TableCell({ children: [new Paragraph({ text: "NRC", bold: true })] }),
      new TableCell({ children: [new Paragraph({ text: "Experiencia educativa", bold: true })] }),
    ],
  });

  const dataRows = experiencias.map((exp) =>
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph(exp.NRC.toString())] }),
        new TableCell({ children: [new Paragraph(exp.nombre)] }),
      ],
    })
  );

  return new Table({ rows: [headerRow, ...dataRows], width: { size: 100, type: "pct" } });
}

module.exports = { generarReporteKardex };
