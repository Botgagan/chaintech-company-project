import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedSession = localStorage.getItem('activeUser');
    return savedSession ? JSON.parse(savedSession) : null;
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const savedUsers = localStorage.getItem('myAppUsers');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });


  useEffect(() => {
    localStorage.setItem('myAppUsers', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const login = (email, password) => {
    const foundUser = registeredUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
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
    
    setRegisteredUsers([...registeredUsers, userData]);

    setUser(userData);
    
    localStorage.setItem('activeUser', JSON.stringify(userData));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem('activeUser'); 
  };

  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    
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