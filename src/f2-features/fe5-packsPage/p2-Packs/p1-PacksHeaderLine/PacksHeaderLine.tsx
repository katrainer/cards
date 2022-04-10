import s from './PacksHeaderLine.module.css'

export const PacksHeaderLine = () => {
    return <div className={s.container}>
        <span>Name</span>
        <span>Cards Count</span>
        <span>Update</span>
        <span>Buttons</span>
    </div>
}
