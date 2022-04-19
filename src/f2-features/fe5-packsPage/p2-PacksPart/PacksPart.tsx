import { Packs } from "./p2-Packs/Packs";
import { Paginator } from "../../../f1-main/m1-ui/u3-common/c7-Paginator/Paginator";
import SuperSelect from "../../../f1-main/m1-ui/u3-common/c8-SuperSelect/SuperSelect";
import React, { useCallback } from "react";
import { updateRequestPacksDataTC } from "../../../f1-main/m2-store/reducers/packsReducer";
import { useAppSelector } from "../../../f1-main/m2-store/store";
import { useDispatch } from "react-redux";
import { AddPack } from "f2-features/fe5-packsPage/PackModal/AddPack/AddPack";

const arr = ["16", "12", "8", "4"];

export const PacksPart = () => {
  const dispatch = useDispatch();
  const totalCount = useAppSelector<number>(
    (state) => state.packs.cardPacksTotalCount
  );
  const pageCount = useAppSelector<number>(
    (state) => state.packs.requestPacksData.pageCount
  );

  const currentPageHelper = useCallback((page: number) => {
    dispatch(updateRequestPacksDataTC({ page }));
  }, []);

  const setCardCount = (pageCount: number) => {
    dispatch(updateRequestPacksDataTC({ pageCount }));
  };

  return (
    <>
      <h2>Packs</h2>
      <div>{<AddPack />}</div>
      <Packs />
      <div>
        <div style={{ width: 40 }}></div>
        <Paginator
          totalCount={totalCount}
          pageCount={pageCount}
          callback={currentPageHelper}
        />
        <div>
          <SuperSelect
            options={arr}
            value={pageCount}
            onChangeOption={(pageCount) => setCardCount(Number(pageCount))}
          />
        </div>
      </div>
    </>
  );
};
