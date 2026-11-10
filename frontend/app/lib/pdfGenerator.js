
function cleanText(text) {
  if (text === null || text === undefined) return '';
  return String(text)
    .replace(/[—–]/g, '-')
    .replace(/[“”"]/g, '"')
    .replace(/[‘’']/g, "'")
    .replace(/•/g, '*')
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function createPdfBinary(streamContent) {
  const streamLength = new TextEncoder().encode(streamContent).length;

  let pdf = '%PDF-1.4\n';
  const offsets = [];

  function addObj(body) {
    offsets.push(new TextEncoder().encode(pdf).length);
    pdf += `${offsets.length} 0 obj\n${body}\nendobj\n`;
  }

  // 1: Catalog
  addObj('<< /Type /Catalog /Pages 2 0 R >>');

  // 2: Pages
  addObj('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');

  // 3: Page (A4: 595.28 x 841.89 points)
  addObj('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>');

  // 4: Regular Font (Helvetica)
  addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');

  // 5: Bold Font (Helvetica-Bold)
  addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');

  // 6: Content Stream
  addObj(`<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream`);

  // Xref
  const startXref = new TextEncoder().encode(pdf).length;
  pdf += 'xref\n';
  pdf += `0 ${offsets.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (const off of offsets) {
    pdf += String(off).padStart(10, '0') + ' 00000 n \n';
  }

  // Trailer
  pdf += `trailer\n<< /Size ${offsets.length + 1} /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF`;

  return new TextEncoder().encode(pdf);
}

function triggerDownload(binaryData, filename) {
  const blob = new Blob([binaryData], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Generate & Download Digital Account-Opening Application PDF (SOW 5.3)
 */
export function generateApplicationPdf(data) {
  const refNumber = data.refNumber || `SB-WM-${Date.now().toString().slice(-6)}`;
  const dateStr = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  let stream = 'q\n';

  // Header Banner - Navy Blue (#1B2B5B)
  stream += '0.106 0.169 0.357 rg\n';
  stream += '0 755 595.28 86.89 re f\n';

  // Gold Accent Line (#C8961E)
  stream += '0.784 0.588 0.118 rg\n';
  stream += '0 749 595.28 6 re f\n';

  // Bank Name & Title
  stream += 'BT\n/F2 20 Tf\n1 1 1 rg\n40 798 Td\n(SAMPATH BANK PLC) Tj\nET\n';
  stream += 'BT\n/F1 11 Tf\n0.784 0.588 0.118 rg\n40 778 Td\n(WEALTH MANAGEMENT DIVISION - DIGITAL APPLICATION FORM) Tj\nET\n';

  // Reference and Date Box
  stream += '0.96 0.96 0.97 rg\n';
  stream += '40 705 515.28 32 re f\n';
  stream += '0.85 0.85 0.87 RG\n';
  stream += '40 705 515.28 32 re S\n';

  stream += `BT\n/F2 10 Tf\n0.106 0.169 0.357 rg\n55 717 Td\n(Reference No: ) Tj\n/F1 10 Tf\n0.1 0.1 0.1 rg\n(${cleanText(refNumber)}) Tj\nET\n`;
  stream += `BT\n/F2 10 Tf\n0.106 0.169 0.357 rg\n360 717 Td\n(Submission Date: ) Tj\n/F1 10 Tf\n0.1 0.1 0.1 rg\n(${cleanText(dateStr)}) Tj\nET\n`;

  let y = 675;

  const sections = [
    {
      title: '1. APPLICANT PERSONAL INFORMATION',
      rows: [
        { label: 'Full Name', value: data.fullName },
        { label: 'National Identity / Passport No', value: data.nicOrPassport },
        { label: 'Contact Phone Number', value: data.phone },
        { label: 'Email Address', value: data.email },
        { label: 'Residential Address', value: data.address },
        { label: 'Nationality / Citizenship', value: data.nationality || 'Sri Lankan' },
      ],
    },
    {
      title: '2. INVESTMENT & PRODUCT SELECTION',
      rows: [
        { label: 'Selected Wealth Product', value: data.productName || 'Sampath Growth Fund' },
        { label: 'Initial Investment Amount', value: `LKR ${Number(data.investmentAmount || 0).toLocaleString('en-LK', { minimumFractionDigits: 2 })}` },
        { label: 'Preferred Servicing Branch', value: data.preferredBranch || 'Colombo - Head Office' },
        { label: 'Source of Investment Funds', value: data.sourceOfFunds || 'Personal Savings / Income' },
      ],
    },
    {
      title: '3. BENEFICIARY / NOMINEE DETAILS',
      rows: [
        { label: 'Nominee Full Name', value: data.nomineeName || 'N/A (To be nominated at branch)' },
        { label: 'Nominee NIC / Identification', value: data.nomineeNic || 'N/A' },
        { label: 'Relationship to Applicant', value: data.nomineeRelationship || 'N/A' },
      ],
    },
  ];

  for (const sec of sections) {
    // Section Header with Gold indicator
    stream += '0.94 0.95 0.97 rg\n';
    stream += `40 ${y - 4} 515.28 20 re f\n`;
    stream += '0.784 0.588 0.118 rg\n';
    stream += `40 ${y - 4} 4 20 re f\n`;
    stream += `BT\n/F2 10 Tf\n0.106 0.169 0.357 rg\n52 ${y + 2} Td\n(${cleanText(sec.title)}) Tj\nET\n`;
    y -= 22;

    // Rows
    for (const row of sec.rows) {
      stream += `BT\n/F2 9 Tf\n0.3 0.35 0.4 rg\n50 ${y} Td\n(${cleanText(row.label)}:) Tj\nET\n`;
      stream += `BT\n/F1 9.5 Tf\n0.1 0.1 0.1 rg\n220 ${y} Td\n(${cleanText(row.value || 'Not provided')}) Tj\nET\n`;

      // Light separator line
      stream += '0.9 0.9 0.92 RG\n';
      stream += `50 ${y - 4} m 545 ${y - 4} l S\n`;
      y -= 17;
    }
    y -= 8;
  }

  // Declaration Notice Box
  stream += '0.98 0.96 0.92 rg\n';
  stream += `40 ${y - 35} 515.28 42 re f\n`;
  stream += '0.784 0.588 0.118 RG\n';
  stream += `40 ${y - 35} 515.28 42 re S\n`;

  stream += `BT\n/F2 8.5 Tf\n0.5 0.35 0.05 rg\n50 ${y - 10} Td\n(APPLICANT DECLARATION & TERMS:) Tj\nET\n`;
  stream += `BT\n/F1 7.5 Tf\n0.3 0.3 0.3 rg\n50 ${y - 23} Td\n(I/We declare that the information provided above is true and accurate. This document was generated) Tj\nET\n`;
  stream += `BT\n/F1 7.5 Tf\n0.3 0.3 0.3 rg\n50 ${y - 33} Td\n(electronically via the Sampath Bank Wealth Management Platform and submitted for verification.) Tj\nET\n`;

  y -= 52;

  // Signatures / Office Use Block
  stream += `BT\n/F2 8 Tf\n0.2 0.2 0.2 rg\n50 ${y} Td\n(Applicant Signature: _______________________) Tj\nET\n`;
  stream += `BT\n/F2 8 Tf\n0.2 0.2 0.2 rg\n330 ${y} Td\n(Bank Officer Signature: _______________________) Tj\nET\n`;

  // Bottom Footer
  stream += '0.106 0.169 0.357 RG\n';
  stream += '40 42 m 555 42 l S\n';
  stream += 'BT\n/F1 7.5 Tf\n0.5 0.5 0.5 rg\n40 30 Td\n(Sampath Bank PLC | Licensed Commercial Bank supervised by CBSL | Head Office: 110 Sir James Peiris Mw, Colombo 02) Tj\nET\n';

  stream += 'Q\n';

  const binary = createPdfBinary(stream);
  triggerDownload(binary, `Sampath_Application_${cleanText(refNumber)}.pdf`);
}

/**
 * Generate & Download Appointment Confirmation Slip PDF
 */
export function generateAppointmentPdf(data) {
  const refNumber = data.refNumber || `APT-${Date.now().toString().slice(-6)}`;
  const dateStr = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  let stream = 'q\n';

  // Header Banner - Navy Blue
  stream += '0.106 0.169 0.357 rg\n';
  stream += '0 755 595.28 86.89 re f\n';

  // Gold Accent Line
  stream += '0.784 0.588 0.118 rg\n';
  stream += '0 749 595.28 6 re f\n';

  // Bank Name & Title
  stream += 'BT\n/F2 20 Tf\n1 1 1 rg\n40 798 Td\n(SAMPATH BANK PLC) Tj\nET\n';
  stream += 'BT\n/F1 11 Tf\n0.784 0.588 0.118 rg\n40 778 Td\n(WEALTH MANAGEMENT - ADVISOR APPOINTMENT CONFIRMATION SLIP) Tj\nET\n';

  // Reference and Date Box
  stream += '0.96 0.96 0.97 rg\n';
  stream += '40 705 515.28 32 re f\n';
  stream += '0.85 0.85 0.87 RG\n';
  stream += '40 705 515.28 32 re S\n';

  stream += `BT\n/F2 10 Tf\n0.106 0.169 0.357 rg\n55 717 Td\n(Booking Reference: ) Tj\n/F1 10 Tf\n0.1 0.1 0.1 rg\n(${cleanText(refNumber)}) Tj\nET\n`;
  stream += `BT\n/F2 10 Tf\n0.106 0.169 0.357 rg\n360 717 Td\n(Date Issued: ) Tj\n/F1 10 Tf\n0.1 0.1 0.1 rg\n(${cleanText(dateStr)}) Tj\nET\n`;

  let y = 670;

  const rows = [
    { label: 'Customer Full Name', value: data.fullName },
    { label: 'Contact Phone', value: data.phone },
    { label: 'Contact Email', value: data.email },
    { label: 'Consultation Branch', value: data.preferredBranch },
    { label: 'Requested Date', value: data.preferredDate },
    { label: 'Preferred Time Slot', value: data.preferredTime === 'morning' ? 'Morning (9:00 AM - 12:00 PM)' : data.preferredTime === 'afternoon' ? 'Afternoon (1:00 PM - 4:00 PM)' : 'Any Time Available' },
    { label: 'Topic of Interest', value: data.topicOfInterest },
    { label: 'Additional Notes', value: data.additionalNotes || 'None' },
  ];

  // Section Header
  stream += '0.94 0.95 0.97 rg\n';
  stream += `40 ${y - 4} 515.28 20 re f\n`;
  stream += '0.784 0.588 0.118 rg\n';
  stream += `40 ${y - 4} 4 20 re f\n`;
  stream += `BT\n/F2 10 Tf\n0.106 0.169 0.357 rg\n52 ${y + 2} Td\n(APPOINTMENT & CONSULTATION DETAILS) Tj\nET\n`;
  y -= 26;

  for (const r of rows) {
    stream += `BT\n/F2 9.5 Tf\n0.3 0.35 0.4 rg\n50 ${y} Td\n(${cleanText(r.label)}:) Tj\nET\n`;
    stream += `BT\n/F1 9.5 Tf\n0.1 0.1 0.1 rg\n220 ${y} Td\n(${cleanText(r.value || 'N/A')}) Tj\nET\n`;

    stream += '0.9 0.9 0.92 RG\n';
    stream += `50 ${y - 5} m 545 ${y - 5} l S\n`;
    y -= 22;
  }

  y -= 10;

  // Important Information Box
  stream += '0.95 0.97 1.0 rg\n';
  stream += `40 ${y - 55} 515.28 65 re f\n`;
  stream += '0.2 0.4 0.7 RG\n';
  stream += `40 ${y - 55} 515.28 65 re S\n`;

  stream += `BT\n/F2 9 Tf\n0.106 0.169 0.357 rg\n50 ${y - 12} Td\n(IMPORTANT INFORMATION FOR YOUR VISIT:) Tj\nET\n`;
  stream += `BT\n/F1 8 Tf\n0.2 0.25 0.35 rg\n50 ${y - 26} Td\n(- Please arrive 10 minutes prior to your allocated time slot.) Tj\nET\n`;
  stream += `BT\n/F1 8 Tf\n0.2 0.25 0.35 rg\n50 ${y - 38} Td\n(- Kindly present this confirmation slip along with your National Identity Card (NIC) or Passport.) Tj\nET\n`;
  stream += `BT\n/F1 8 Tf\n0.2 0.25 0.35 rg\n50 ${y - 50} Td\n(- A dedicated Wealth Management Advisor will assist you at the designated branch.) Tj\nET\n`;

  // Bottom Footer
  stream += '0.106 0.169 0.357 RG\n';
  stream += '40 50 m 555 50 l S\n';
  stream += 'BT\n/F1 7.5 Tf\n0.5 0.5 0.5 rg\n40 38 Td\n(Sampath Bank PLC | Wealth Management Division | Hotline: +94 11 230 8308 | Email: wealth@sampath.lk) Tj\nET\n';

  stream += 'Q\n';

  const binary = createPdfBinary(stream);
  triggerDownload(binary, `Sampath_Appointment_${cleanText(refNumber)}.pdf`);
}
