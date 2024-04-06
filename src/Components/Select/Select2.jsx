import React from "react";
import Select from "react-select";
import "./index.css";

const Select2 = ({
  options,
  onChange,
  value = null,
  search = true,
  place = "Seçin...",
  clear = true,
}) => {
  const styles = {
    container: base => ({
      ...base,
      width: "100%",
    }),
    control: base => ({
      ...base,
      border: "1px solid #0f5280",
      borderRadius: "10px",
      color: "#3797d6",
      minHeight: "20px",
    }),
    // input: base => ({
    //   boxShadow: "none",
    // }),
  };
  // const customOptions = [
  //   {
  //     value: 1,
  //     label: place,
  //     name: "",
  //   },
  //   ...options,
  // ];
  return (
    <Select
      styles={styles}
      options={options}
      // defaultValue={0}
      onChange={onChange}
      search={search}
      placeholder={place}
      isClearable={clear}
      defaultValue={options?.find(option => option.value === value) || null}
    />
  );
};
export default Select2;
