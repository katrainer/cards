import s from './Modal.module.css'
import {FC, memo} from "react";


export type PropsType = {
    editMode: boolean
    setEditMode: (editMode: boolean) => void
}
export const Modal: FC<PropsType> = memo(({editMode, setEditMode, children}) => {
    return (
        <div className={editMode ? `${s.modal} ${s.active}` : s.modal}>
            <div className={editMode ? `${s.modal__content} ${s.active}` : s.modal__content}>
            <span onClick={()=>setEditMode(false)}>x</span>
                {children}
            </div>
        </div>
    )
})


