import s from './PacksHeaderLine.module.css'
import {useDispatch} from 'react-redux';
import {updateRequestPacksDataTC} from '../../../../f1-main/m2-store/reducers/packsReducer';

export const PacksHeaderLine = () => {
    const dispatch = useDispatch()
    const oldSortHandler = () => {
        dispatch(updateRequestPacksDataTC({sortPacks: '1updated'}))
    }
    const newSortHandler = () => {
        dispatch(updateRequestPacksDataTC({sortPacks: '0updated'}))
    }

    return <div className={s.container}>
        <span>Name</span>
        <span>Cards Count</span>
        <span>
            <span onClick={oldSortHandler}>{'<old'}</span>
            Update
            <span onClick={newSortHandler}>{'new>'}</span>
        </span>
        <span>Buttons</span>
    </div>
}
