import s from '../../../f2-features/fe6-cards/CardsUpdateForm/CardsUpdateForm.module.css'
import SuperButton from 'f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton';
import { addPackTC, updatePackTC } from 'f1-main/m2-store/reducers/packsReducer';
import SuperCheckbox from 'f1-main/m1-ui/u3-common/c3-SuperCheckbox/SuperCheckbox';
import { useState } from 'react';



type PropsType = {
    addNewPack: (name: string, privateBoolean: boolean)=> void
}

export const PackAddForm = ({addNewPack}: PropsType) => {
    const [privateBoolean, setPrivateBoolean] = useState<boolean>(false);
    let [name, setName] = useState("");
  
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
    )
}