import { useCallback, useMemo } from "react";
import { connect } from "react-redux";

import "./RomList.scss";

import Select from "react-select";

import { setRom } from "../redux/actions";

const RomList = (props) => {
  const dropdownStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#020704",
      boxShadow: "none",
      border: "2px solid",
      color: "#32ff6660",
      borderRadius: 0,
      "&:hover": {
        borderColor: "#32ff66",
      },
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      background: "#32ff6660",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#32ff66",
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      color: "#32ff66",
    }),
    input: (provided) => ({
      ...provided,
      color: "#32ff66",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#32ff6660",
    }),
    dropdownIndicator: (provided, _state) => ({
      ...provided,
      color: "#32ff66",
      "&:hover": {
        color: "#32ff66bf",
      },
    }),
    menu: (provided, _state) => ({
      ...provided,
      background: "#020704",
      margin: 0,
      border: "2px solid #32ff6660",
      borderTop: 0,
      borderRadius: 0,
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isFocused || state.isSelected ? "#32ff6610" : "#020704",
      color: state.isFocused ? "#32ff66" : "#32ff6660",
      ":active": {
        background: "#32ff6650",
      },
    }),
  };

  const pickRom = useCallback(
    (item) => {
      props.setRom({ rom: item.rom });
    },
    [props]
  );

  const getRoms = useMemo(() => {
    return props.roms
      .map((rom) => ({
        label: rom.name,
        value: rom.id,
        rom,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [props.roms]);

  return (
    <div className="rom-list">
      <Select
        options={getRoms}
        onChange={pickRom}
        styles={dropdownStyles}
        placeholder="Select a ROM..."
      />
    </div>
  );
};

export default connect(null, { setRom })(RomList);
