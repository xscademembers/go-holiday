import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Tour, Inquiry } from '../types';
import { TOURS as INITIAL_TOURS } from '../constants';

// API Base URL - uses relative URL in production (Vercel), localhost in development
const API_URL = import.meta.env.DEV ? 'http://localhost:5000/api' : '/api';

// Default hero image
const DEFAULT_HERO_IMAGE = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1920&auto=format&fit=crop';

interface SiteSettings {
  heroBackgroundImage: string;
}

interface DataContextType {
  tours: Tour[];
  inquiries: Inquiry[];
  loading: boolean;
  toursLoading: boolean;
  siteSettings: SiteSettings;
  addTour: (tour: Tour) => Promise<void>;
  updateTour: (id: string, tour: Partial<Tour>) => Promise<void>;
  deleteTour: (id: string) => Promise<void>;
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => Promise<void>;
  markInquiryRead: (id: string) => void;
  refreshInquiries: () => Promise<void>;
  refreshTours: () => Promise<void>;
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Tours from MongoDB
  const [tours, setTours] = useState<Tour[]>([]);
  const [toursLoading, setToursLoading] = useState(true);

  // Inquiries from MongoDB
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  // Site Settings
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    heroBackgroundImage: DEFAULT_HERO_IMAGE
  });

  // Fetch tours from MongoDB
  const refreshTours = useCallback(async () => {
    try {
      setToursLoading(true);
      const response = await fetch(`${API_URL}/tours`);
      if (response.ok) {
        const data = await response.json();
        setTours(data);
      } else {
        // Fallback to constants if API fails
        console.warn('Failed to fetch tours from API, using fallback');
        setTours(INITIAL_TOURS);
      }
    } catch (error) {
      console.error('Failed to fetch tours:', error);
      // Fallback to constants if API fails
      setTours(INITIAL_TOURS);
    } finally {
      setToursLoading(false);
    }
  }, []);

  // Fetch inquiries from MongoDB
  const refreshInquiries = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/inquiries`);
      if (response.ok) {
        const data = await response.json();
        setInquiries(data);
      }
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data on mount
  useEffect(() => {
    refreshTours();
    refreshInquiries();
  }, [refreshTours, refreshInquiries]);

  // Add tour to MongoDB
  const addTour = async (tour: Tour) => {
    try {
      const response = await fetch(`${API_URL}/tours`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tour),
      });

      if (response.ok) {
        const newTour = await response.json();
        setTours((prev) => [newTour, ...prev]);
      } else {
        let errorMessage = 'Failed to add tour';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      console.error('Failed to add tour:', error);
      throw error;
    }
  };

  // Update tour in MongoDB
  const updateTour = async (id: string, updatedFields: Partial<Tour>) => {
    try {
      if (!id) {
        throw new Error('Tour ID is required for update');
      }

      // Optimistic update
      setTours((prev) => prev.map(t => t.id === id ? { ...t, ...updatedFields } : t));

      const encodedId = encodeURIComponent(id);
      const response = await fetch(`${API_URL}/tours/${encodedId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to update tour';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          errorMessage = response.statusText || errorMessage;
        }
        // Revert on error by refreshing
        await refreshTours();
        throw new Error(errorMessage);
      }
      // On success, refresh to ensure UI is in sync with database
      await refreshTours();
    } catch (error: any) {
      console.error('Failed to update tour:', error);
      // Revert on error by refreshing
      await refreshTours();
      throw error;
    }
  };

  // Delete tour from MongoDB
  const deleteTour = async (id: string) => {
    try {
      if (!id) {
        throw new Error('Tour ID is required');
      }

      // Optimistic update
      setTours((prev) => prev.filter(t => t.id !== id));

      // Encode the ID to handle special characters
      const encodedId = encodeURIComponent(id);
      const response = await fetch(`${API_URL}/tours/${encodedId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        // Get error message from response if available
        let errorMessage = 'Failed to delete tour';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        
        // Revert on error by refreshing
        await refreshTours();
        throw new Error(errorMessage);
      }
      
      // On success, refresh to ensure UI is in sync with database
      await refreshTours();
    } catch (error) {
      console.error('Failed to delete tour:', error);
      // Revert on error by refreshing
      await refreshTours();
      throw error;
    }
  };

  // Add inquiry to MongoDB
  const addInquiry = async (data: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    try {
      const response = await fetch(`${API_URL}/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newInquiry = await response.json();
        setInquiries((prev) => [newInquiry, ...prev]);
      }
    } catch (error) {
      console.error('Failed to add inquiry:', error);
      throw error;
    }
  };

  // Mark inquiry as read in MongoDB
  const markInquiryRead = async (id: string) => {
    try {
      // Optimistic update
      setInquiries((prev) => prev.map(i => i.id === id ? { ...i, status: 'read' } : i));

      await fetch(`${API_URL}/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'read' }),
      });
    } catch (error) {
      console.error('Failed to update inquiry:', error);
      // Revert on error
      refreshInquiries();
    }
  };

  // Fetch site settings from MongoDB
  const fetchSiteSettings = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/settings`);
      if (response.ok) {
        const data = await response.json();
        if (data.heroBackgroundImage) {
          setSiteSettings(prev => ({ ...prev, heroBackgroundImage: data.heroBackgroundImage }));
        }
      }
    } catch (error) {
      console.error('Failed to fetch site settings:', error);
      // Keep default settings on error
    }
  }, []);

  // Update site settings
  const updateSiteSettings = async (newSettings: Partial<SiteSettings>) => {
    try {
      // Optimistic update
      setSiteSettings(prev => ({ ...prev, ...newSettings }));

      const response = await fetch(`${API_URL}/settings`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSettings),
      });

      if (!response.ok) {
        // Revert on error
        fetchSiteSettings();
        throw new Error('Failed to update site settings');
      }
    } catch (error) {
      console.error('Failed to update site settings:', error);
      throw error;
    }
  };

  // Fetch site settings on mount
  useEffect(() => {
    fetchSiteSettings();
  }, [fetchSiteSettings]);

  return (
    <DataContext.Provider value={{
      tours,
      inquiries,
      loading,
      toursLoading,
      siteSettings,
      addTour,
      updateTour,
      deleteTour,
      addInquiry,
      markInquiryRead,
      refreshInquiries,
      refreshTours,
      updateSiteSettings
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};