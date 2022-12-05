import React, { createContext, useContext, useState } from 'react';

interface AppContextInterface{
  chat: boolean;
  cart: boolean;
  userProfile: boolean;
  norification: boolean;
  currentColor: string;
  currentMode: string;
  activeMenu: boolean;
  screenSize: any;
  setScreenSize: any;
  handleClick: any;
  isClicked: any;
  initialState: any;
  setIsClicked: any;
  setActiveMenu: any;
  setCurrentColor: any;
  setCurrentMode: any;
  setMode: any;
  setColor: any;
  themeSettings: boolean;
  setThemeSettings: any;
  value: any;
}

interface IInitalState {
  chat: boolean;
  cart: boolean;
  userProfile: boolean;
  notification: boolean;
}

const StateContext = createContext<AppContextInterface | any>(null);

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({children}: any) => {
  const [screenSize, setScreenSize] = useState<any>(undefined);
  const [currentColor, setCurrentColor] = useState<string>('#03C9D7');
  const [currentMode, setCurrentMode] = useState<string>('Light');
  const [themeSettings, setThemeSettings] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState<IInitalState>(initialState);

  const setMode = (e: any) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color: string) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked: any) => setIsClicked({ ...initialState, [clicked]: true });

  return (
     // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings}}>
    
    {children}
    </StateContext.Provider>

  );
};

export const useStateContext = () => useContext(StateContext);
