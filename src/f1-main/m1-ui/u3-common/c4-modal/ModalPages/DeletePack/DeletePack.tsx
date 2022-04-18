import SuperButton from "f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton"
import { useAppSelector } from "f1-main/m2-store/store"
import s from "./DeletePack.module.scss"

type DeletePacksPropsType = {
    deletePack: (id: string) => void
}

const DeletePack = ({deletePack}: DeletePacksPropsType) => {
    const id = useAppSelector<string>(state => state.modal.id)
    const name = useAppSelector<string>(state => state.modal.name)


    const deletePackOnClick = () => {
        deletePack(id)
    }


    return (
        <div className={s.delete_packs_container}>
            <p>Do you really want to remove pack -<a> {name}</a>?</p>
            <p>All cards will be excluded from this course.</p>
            <SuperButton onClick={deletePackOnClick} className={s.delete_button}>Delete</SuperButton>
        </div>
    )
}

export default DeletePack