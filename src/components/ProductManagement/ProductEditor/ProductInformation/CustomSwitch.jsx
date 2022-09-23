import { Switch } from "antd";
import React, { useState } from "react";

function CustomSwitch({ setNewChange, title, value = {}, onChange }) {
  const triggerChange = (changedValue) => {
    onChange?.(changedValue);
  };

  const onSwitchChange = (isNewValue) => {
    if (setNewChange) {
      setNewChange(isNewValue);
    }
    triggerChange(isNewValue);
  };

  return (
    <div className="flex items-center">
      <Switch
        defaultChecked={value}
        checked={value}
        onChange={onSwitchChange}
      />
      <div className="ml-2">{title}</div>
    </div>
  );
}

export default CustomSwitch;
