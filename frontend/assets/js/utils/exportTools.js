function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function escHtml(v) {
  return String(v ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeCsv(v) {
  const s = String(v ?? "");
  const escaped = s.replaceAll('"', '""');
  return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped;
}

// Export table data to CSV
export function exportToCSV(filename, rows, columns) {
  const header = columns.map((c) => safeCsv(c.label)).join(",");
  const body = (rows || [])
    .map((r) => columns.map((c) => safeCsv(r?.[c.key])).join(","))
    .join("\n");
  const csv = header + "\n" + body;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  downloadBlob(filename, blob);
}

// Export HTML content to PDF (print dialog)
export function exportToPDF(title, htmlContent) {
  const w = window.open("", "_blank");
  if (!w) {
    alert("Please allow popups to export PDF");
    return;
  }
  
  w.document.open();
  w.document.write(`
    <html>
      <head>
        <title>${escHtml(title)}</title>
        <meta charset="utf-8" />
        <style>
          body { 
            font-family: Arial, sans-serif; 
            padding: 16px; 
            color: #111827; 
          }
          h1 { 
            font-size: 24px; 
            margin: 0 0 12px; 
            color: #1f2937;
          }
          .meta { 
            font-size: 12px; 
            color: #6b7280; 
            margin-bottom: 20px; 
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 8px; 
          }
          th, td { 
            border: 1px solid #e5e7eb; 
            padding: 8px; 
            text-align: left; 
            font-size: 11px; 
          }
          th { 
            background: #f3f4f6; 
            font-weight: 600;
          }
          tr:nth-child(even) {
            background: #f9fafb;
          }
          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `);
  w.document.close();
  
  // Wait for content to load before printing
  setTimeout(() => {
    w.focus();
    w.print();
  }, 250);
}