import s from "../../../f2-features/fe6-cards/CardsUpdateForm/CardsUpdateForm.module.css";
import SuperButton from "f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton";
import { useDispatch } from "react-redux";
import { deletePackTC } from "f1-main/m2-store/reducers/packsReducer";

type PropsType = {
  setEditMode2: (editMode: boolean) => void;
  id: string;
};

export const PackDeleteForm = ({ setEditMode2, id }: PropsType) => {
  const dispatch = useDispatch();

  const deletePack = () => {
    setEditMode2(false);
    dispatch(deletePackTC(id));
  };

  return (
    <div className={s.add_packs_container}>
      <h1>Delete pack:</h1>
      <p>Do you really want to remove pack ?</p>
      <p>All cards will be excluded from this course.</p>
      <SuperButton onClick={deletePack}>Delete Pack</SuperButton>
    </div>
  );
};
