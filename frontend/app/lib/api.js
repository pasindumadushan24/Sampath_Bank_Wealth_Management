const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function fetchAPI(path, params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ''}`;

  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (res.status === 403) {
      
      return null;
    }

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch {
    
    return null;
  }
}

export async function getProducts(params = {}) {
  try {
    const data = await fetchAPI('/investment-products', {
      'populate': '*',
      'filters[isActive][$eq]': 'true',
      ...params,
    });
    return data || { data: [] };
  } catch {
    return { data: [] };
  }
}

export async function getProductBySlug(slug) {
  try {
    const data = await fetchAPI('/investment-products', {
      'populate': '*',
      'filters[slug][$eq]': slug,
    });
    return data?.data?.[0] || null;
  } catch {
    return null;
  }
}

export async function getArticles(params = {}) {
  try {
    const data = await fetchAPI('/articles', {
      'populate': '*',
      ...params,
    });
    return data || { data: [] };
  } catch {
    return { data: [] };
  }
}

export async function getArticleBySlug(slug) {
  try {
    const data = await fetchAPI('/articles', {
      'populate': '*',
      'filters[slug][$eq]': slug,
    });
    return data?.data?.[0] || null;
  } catch {
    return null;
  }
}

export async function getFeaturedProducts() {
  try {
    const data = await fetchAPI('/investment-products', {
      'populate': '*',
      'filters[isActive][$eq]': 'true',
      'pagination[pageSize]': '3',
    });
    return data || { data: [] };
  } catch {
    return { data: [] };
  }
}

export async function getFeaturedArticles() {
  try {
    const data = await fetchAPI('/articles', {
      'populate': '*',
      'filters[isFeatured][$eq]': 'true',
      'pagination[pageSize]': '3',
    });
    return data || { data: [] };
  } catch {
    return { data: [] };
  }
}

export async function getTeamMembers(params = {}) {
  try {
    const data = await fetchAPI('/team-members', {
      'sort': 'order:asc',
      ...params,
    });
    return data || { data: [] };
  } catch {
    return { data: [] };
  }
}

export async function submitEnquiry(formData) {
  const url = `${STRAPI_URL}/api/enquiries`;

  // Map enquiryType to valid Strapi enum values ('general' | 'investment-product' | 'account-opening' | 'other')
  let mappedType = 'general';
  const typeStr = (formData.enquiryType || '').toLowerCase();
  if (typeStr.includes('product') || typeStr.includes('deposit') || typeStr.includes('trust') || typeStr.includes('bond') || typeStr.includes('portfolio')) {
    mappedType = 'investment-product';
  } else if (typeStr.includes('account') || typeStr.includes('opening') || typeStr.includes('apply')) {
    mappedType = 'account-opening';
  } else if (typeStr.includes('other')) {
    mappedType = 'other';
  }

  const payload = {
    ...formData,
    enquiryType: mappedType,
    submittedAt: new Date().toISOString(),
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: payload }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Submission failed: ${res.status}`);
  }

  return await res.json();
}

export async function submitAppointment(formData) {
  const url = `${STRAPI_URL}/api/appointments`;
  const payload = {
    ...formData,
    submittedAt: new Date().toISOString(),
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: payload }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Submission failed: ${res.status}`);
  }

  return await res.json();
}

export async function submitApplication(formData) {
  const url = `${STRAPI_URL}/api/applications`;
  
  const ref = formData.referenceNumber || formData.refNumber || `SB-WM-${Date.now().toString().slice(-6)}`;

  // Format payload strictly matching Strapi application schema
  const payload = {
    fullName: formData.fullName || '',
    nicOrPassport: formData.nicOrPassport || '',
    phone: formData.phone || '',
    email: formData.email || '',
    nationality: formData.nationality || 'Sri Lankan',
    address: formData.address || '',
    productName: formData.productName || '',
    investmentAmount: Number(formData.investmentAmount) || 0,
    preferredBranch: formData.preferredBranch || '',
    sourceOfFunds: formData.sourceOfFunds || 'Personal Savings / Income',
    nomineeName: formData.nomineeName || '',
    nomineeNic: formData.nomineeNic || '',
    nomineeRelationship: formData.nomineeRelationship || '',
    referenceNumber: ref,
    pdfDownloadUrl: `${STRAPI_URL}/api/applications/${ref}/pdf`,
    status: 'pending',
    submittedAt: new Date().toISOString(),
  };

  // Only include dob if user selected a date string
  if (formData.dob && String(formData.dob).trim() !== '') {
    payload.dob = formData.dob;
  }

  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: payload }),
    });
  } catch (netErr) {
    throw new Error(`Cannot connect to Strapi backend at ${STRAPI_URL}. Please ensure your Strapi server is running.`);
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const message = errorData?.error?.message || `Strapi server responded with status ${res.status} (${res.statusText})`;
    if (res.status === 403) {
      throw new Error(`Permission Denied (403): Please go to Strapi Admin -> Settings -> Roles -> Public -> Application and tick [✓] 'create', then Save.`);
    }
    if (res.status === 404) {
      throw new Error(`Endpoint Not Found (404): Please restart your Strapi server so it loads the new 'application' API.`);
    }
    throw new Error(message);
  }

  return await res.json();
}
