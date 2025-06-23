import axiosInstance from '@/api/axios';
import { useEffect } from 'react';

const useTokenMonitor = () => {
  useEffect(() => {
    const checkToken = () => {
      const expirationTime = localStorage.getItem("token_expiration");
      if (!expirationTime) return;
      
      const currentTime = new Date().getTime();
      const timeLeft = parseInt(expirationTime) - currentTime;
      
      // Refresh token 1 minute before expiration
      if (timeLeft < 60000 && timeLeft > 0) {
        refreshToken();
      }
    };

    const refreshToken = async () => {
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const response = await axiosInstance.post("token/refresh/", {
          refresh: refreshToken
        });
        
        // Update tokens
        localStorage.setItem("access_token", response.data.access);
        const newExpiration = new Date().getTime() + (15 * 60 * 1000);
        localStorage.setItem("token_expiration", newExpiration.toString());
        
      } catch (error) {
        console.error("Token refresh failed", error);
      }
    };

    // Check token every 30 seconds
    const interval = setInterval(checkToken, 30000);
    return () => clearInterval(interval);
  }, []);
};

export default useTokenMonitor;