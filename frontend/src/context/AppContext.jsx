import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;
 
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);
  const currencySymbol = 'Rs.'; // Default currency symbol

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/data');
      if (data.success) {
        setUserData(data.userData);
      }
    } catch (error) {
      // Silently handle user data fetch errors without showing toasts
      console.log('User data not available');
    }
  };

  return (
    <AppContent.Provider value={{
      isLoggedin,
      setIsLoggedin,
      userData,
      setUserData,
      backendUrl,
      getUserData,
      currencySymbol
    }}>
      {props.children}
    </AppContent.Provider>
  );
};
