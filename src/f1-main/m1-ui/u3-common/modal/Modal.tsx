import {useFormik} from "formik";
import SuperInputText from "../c1-SuperInputText/SuperInputText";
import s from './Modal.module.css'
import SuperButton from "../c2-SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import {FC} from "react";
import {updateTC} from "../../../m2-store/reducers/ProfileReducer";

type PropsType = {
    editMode: boolean
    setEditMode: (editMode: boolean) => void
}

export const Modal: FC<PropsType> = ({editMode, setEditMode}) => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            name: '',
            avatar: '',
        },
        onSubmit: (values, {resetForm}) => {
            setEditMode(false)
            dispatch(updateTC(values.name, values.avatar))
            resetForm();
        }
    })
    return (
        <div className={editMode ? `${s.modal} ${s.active}` : s.modal} onClick={() => setEditMode(false)}>
            <form className={editMode ? `${s.form} ${s.active}` : s.form} onSubmit={formik.handleSubmit}
                  onClick={e => e.stopPropagation()}>
                <SuperInputText placeholder={'name'} {...formik.getFieldProps('name')}/>
                <SuperInputText placeholder={'avatar'} {...formik.getFieldProps('avatar')}/>
                <SuperButton>send</SuperButton>
            </form>
        </div>
    )
}
type ErrorType = {
    name?: string
    avatar?: string
}