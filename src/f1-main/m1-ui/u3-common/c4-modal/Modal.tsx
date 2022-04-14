
import {FC} from "react";


export type PropsType = {
    editMode: boolean
    setEditMode: (editMode: boolean) => void
}
export const Modal: FC<PropsType> = ({editMode, setEditMode, children}) => {
    return (
        <div  onClick={() => setEditMode(false)}>
            <div >
                {children}
            </div>
        </div>
    )
}


