import React, { useState, useEffect } from 'react';
import axiosInstance from '@/api/axios';
import { Bell } from 'lucide-react';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get('notifications/');
        setNotifications(response.data.results);
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error('Error fetching notifications:', error);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotifications();
    return () => {
      // Cleanup function
    };
  }, []);

  // Add loading state and notification rendering
  return (
    <div className="relative">
      <Bell className="w-6 h-6 text-gray-600" />
      {!loading && notifications.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
               w-5 h-5 rounded-full flex items-center justify-center">
          {notifications.length}
        </span>
      )}
    </div>
  );
};

// Add this export statement
export default NotificationBell;