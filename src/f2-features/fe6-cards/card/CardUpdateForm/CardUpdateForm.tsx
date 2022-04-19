import {useDispatch} from 'react-redux';
import {useFormik} from 'formik';
import SuperInputText from 'f1-main/m1-ui/u3-common/c1-SuperInputText/SuperInputText';
import SuperButton from 'f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton';
import {updateCardTC} from '../../../../f1-main/m2-store/reducers/cardsReducer';


type PropsType = {
    setEditMode: (editMode: boolean) => void
    cardId: string
    cardsPack_id: string
}

export const CardUpdateForm = ({setEditMode, cardId, cardsPack_id}: PropsType) => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            question: '',
            answer: '',
        },
        onSubmit: (values, {resetForm}) => {
            // alert(JSON.stringify(values))
            setEditMode(false)
            dispatch(updateCardTC(cardsPack_id, cardId, values.question, values.answer))
            resetForm();
        }
    })
    return (
        <form  onSubmit={formik.handleSubmit}
              onClick={e => e.stopPropagation()}>
            <SuperInputText placeholder={'question'} {...formik.getFieldProps('question')}/>
            <SuperInputText placeholder={'answer'} {...formik.getFieldProps('answer')}/>
            <SuperButton>send</SuperButton>
        </form>
    )
}