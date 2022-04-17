import React, {useMemo} from 'react';
import {useAppSelector} from '../../../../../f1-main/m2-store/store';
import {PackType} from '../../../../../f1-main/m3-API/apiPacks';
import {Pack} from './p1-Pack/Pack';
import {formatDate} from "../../../../../f1-main/m4-utils/formatDate";

export const PacksList: React.FC = () => {
    const packs = useAppSelector<PackType[]>(state => state.packs.packs)
    const mapPacks = useMemo(() => {
        return packs.map(t =>
            <Pack owner={t.user_name} name={t.name} cardsCount={t.cardsCount} update={formatDate(formatDate(t.updated))} key={t._id} id={t._id}/>
        )
    }, [packs])
    return <div>
        {mapPacks}
    </div>
}