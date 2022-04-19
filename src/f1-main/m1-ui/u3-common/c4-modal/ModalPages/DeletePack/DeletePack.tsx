import { deletePackTC } from "f1-main/m2-store/reducers/packsReducer";
import { useAppSelector } from "f1-main/m2-store/store";
import { PackDeleteForm } from "f2-features/fe5-packsPage/PackModal/PackDeleteForm";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Modal } from "../../Modal";

const DeletePack = () => {
  const id = useAppSelector<string>((state) => state.modal.id);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const deletePack = () => {
    setEditMode(false);
    dispatch(deletePackTC(id));
  };

  return (
    <div>
      <div>
        <div
          onClick={() => {
            setEditMode(true);
          }}
        >
         <AiOutlineDelete/>
        </div>
      </div>
      <Modal editMode={editMode} setEditMode={setEditMode}>
        <PackDeleteForm deletePack={deletePack} id={id} />
      </Modal>
    </div>
  );
};

export default DeletePack;
