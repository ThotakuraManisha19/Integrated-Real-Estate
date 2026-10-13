const API_BASE_URL = 'http://localhost:5000/api';

export async function fetchFromApi<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      },
      ...options
    });
    if (!res.ok) {
      console.warn(`API request to ${endpoint} returned status ${res.status}`);
      return null;
    }
    const data = await res.json();
    return data?.data ?? data;
  } catch (err) {
    console.info(`Backend offline or unreachable (${endpoint}), operating in offline local mode.`);
    return null;
  }
}

export const api = {
  // Properties
  getProperties: () => fetchFromApi<any[]>('/properties'),
  createProperty: (data: any) => fetchFromApi<any>('/properties', { method: 'POST', body: JSON.stringify(data) }),
  updateProperty: (id: string, data: any) => fetchFromApi<any>(`/properties/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProperty: (id: string) => fetchFromApi<any>(`/properties/${id}`, { method: 'DELETE' }),
  verifyProperty: (id: string, data: any) => fetchFromApi<any>(`/properties/${id}/verify`, { method: 'POST', body: JSON.stringify(data) }),

  // Middleman Agents
  getAgents: () => fetchFromApi<any[]>('/agents'),
  createAgent: (data: any) => fetchFromApi<any>('/agents', { method: 'POST', body: JSON.stringify(data) }),

  // Appointments
  getAppointments: () => fetchFromApi<any[]>('/appointments'),
  bookAppointment: (data: any) => fetchFromApi<any>('/appointments', { method: 'POST', body: JSON.stringify(data) }),
  updateAppointmentStatus: (id: string, status: string) => 
    fetchFromApi<any>(`/appointments/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  submitInspectionReport: (id: string, report: any) => 
    fetchFromApi<any>(`/appointments/${id}/report`, { method: 'POST', body: JSON.stringify(report) }),

  // Inquiries
  getInquiries: () => fetchFromApi<any[]>('/inquiries'),
  createInquiry: (data: any) => fetchFromApi<any>('/inquiries', { method: 'POST', body: JSON.stringify(data) }),
  updateInquiryStatus: (id: string, status: string) => 
    fetchFromApi<any>(`/inquiries/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),

  // Chats
  getChats: () => fetchFromApi<any[]>('/chats'),
  createChat: (data: any) => fetchFromApi<any>('/chats', { method: 'POST', body: JSON.stringify(data) })
};
