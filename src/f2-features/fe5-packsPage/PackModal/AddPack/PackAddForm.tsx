import SuperButton from "f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton";
import SuperCheckbox from "f1-main/m1-ui/u3-common/c3-SuperCheckbox/SuperCheckbox";
import { useState } from "react";

type PropsType = {
  addNewPack: (name: string, privateBoolean: boolean) => void;
};

export const PackAddForm = ({ addNewPack }: PropsType) => {
  const [privateBoolean, setPrivateBoolean] = useState<boolean>(false);
  let [name, setName] = useState("");

  const addNewPackOnClick = () => {
    addNewPack(name, privateBoolean);
    setName("")
  };

  return (
    <div>
      <p>New pack:</p>
      <input type='text' placeholder='new pack' value={name} onChange={(e) => setName(e.currentTarget.value)} />
      <SuperCheckbox
        checked={privateBoolean}
        onChange={(e) => setPrivateBoolean(e.currentTarget.checked)}
      >
        Private
      </SuperCheckbox>
      <SuperButton onClick={addNewPackOnClick}>Add Pack</SuperButton>
    </div>
  );
};
