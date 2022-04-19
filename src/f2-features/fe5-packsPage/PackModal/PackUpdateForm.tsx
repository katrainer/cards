import s from "../../../f2-features/fe6-cards/CardsUpdateForm/CardsUpdateForm.module.css";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import SuperInputText from "f1-main/m1-ui/u3-common/c1-SuperInputText/SuperInputText";
import SuperButton from "f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton";
import { updatePackTC } from "f1-main/m2-store/reducers/packsReducer";

type PropsType = {
  setEditMode1: (editMode: boolean) => void;
  id: string;
};

export const PackUpdateForm = ({ id, setEditMode1 }: PropsType) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values, { resetForm }) => {
      // alert(JSON.stringify(values))
      setEditMode1(false);
      dispatch(updatePackTC(id, values.name));
      resetForm();
    },
  });

  return (
    <form
      className={s.form}
      onSubmit={formik.handleSubmit}
      onClick={(e) => e.stopPropagation()}
    >
      <SuperInputText placeholder={"name"} {...formik.getFieldProps("name")} />
      <SuperButton>Update Pack</SuperButton>
    </form>
  );
};
