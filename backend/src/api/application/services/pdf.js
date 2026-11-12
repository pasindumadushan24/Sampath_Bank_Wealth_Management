'use strict';

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

function buildApplicationPdfBuffer(data) {
  const refNumber = data.referenceNumber || data.refNumber || `SB-WM-${data.id || Date.now()}`;
  const dateStr = data.submittedAt
    ? new Date(data.submittedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  let stream = 'q\n';

  // Header Banner - Navy Blue (#1B2B5B -> 0.106, 0.169, 0.357)
  stream += '0.106 0.169 0.357 rg\n';
  stream += '0 755 595.28 86.89 re f\n';

  // Gold Accent Line (#C8961E -> 0.784, 0.588, 0.118)
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
      fields: [
        { name: 'full_name', label: 'Full Name', value: data.fullName },
        { name: 'nic_passport', label: 'National Identity / Passport No', value: data.nicOrPassport },
        { name: 'phone', label: 'Contact Phone Number', value: data.phone },
        { name: 'email', label: 'Email Address', value: data.email },
        { name: 'dob', label: 'Date of Birth', value: data.dob || '' },
        { name: 'nationality', label: 'Nationality / Citizenship', value: data.nationality || 'Sri Lankan' },
        { name: 'address', label: 'Residential Address', value: data.address },
      ],
    },
    {
      title: '2. INVESTMENT & PRODUCT SELECTION',
      fields: [
        { name: 'product_name', label: 'Selected Wealth Product', value: data.productName || 'Sampath Growth Fund' },
        { name: 'investment_amount', label: 'Initial Investment Amount (LKR)', value: String(data.investmentAmount || '') },
        { name: 'preferred_branch', label: 'Preferred Servicing Branch', value: data.preferredBranch || 'Colombo - Head Office' },
        { name: 'source_of_funds', label: 'Source of Investment Funds', value: data.sourceOfFunds || 'Personal Savings / Income' },
      ],
    },
    {
      title: '3. BENEFICIARY / NOMINEE DETAILS',
      fields: [
        { name: 'nominee_name', label: 'Nominee Full Name', value: data.nomineeName || '' },
        { name: 'nominee_nic', label: 'Nominee NIC / Identification', value: data.nomineeNic || '' },
        { name: 'nominee_relationship', label: 'Relationship to Applicant', value: data.nomineeRelationship || '' },
      ],
    },
  ];

  const fieldList = [];

  for (const sec of sections) {
    // Section Header
    stream += '0.94 0.95 0.97 rg\n';
    stream += `40 ${y - 4} 515.28 20 re f\n`;
    stream += '0.784 0.588 0.118 rg\n';
    stream += `40 ${y - 4} 4 20 re f\n`;
    stream += `BT\n/F2 10 Tf\n0.106 0.169 0.357 rg\n52 ${y + 2} Td\n(${cleanText(sec.title)}) Tj\nET\n`;
    y -= 22;

    for (const f of sec.fields) {
     
      stream += `BT\n/F2 9 Tf\n0.3 0.35 0.4 rg\n50 ${y + 2} Td\n(${cleanText(f.label)}:) Tj\nET\n`;

     
      fieldList.push({
        name: f.name,
        value: f.value || '',
        rect: [215, y - 2, 550, y + 14],
      });

      y -= 19;
    }
    y -= 6;
  }

  
  stream += '0.98 0.96 0.92 rg\n';
  stream += `40 ${y - 32} 515.28 38 re f\n`;
  stream += '0.784 0.588 0.118 RG\n';
  stream += `40 ${y - 32} 515.28 38 re S\n`;

  stream += `BT\n/F2 8.5 Tf\n0.5 0.35 0.05 rg\n50 ${y - 10} Td\n(APPLICANT DECLARATION & TERMS:) Tj\nET\n`;
  stream += `BT\n/F1 7.5 Tf\n0.3 0.3 0.3 rg\n50 ${y - 20} Td\n(I/We declare that the information provided above is true and accurate. This editable digital application form) Tj\nET\n`;
  stream += `BT\n/F1 7.5 Tf\n0.3 0.3 0.3 rg\n50 ${y - 29} Td\n(allows modification and verification before final branch submission and signing.) Tj\nET\n`;

  y -= 48;

 
  stream += `BT\n/F2 8 Tf\n0.2 0.2 0.2 rg\n50 ${y} Td\n(Applicant Signature: _______________________) Tj\nET\n`;
  stream += `BT\n/F2 8 Tf\n0.2 0.2 0.2 rg\n330 ${y} Td\n(Bank Officer Signature: _______________________) Tj\nET\n`;

  
  stream += '0.106 0.169 0.357 RG\n';
  stream += '40 38 m 555 38 l S\n';
  stream += 'BT\n/F1 7.5 Tf\n0.5 0.5 0.5 rg\n40 26 Td\n(Sampath Bank PLC | Licensed Commercial Bank supervised by CBSL | Head Office: 110 Sir James Peiris Mw, Colombo 02) Tj\nET\n';

  stream += 'Q\n';

  
  let pdf = '%PDF-1.4\n';
  const offsets = [];

  function addObj(body) {
    offsets.push(Buffer.byteLength(pdf, 'utf8'));
    const objNum = offsets.length;
    pdf += `${objNum} 0 obj\n${body}\nendobj\n`;
    return objNum;
  }

  const firstFieldObjNum = 7;
  const fieldRefs = fieldList.map((_, i) => `${firstFieldObjNum + i} 0 R`).join(' ');

  
  addObj(`<< /Type /Catalog /Pages 2 0 R /AcroForm << /Fields [ ${fieldRefs} ] /DR << /Font << /F1 4 0 R /F2 5 0 R >> >> /NeedAppearances true >> >>`);

  
  addObj('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');

  
  addObj(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R /Annots [ ${fieldRefs} ] >>`);

  
  addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');

  
  addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');

  
  const streamLength = Buffer.byteLength(stream, 'utf8');
  addObj(`<< /Length ${streamLength} >>\nstream\n${stream}\nendstream`);

  
  for (const f of fieldList) {
    const val = cleanText(f.value);
    const rectStr = f.rect.join(' ');
    addObj(`<<
  /Type /Annot
  /Subtype /Widget
  /FT /Tx
  /T (${cleanText(f.name)})
  /V (${val})
  /DV (${val})
  /Rect [ ${rectStr} ]
  /F 4
  /DA (/F1 9 Tf 0.1 0.1 0.1 rg)
  /MK << /BC [0.8 0.82 0.85] /BG [0.97 0.98 0.99] >>
  /BS << /W 1 /S /S >>
  /P 3 0 R
>>`);
  }

  
  const startXref = Buffer.byteLength(pdf, 'utf8');
  pdf += 'xref\n';
  pdf += `0 ${offsets.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (const off of offsets) {
    pdf += String(off).padStart(10, '0') + ' 00000 n \n';
  }

  
  pdf += `trailer\n<< /Size ${offsets.length + 1} /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF`;

  return Buffer.from(pdf, 'binary');
}

module.exports = {
  buildApplicationPdfBuffer,
};
