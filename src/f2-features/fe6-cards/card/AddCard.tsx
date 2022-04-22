import React, {FC, useState} from 'react';
import SuperButton from "../../../f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton";
import {Modal} from "../../../f1-main/m1-ui/u3-common/c4-modal/Modal";
import {CardsUpdateForm} from "../CardsUpdateForm/CardsUpdateForm";

type HeaderCardsPropsType = {
    cardsPack_id: string
    userId: string
}

export const AddCard: FC<HeaderCardsPropsType> = ({cardsPack_id,userId}) => {
    const [editMode, setEditMode] = useState(false)

    return (
        <>
                <SuperButton onClick={() => {
                    setEditMode(true)
                }}>Add card</SuperButton>
                <Modal editMode={editMode} setEditMode={setEditMode}>
                    <CardsUpdateForm setEditMode={setEditMode} cardsPack_id={cardsPack_id}/>
                </Modal>
        </>
    );
};
