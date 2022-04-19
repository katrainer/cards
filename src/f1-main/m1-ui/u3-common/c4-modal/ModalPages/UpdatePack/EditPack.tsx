import { updatePackTC } from "f1-main/m2-store/reducers/packsReducer";
import { useAppSelector } from "f1-main/m2-store/store";
import { PackUpdateForm } from "f2-features/fe5-packsPage/PackModal/PackUpdateForm";
import { useState } from "react";
import { TiBrush } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { Modal } from "../../Modal";

const UpdatePack = () => {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const updatePack = (_id:string, name: string) => {
    setEditMode(false);
    dispatch(updatePackTC(_id, name));
  };

  return (
    <div>
      <div>
        <div
          onClick={() => {
            setEditMode(true);
          }}
        >
          <TiBrush />
        </div>
      </div>
      <Modal editMode={editMode} setEditMode={setEditMode}>
        <PackUpdateForm updatePack={updatePack} />
      </Modal>
    </div>
  );
};

export default UpdatePack;
