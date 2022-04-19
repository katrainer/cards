import s from '../../../f2-features/fe6-cards/CardsUpdateForm/CardsUpdateForm.module.css'
import {useDispatch} from 'react-redux';
import {useFormik} from 'formik';
import SuperInputText from 'f1-main/m1-ui/u3-common/c1-SuperInputText/SuperInputText';
import SuperButton from 'f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton';
import { addPackTC, updatePackTC } from 'f1-main/m2-store/reducers/packsReducer';
import SuperCheckbox from 'f1-main/m1-ui/u3-common/c3-SuperCheckbox/SuperCheckbox';
import { useState } from 'react';
import { useAppSelector } from 'f1-main/m2-store/store';



type PropsType = {
  updatePack: (id: string, name: string)=> void
}

export const PackUpdateForm = ({updatePack}: PropsType) => {
   const id = useAppSelector<string>(state => state.modal.id)
    let [name, setName] = useState("");
  
  
  const updatePackName = () => {
    updatePack(id, name)
}

    return (
        <div className={s.add_packs_container}>
               <p>Update pack:</p>
               <input
                 value={name}
                 onChange={e=>setName(e.currentTarget.value)}
               />
                 
                 <SuperButton onClick={updatePackName}>Update Pack</SuperButton>
        
             </div>    
    )
}