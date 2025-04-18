import React from "react";
import { getPagesArray } from "../../../utils/pages";
import style from "./Pagination.module.scss";

interface PaginationProps {
  totalPages: number;
  page: number;
  changePage: (page: number, limit: number) => void;
  limit: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  page,
  changePage,
  limit,
}) => {
  let pagesArray = getPagesArray(totalPages);
  return (
    <div className={style.page__wrapper}>
      {pagesArray.map((item) => {
        return (
          <span
            onClick={() => changePage(item, limit)}
            key={item}
            className={`${style.page} ${
              page === item ? style.page__current : ""
            }`}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
};

export default Pagination;
