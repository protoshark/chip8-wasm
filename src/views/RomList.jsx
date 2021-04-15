import { useCallback, useMemo } from "react";
import { connect } from "react-redux";

import DataListInput from "react-datalist-input";

import { setRom } from "../redux/actions";

const RomList = (props) => {
  const pickRom = useCallback(
    (item) => {
      props.setRom({rom: item.rom});
    },
    [props]
  );

  const getRoms = useMemo(() => {
    return props.roms.map((rom) => ({
      label: rom.name,
      key: rom.id,
      rom
    }));
  }, [props.roms]);

  return (
    <DataListInput
      items={getRoms}
      onSelect={pickRom}
      placeholder="Select a ROM"
      clearInputOnClick={true}
      inputClassName="rom-input"
      dropdownClassName="rom-dropdown"
      itemClassName="item"
    />
  );
};

export default connect(null, { setRom })(RomList);
