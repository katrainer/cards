
import s from './ProfileUpdateForm.module.css'
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {updateTC} from "../../../f1-main/m2-store/reducers/ProfileReducer";
import SuperInputText from "../../../f1-main/m1-ui/u3-common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton";


type PropsType = { setEditMode: (editMode: boolean) => void }

// type ErrorType = {
//     name?: string
//     avatar?: string
// }

export const ProfileUpdateForm = ({setEditMode}: PropsType) => {
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
        <form className={s.form} onSubmit={formik.handleSubmit}
              onClick={e => e.stopPropagation()}>
            <SuperInputText placeholder={'name'} {...formik.getFieldProps('name')}/>
            <SuperInputText placeholder={'avatar'} {...formik.getFieldProps('avatar')}/>
            <SuperButton>send</SuperButton>
        </form>
    )
}