import React from "react";
import Select from "react-select";
import { customStyles } from ""
import { languageOptions } from "../../constants/customStyles";

const LanguagesDropdown = ({ onSelectChange }) => {
    return (
        <Select
            placeholder={`Filter By Category`}
            options={languageOptions}
            styles={customStyles}
            defaultValue={languageOptions[5]}
            onChange={(selectedOption) => onSelectChange(selectedOption)}
        />
    );
};

export default LanguagesDropdown;