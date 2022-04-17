import s from './PacksHeaderLine.module.css'
import {useDispatch} from 'react-redux';
import {updateRequestPacksDataTC} from '../../../../../f1-main/m2-store/reducers/packsReducer';
import {TiArrowDown, TiArrowUp } from "react-icons/ti";

export const PacksHeaderLine = () => {
    const dispatch = useDispatch()
    const oldSortHandler = () => {
        dispatch(updateRequestPacksDataTC({sortPacks: '1updated'}))
    }
    const newSortHandler = () => {
        dispatch(updateRequestPacksDataTC({sortPacks: '0updated'}))
    }

    return <div className={s.container}>
        <div>Owner</div>
        <div>Name</div>
        <div>Cards Count</div>
        <div>
            <span onClick={oldSortHandler}><TiArrowDown/></span>
            Update
            <span onClick={newSortHandler}><TiArrowUp/></span>
        </div>
        <div>Buttons</div>
    </div>
}
