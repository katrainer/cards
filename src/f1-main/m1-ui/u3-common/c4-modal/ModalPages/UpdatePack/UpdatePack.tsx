import SuperButton from "f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton"
import { useAppSelector } from "f1-main/m2-store/store"
import { useState } from "react"


type updateNamePacksPropsType = {
    updatePack: (id: string, newName: string) => void
}

const UpdatePack = ({updatePack}: updateNamePacksPropsType) => {

    const id = useAppSelector<string>(state => state.modal.id)
    const name = useAppSelector<string>(state => state.modal.name)
    const [value, setValue] = useState(name)
    

    const updatePackName = () => {
        updatePack(id, value)
    }

    return (
        <div >
            <p>New name:</p>
            <input value={value} onChange={(e) => setValue(e.currentTarget.value)} placeholder={'Name'}/>

            <SuperButton onClick={updatePackName}>Update name</SuperButton>
        </div>
    )
}

export default UpdatePack