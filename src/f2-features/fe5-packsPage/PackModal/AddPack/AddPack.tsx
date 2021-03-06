import SuperButton from "f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton";
import { PackAddForm } from "f2-features/fe5-packsPage/PackModal/AddPack/PackAddForm";
import React, { FC, useState } from "react";
import { Modal } from "../../../../f1-main/m1-ui/u3-common/c4-modal/Modal";
import { useDispatch } from "react-redux";
import { addPackTC } from "f1-main/m2-store/reducers/packsReducer";

export const AddPack = () => {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const addNewPack = (name: string, privateBoolean: boolean) => {
    setEditMode(false);
    dispatch(addPackTC(name, privateBoolean));
  };

  return (
    <div>
      <div>
        <SuperButton
          onClick={() => {
            setEditMode(true);
          }}
        >
          Add pack
        </SuperButton>
      </div>
      <Modal editMode={editMode} setEditMode={setEditMode}>
        <PackAddForm addNewPack={addNewPack} />
      </Modal>
    </div>
  );
};
