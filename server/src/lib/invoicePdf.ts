type InvoiceData = {
  invoiceNumber: string;
  amountRupee: number;
  currency: string;
  issuedAt: Date;
  order: {
    orderNumber: string;
    community: string;
    blockFlat: string;
    lines: { name: string; qty: number; unit: string; unitPrice: number; lineTotal: number }[];
    member: { name: string; email: string | null; phoneE164: string } | null;
  };
};

function escapePdf(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function text(x: number, y: number, value: string, size = 10, font = "F1") {
  return `BT /${font} ${size} Tf ${x} ${y} Td (${escapePdf(value)}) Tj ET`;
}

/** A dependency-free, single-page invoice PDF for a customer download. */
export function invoicePdf(invoice: InvoiceData) {
  const issued = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeZone: "Asia/Kolkata" }).format(invoice.issuedAt);
  const member = invoice.order.member;
  const lines = invoice.order.lines.slice(0, 22);
  const commands = [
    "1 1 1 rg 0 0 595 842 re f",
    "0.14 0.24 0.15 rg",
    text(48, 790, "FRESHPHOOL", 22, "F2"),
    "0.78 0.32 0.11 rg",
    text(48, 770, "Fresh flowers, thoughtfully delivered", 10),
    "0.14 0.24 0.15 rg",
    text(400, 790, "TAX INVOICE", 14, "F2"),
    text(400, 772, invoice.invoiceNumber, 10),
    text(400, 755, `Issued: ${issued}`, 10),
    "0.85 G 0.8 w 48 735 m 547 735 l S",
    text(48, 710, "Billed to", 10, "F2"),
    text(48, 693, member?.name || "FreshPhool customer", 10),
    text(48, 678, member?.email || "", 9),
    text(48, 664, member?.phoneE164 || "", 9),
    text(300, 710, "Delivery address", 10, "F2"),
    text(300, 693, invoice.order.community, 10),
    text(300, 678, invoice.order.blockFlat, 10),
    text(48, 635, `Order: ${invoice.order.orderNumber}`, 10, "F2"),
    "0.14 0.24 0.15 rg 48 610 499 22 re f",
    "1 1 1 rg",
    text(58, 617, "Item", 9, "F2"),
    text(385, 617, "Qty", 9, "F2"),
    text(455, 617, "Amount", 9, "F2"),
    "0.14 0.24 0.15 rg",
  ];

  let y = 588;
  for (const line of lines) {
    const label = `${line.name}${line.unit ? ` (${line.unit})` : ""}`.slice(0, 54);
    commands.push(text(58, y, label, 9));
    commands.push(text(390, y, String(line.qty), 9));
    commands.push(text(455, y, `Rs. ${line.lineTotal.toLocaleString("en-IN")}`, 9));
    commands.push("0.9 G 0.4 w 48 " + (y - 8) + " m 547 " + (y - 8) + " l S");
    y -= 22;
  }
  commands.push("0.14 0.24 0.15 rg");
  commands.push(text(365, y - 10, "Total paid", 11, "F2"));
  commands.push(text(455, y - 10, `Rs. ${invoice.amountRupee.toLocaleString("en-IN")}`, 11, "F2"));
  commands.push(text(48, 72, "Thank you for choosing FreshPhool.", 9));
  commands.push(text(48, 56, "This is a system-generated invoice.", 8));

  const stream = commands.join("\n") + "\n";
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    `<< /Length ${Buffer.byteLength(stream, "utf8")} >>\nstream\n${stream}endstream`,
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf, "utf8"));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = Buffer.byteLength(pdf, "utf8");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let index = 1; index < offsets.length; index += 1) pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(pdf, "utf8");
}
