import React from "react";
import Select from "react-select";
import "./index.css";

const Select2Take = ({
  options,
  onChange,
  value,
  search = true,
  place = "Seçin...",
}) => {
  const styles = {
    container: base => ({
      ...base,
      width: "125px",
    }),
    control: base => ({
      ...base,
      border: "1px solid #0f5280",
      borderRadius: "15px",
    }),
  };
  return (
    <Select
      styles={styles}
      options={[
        // {
        //   value: 10,
        //   label: "10",
        //   name: "setTake",
        // },
        {
          value: 25,
          label: "25",
          name: "setTake",
        },
        {
          value: 50,
          label: "50",
          name: "setTake",
        },
        {
          value: 100,
          label: "100",
          name: "setTake",
        },
      ]}
      defaultValue={{
        value: 25,
        label: "25",
        name: "setTake",
      }}
      onChange={onChange}
      search={false}
      isClearable={false}
      menuPlacement="top"
    />
  );
};
export default Select2Take;
