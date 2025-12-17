import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // 1. Initialize USER from localStorage (Session Persistence)
  // This keeps you logged in even if you refresh the page
  const [user, setUser] = useState(() => {
    const savedSession = localStorage.getItem('activeUser');
    return savedSession ? JSON.parse(savedSession) : null;
  });

  // 2. Initialize DATABASE from localStorage
  // This stores all created accounts
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const savedUsers = localStorage.getItem('myAppUsers');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  // Sync database to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('myAppUsers', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // --- ACTIONS ---

  const login = (email, password) => {
    const foundUser = registeredUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      // SAVE SESSION: This remembers you are logged in
      localStorage.setItem('activeUser', JSON.stringify(foundUser)); 
      return { success: true };
    } else {
      return { success: false, message: "Invalid email or password" };
    }
  };

  const register = (userData) => {
    const exists = registeredUsers.find(u => u.email === userData.email);
    if (exists) {
      return { success: false, message: "Email already registered!" };
    }
    
    // Add to Database
    setRegisteredUsers([...registeredUsers, userData]);
    
    // AUTO-LOGIN: Set user state immediately
    setUser(userData);
    
    // SAVE SESSION:
    localStorage.setItem('activeUser', JSON.stringify(userData));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    // REMOVE SESSION: This forgets you were logged in
    localStorage.removeItem('activeUser'); 
  };

  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    
    // Update both Session and Database so data stays consistent
    localStorage.setItem('activeUser', JSON.stringify(newUser));
    
    const updatedList = registeredUsers.map(u => 
      u.email === user.email ? newUser : u
    );
    setRegisteredUsers(updatedList);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);