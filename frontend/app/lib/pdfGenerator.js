
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


export function generateApplicationPdf(data) {
  const refNumber = data.referenceNumber || data.refNumber || `SB-WM-${Date.now().toString().slice(-6)}`;
  const dateStr = data.submittedAt
    ? new Date(data.submittedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  let stream = 'q\n';

 
  stream += '0.106 0.169 0.357 rg\n';
  stream += '0 755 595.28 86.89 re f\n';

  
  stream += '0.784 0.588 0.118 rg\n';
  stream += '0 749 595.28 6 re f\n';

  
  stream += 'BT\n/F2 20 Tf\n1 1 1 rg\n40 798 Td\n(SAMPATH BANK PLC) Tj\nET\n';
  stream += 'BT\n/F1 11 Tf\n0.784 0.588 0.118 rg\n40 778 Td\n(WEALTH MANAGEMENT DIVISION - DIGITAL APPLICATION FORM) Tj\nET\n';

  
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
    offsets.push(new TextEncoder().encode(pdf).length);
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

  
  const streamLength = new TextEncoder().encode(stream).length;
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

 
  const startXref = new TextEncoder().encode(pdf).length;
  pdf += 'xref\n';
  pdf += `0 ${offsets.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (const off of offsets) {
    pdf += String(off).padStart(10, '0') + ' 00000 n \n';
  }

  
  pdf += `trailer\n<< /Size ${offsets.length + 1} /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF`;

  const binary = new TextEncoder().encode(pdf);
  triggerDownload(binary, `Sampath_Application_${cleanText(refNumber)}.pdf`);
}


export function generateAppointmentPdf(data) {
  const refNumber = data.refNumber || `APT-${Date.now().toString().slice(-6)}`;
  const dateStr = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  let stream = 'q\n';

  
  stream += '0.106 0.169 0.357 rg\n';
  stream += '0 755 595.28 86.89 re f\n';

  
  stream += '0.784 0.588 0.118 rg\n';
  stream += '0 749 595.28 6 re f\n';

  
  stream += 'BT\n/F2 20 Tf\n1 1 1 rg\n40 798 Td\n(SAMPATH BANK PLC) Tj\nET\n';
  stream += 'BT\n/F1 11 Tf\n0.784 0.588 0.118 rg\n40 778 Td\n(WEALTH MANAGEMENT - ADVISOR APPOINTMENT CONFIRMATION SLIP) Tj\nET\n';

 
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

  
  stream += '0.95 0.97 1.0 rg\n';
  stream += `40 ${y - 55} 515.28 65 re f\n`;
  stream += '0.2 0.4 0.7 RG\n';
  stream += `40 ${y - 55} 515.28 65 re S\n`;

  stream += `BT\n/F2 9 Tf\n0.106 0.169 0.357 rg\n50 ${y - 12} Td\n(IMPORTANT INFORMATION FOR YOUR VISIT:) Tj\nET\n`;
  stream += `BT\n/F1 8 Tf\n0.2 0.25 0.35 rg\n50 ${y - 26} Td\n(- Please arrive 10 minutes prior to your allocated time slot.) Tj\nET\n`;
  stream += `BT\n/F1 8 Tf\n0.2 0.25 0.35 rg\n50 ${y - 38} Td\n(- Kindly present this confirmation slip along with your National Identity Card (NIC) or Passport.) Tj\nET\n`;
  stream += `BT\n/F1 8 Tf\n0.2 0.25 0.35 rg\n50 ${y - 50} Td\n(- A dedicated Wealth Management Advisor will assist you at the designated branch.) Tj\nET\n`;

  // Footer
  stream += '0.106 0.169 0.357 RG\n';
  stream += '40 50 m 555 50 l S\n';
  stream += 'BT\n/F1 7.5 Tf\n0.5 0.5 0.5 rg\n40 38 Td\n(Sampath Bank PLC | Wealth Management Division | Hotline: +94 11 230 8308 | Email: wealth@sampath.lk) Tj\nET\n';

  stream += 'Q\n';

  
  let pdf = '%PDF-1.4\n';
  const offsets = [];

  function addObj(body) {
    offsets.push(new TextEncoder().encode(pdf).length);
    pdf += `${offsets.length} 0 obj\n${body}\nendobj\n`;
  }

  addObj('<< /Type /Catalog /Pages 2 0 R >>');
  addObj('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  addObj('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>');
  addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');
  const streamLength = new TextEncoder().encode(stream).length;
  addObj(`<< /Length ${streamLength} >>\nstream\n${stream}\nendstream`);

  const startXref = new TextEncoder().encode(pdf).length;
  pdf += 'xref\n';
  pdf += `0 ${offsets.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (const off of offsets) {
    pdf += String(off).padStart(10, '0') + ' 00000 n \n';
  }
  pdf += `trailer\n<< /Size ${offsets.length + 1} /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF`;

  const binary = new TextEncoder().encode(pdf);
  triggerDownload(binary, `Sampath_Appointment_${cleanText(refNumber)}.pdf`);
}
