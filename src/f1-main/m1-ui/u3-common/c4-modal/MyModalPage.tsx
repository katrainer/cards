import { ModalType } from "f1-main/m2-store/reducers/modal-reducer"
import { useAppSelector } from "f1-main/m2-store/store"
import MyModal from "./ModalPage"
import AddPacks from "./ModalPages/AddPack/AddPack"
import DeletePack from "./ModalPages/DeletePack/DeletePack"
import UpdatePack from "./ModalPages/UpdatePack/UpdatePack"




type MyModalPagePropsType = {
    addNewPack: (name: string, privateBoolean: boolean) => void
    deletePack?: (id: string) => void
    updatePack: (id: string, newName: string) => void
}

const MyModalPage = ({addNewPack, deletePack, updatePack}: MyModalPagePropsType) => {
    const activeModal = useAppSelector<ModalType>(state => state.modal.activeModal)
    const title = useAppSelector<string>(state => state.modal.title)
    return (
        <MyModal activeModal={activeModal} title={title}>
            {activeModal === 'addPack' && <AddPacks addNewPack={addNewPack}/>}
            {/*{activeModal === 'deletePack' && <DeletePack deletePack={deletePack}/>}*/}
            {activeModal === 'updatePack' && <UpdatePack updatePack={updatePack}/>}
        </MyModal>
    )
}

export default MyModalPage