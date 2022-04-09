import s from './Modal.module.css'
import {FC} from "react";


export type PropsType = {
    editMode: boolean
    setEditMode: (editMode: boolean) => void
}
export const Modal: FC<PropsType> = ({editMode, setEditMode, children}) => {
    return (
        <div className={editMode ? `${s.modal} ${s.active}` : s.modal} onClick={() => setEditMode(false)}>
            <div className={editMode ? `${s.modal__content} ${s.active}` : s.modal__content}>
                {children}
            </div>
        </div>
    )
}


