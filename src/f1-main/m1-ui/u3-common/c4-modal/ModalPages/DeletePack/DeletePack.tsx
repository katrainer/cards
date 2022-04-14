import SuperButton from "f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton"
import { useAppSelector } from "f1-main/m2-store/store"

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
        <div >
            <p>Do you really want to remove pack -<a > {name}</a>?</p>
            <p>All cards will be excluded from this course.</p>
            <SuperButton onClick={deletePackOnClick} >Delete</SuperButton>
        </div>
    )
}

export default DeletePack