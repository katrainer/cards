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
            <div className={s.close} onClick={()=>setEditMode(false)}>X</div>
                {children}
            </div>
        </div>
    )
})


