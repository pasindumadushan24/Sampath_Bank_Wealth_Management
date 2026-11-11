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
