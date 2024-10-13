import React, { useState, useEffect } from "react";
import Select, { ValueType } from "react-select";
import { ICellEditorParams } from "ag-grid-community";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectEditorProps extends ICellEditorParams {
  options: string[];
}

const CustomSelectEditor: React.FC<CustomSelectEditorProps> = (props) => {
  const initialValue = props.value
    ? { label: props.value, value: props.value }
    : null;
  const [value, setValue] = useState<ValueType<Option>>(initialValue);
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const formattedOptions = props.options.map((option) => ({
      label: option,
      value: option,
    }));
    setOptions(formattedOptions);
  }, [props.options]);

  const onChange = (selectedOption: ValueType<Option>) => {
    setValue(selectedOption);
  };

  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      autoFocus
      menuIsOpen
    />
  );
};

export default CustomSelectEditor;
