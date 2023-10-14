import React, { useEffect, useState } from "react";
import Fetch from "../utils";
import CheckBox from "../Global/CheckBox/CheckBox";

function PermissionsForm({ choosedPermissions, setChoosedPermissions }) {
  const [permissions, setPermissions] = useState([]);
  useEffect(() => {
    Fetch(`${import.meta.env.VITE_API}/settings/permissions`, "GET")
      .then((res) => {
        if (res.type === "success") {
          setPermissions(res.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="grid gap-3 grid-cols-2">
      {permissions.map((permission) => (
        <label
            key={permission._id}
            className="
                flex gap-3 items-center justify-start
                text-light-quarternary-500 dark:text-dark-primary-100
            "
        >
          <CheckBox
            key={permission._id}
            id={permission._id}
            checkedItems={choosedPermissions}
            setCheckedItems={setChoosedPermissions}
          />
        <span className="flex flex-col gap-1">
            <span className="">{
                `${permission.type.split('_')[0]} ${permission.type.split('_')[1]}` 
            }</span>
        </span>
        </label>
      ))}
    </div>
  );
}

export default PermissionsForm;
