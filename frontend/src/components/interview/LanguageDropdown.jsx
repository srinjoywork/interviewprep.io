import React from "react";
import { languages } from "../../constants";

const LanguageDropdown = ({ langSetter, verSetter, socket, lang, ver, roomId }) => {
  const handleChange = (event) => {
    const selectedLanguage = event.target.value;
    const selectedLangObj = languages.find((l) => l.name === selectedLanguage);

    if (!selectedLangObj) return; // Prevents errors if language is not found

    langSetter(selectedLanguage);
    verSetter(selectedLangObj.version);

    if (socket) {
      socket.emit("change-language", {
        room: roomId,
        data: { language: selectedLanguage, version: selectedLangObj.version },
      });
    }
  };

  return (
    <div>
      <select
        className="p-1 text-lg outline-none bg-blue-500 rounded-md text-white"
        value={lang}
        onChange={handleChange}
      >
        {languages.map((language) => (
          <option key={language.name} value={language.name} className="bg-blue-900">
            {language.name.toUpperCase()} ({language.version})
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageDropdown;
