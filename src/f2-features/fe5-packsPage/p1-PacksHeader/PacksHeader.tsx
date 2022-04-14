import s from "../AllPacks.module.css";
import { Search } from "../../../f1-main/m1-ui/u3-common/c6-Search/Search";
import SuperButton from "../../../f1-main/m1-ui/u3-common/c2-SuperButton/SuperButton";
import { useDispatch } from "react-redux";
import { addPackModalAC } from "f1-main/m2-store/reducers/modal-reducer";

type SearchPagePropsType = {
  search: string;
  setSearch: (e: string) => void;
};
export const PacksHeader = ({ search, setSearch }: SearchPagePropsType) => {
  const dispatch = useDispatch();

  const addPackHandler = () => {
    dispatch(addPackModalAC());
  };

  return (
    <div className={s.goFlex}>
      <Search search={search} setSearch={setSearch} />
      <SuperButton onClick={addPackHandler}>Add Pack</SuperButton>
    </div>
  );
};
