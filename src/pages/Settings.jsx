import React, { useContext } from "react";
import { ThemeContext } from "../components/ThemeContext.jsx";

const Settings = () => {

  const { theme, setTheme, font, setFont } = useContext(ThemeContext);

  return (

    <div className="min-h flex items-center justify-center">
      <div className="w-full max-w-lg card-app shadow-md rounded-lg p-6">

        <h2 className="text-2xl font-bold mb-6">Settings</h2>

        <div className="mb-6">
          <label className="block mb-2 font-semibold">Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full p-2 border rounded bg-transparent"
          >
            <option value="light">🌞 Light</option>
            <option value="dark">🌙 Dark</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">Font</label>
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className="w-full p-2 border rounded bg-transparent"
          >
            <option value="sans">Sans</option>
            <option value="serif">Serif</option>
          </select>
        </div>

      </div>
    </div>

  );
};

export default Settings;