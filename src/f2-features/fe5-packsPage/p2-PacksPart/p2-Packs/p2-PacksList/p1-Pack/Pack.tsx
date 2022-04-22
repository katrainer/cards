import SuperButton from "f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton";
import React, {useState} from "react";
import s from "./Pack.module.css";
import {routesPath} from "../../../../../../f1-main/m1-ui/u2-routes/routesPath";
import {useNavigate} from "react-router-dom";
import {TiBrush} from "react-icons/ti";
import {Modal} from "f1-main/m1-ui/u3-common/c4-modal/Modal";
import {PackUpdateForm} from "f2-features/fe5-packsPage/PackModal/PackUpdateForm";
import {PackDeleteForm} from "f2-features/fe5-packsPage/PackModal/PackDeleteForm";
import {AiOutlineDelete} from "react-icons/ai";
import {useAppSelector} from "../../../../../../f1-main/m2-store/store";

type PackPropsType = {
    name: string;
    cardsCount: number;
    update: string;
    id: string;
    owner: string;
    user_id: string
};
export const Pack: React.FC<PackPropsType> = ({
                                                  name,
                                                  cardsCount,
                                                  update,
                                                  id,
                                                  owner,
                                                  user_id,
                                              }) => {
    const [editMode1, setEditMode1] = useState(false);
    const [editMode2, setEditMode2] = useState(false);
    const navigate = useNavigate();
    const myId = useAppSelector(state => state.profile.profile._id)

    console.log('render');
    return (
        <div className={s.mainContainer}>
            <div>{owner}</div>
            <div>{name}</div>
            <div>{cardsCount}</div>
            <div>{update}</div>
            <div className={s.buttonsContainer}>
                <div>
                    <div>
                        <SuperButton
                            onClick={() => navigate(`${routesPath.learn}/${id}/${name}`)}
                        >
                            Learn
                        </SuperButton>
                    </div>
                    <div>
                        <SuperButton
                            onClick={() => navigate(`${routesPath.card}/${id}/${name}`)}
                        >
                            Cards
                        </SuperButton>
                    </div>
                </div>
                {user_id === myId &&
                <div className={s.buttonsIcon}>
                    <div>
                        <div
                            onClick={() => {
                                setEditMode1(true);
                            }}
                        >
                            <TiBrush/>
                        </div>
                        <div>
                            <Modal editMode={editMode1} setEditMode={setEditMode1}>
                                <PackUpdateForm setEditMode1={setEditMode1} id={id}/>
                            </Modal>
                        </div>

                        <div
                            onClick={() => {
                                setEditMode2(true);
                            }}
                        >
                            <AiOutlineDelete/>
                        </div>
                        <div>
                            <Modal editMode={editMode2} setEditMode={setEditMode2}>
                                <PackDeleteForm setEditMode2={setEditMode2} id={id}/>
                            </Modal>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    );
};
