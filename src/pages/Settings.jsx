import React, { useContext, useState } from "react";
import { ThemeContext } from "../components/ThemeContext.jsx";

const Settings = () => {
  const { theme, setTheme, font, setFont } = useContext(ThemeContext);

  const [openTheme, setOpenTheme] = useState(false);
  const [openFont, setOpenFont] = useState(false);

  const optionsTheme = ["light", "dark"];
  const optionsFont = ["sans", "serif"];

  return (
    <div className="min-h-screen bg-app p-4 sm:p-6 md:p-10">

      <div className="card-app rounded-xl shadow-md p-4 sm:p-6 mb-6">
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-sm opacity-70 mt-1">
          Customize your application preferences
        </p>
      </div>

      <div className="card-app rounded-xl shadow-md p-4 sm:p-6 max-w-2xl space-y-6">

        <div className="relative">
          <label className="block mb-2 font-semibold">Theme</label>

          <div
            onClick={() => setOpenTheme(!openTheme)}
            className="w-full p-2 border border-app rounded cursor-pointer flex justify-between items-center"
          >
            <span className="capitalize">{theme}</span>
            <span>▼</span>
          </div>

          {openTheme && (
            <div className="absolute z-50 w-full mt-2 card-app rounded shadow-md overflow-hidden">
              {optionsTheme.map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    setTheme(opt);
                    setOpenTheme(false);
                  }}
                  className={`
                    p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700
                    ${theme === "dark" ? "text-white" : "text-black"}
                  `}
                >
                  {opt === "light" ? "🌞 Light" : "🌙 Dark"}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <label className="block mb-2 font-semibold">Font</label>

          <div
            onClick={() => setOpenFont(!openFont)}
            className="w-full p-2 border border-app rounded cursor-pointer flex justify-between items-center"
          >
            <span className="capitalize">{font}</span>
            <span>▼</span>
          </div>

          {openFont && (
            <div className="absolute z-50 w-full mt-2 card-app rounded shadow-md overflow-hidden">
              {optionsFont.map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    setFont(opt);
                    setOpenFont(false);
                  }}
                  className={`
                    p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700
                    ${theme === "dark" ? "text-white" : "text-black"}
                  `}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Settings;