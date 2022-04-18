import { useState } from "react";
import SuperCheckbox from "f1-main/m1-ui/u3-common/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton";
import s from './AddPacks.module.scss'

type AddPacksPropsType = {
    addNewPack: (name: string, privateBoolean: boolean) => void
};

const AddPacks = ({ addNewPack }: AddPacksPropsType) => {
  const [privateBoolean, setPrivateBoolean] = useState<boolean>(false);
  const [name, setName] = useState('')

  const addNewPackOnClick = () => {
    addNewPack(name, privateBoolean);
  };
  
  return (
    <div className={s.add_packs_container}>
      <p>New pack:</p>
      <input
        value={name}
        onChange={e=>setName(e.currentTarget.value)}
      />
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

export default AddPacks;


