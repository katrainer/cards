import s from './ProfileUpdateForm.module.css'
import {useDispatch} from 'react-redux';
import {useFormik} from 'formik';
import {updateProfileTC} from '../../../f1-main/m2-store/reducers/profileReducer';
import SuperInputText from '../../../f1-main/m1-ui/u3-common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../../f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton';
import {useAppSelector} from '../../../f1-main/m2-store/store';
import {ProfileType} from '../../../f1-main/m3-API/apiAuth';


type PropsType = { setEditMode: (editMode: boolean) => void }

export const ProfileUpdateForm = ({setEditMode}: PropsType) => {
    const profile = useAppSelector<ProfileType>(state => state.profile.profile)
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            name: profile.name,
            avatar: profile.avatar,
        },
        onSubmit: (values, {resetForm}) => {
            setEditMode(false)
            dispatch(updateProfileTC(values.name, values.avatar))
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