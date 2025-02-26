import axios from "axios";
import { createContext, useEffect } from "react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [credit, setCredit] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const loadCredits = async () => {
    try {
      let { data } = await axios.get(backendUrl + "/api/user/credits", {
        headers: { token },
      });

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
      toast.error(message.error);
    }
  };

  useEffect(() => {
    if (token) {
      loadCredits();
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logout ");
    setToken("");
    setUser(null);
  };

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/image/generateImage",{prompt},{headers:{token}}
      );
      if (data.success) {
        loadCredits();
        return data.resultImage;
      } else {
        toast.error(data.message);
        loadCredits();

        if (data.creditBalance == 0) {
          navigate("/buyCredits");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    user,generateImage,
    loadCredits,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    setToken,
    token,
    credit,
    setCredit,
    logout,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
