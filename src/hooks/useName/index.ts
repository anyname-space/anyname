import { useQuery } from "react-query";
import { NAME_TYPE_LIST_KEY } from "../../constants/queryKey";
import { getNameTypeList } from "../../utils/fetcher/nameType";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getFileNameList, getNameDetail } from "../../utils/fetcher/name";
import { useSearchParams } from "react-router-dom";

const useName = () => {
  const [nameList, setNameList] = useState<Array<NameData>>([]);
  const [searchParams] = useSearchParams();

  const {
    data: nameTypeList,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [NAME_TYPE_LIST_KEY],
    queryFn: () => getNameTypeList(),
  });

  const nameTypeParam = useMemo(
    () => searchParams.get("name_type"),
    [searchParams]
  );
  const genderParam = useMemo(() => searchParams.get("gender"), [searchParams]);
  const categoryParam = useMemo(
    () => searchParams.get("category"),
    [searchParams]
  );

  const isNoFilter = useMemo(
    () =>
      nameTypeParam === null && genderParam === null && categoryParam === null,
    [categoryParam, genderParam, nameTypeParam]
  );

  const nameFiltered = useMemo(() => {
    if (!isNoFilter) {
      return nameList.filter((nameData) => {
        const isSameNameType =
          nameTypeParam !== null ? nameData.name_type === nameTypeParam : true;
        const isSameGender =
          genderParam !== null ? nameData.gender === genderParam : true;
        const isSameCategory =
          categoryParam !== null
            ? nameData.category.includes(categoryParam)
            : true;

        return isSameNameType && isSameCategory && isSameGender;
      });
    }
    return nameList;
  }, [categoryParam, genderParam, isNoFilter, nameList, nameTypeParam]);

  const fetchNameDetail = useCallback(() => {
    if (nameTypeList) {
      nameTypeList.forEach(async (nameType) => {
        const responseFileNameList = await getFileNameList(nameType);
        if (responseFileNameList) {
          responseFileNameList.forEach(async (fileName) => {
            const responseDetail = await getNameDetail(
              fileName.fileName,
              nameType
            );
            if (responseDetail && responseDetail.name !== "") {
              setNameList((state) => [...state, responseDetail]);
            }
          });
        }
      });
    }
  }, [nameTypeList]);

  useEffect(() => {
    fetchNameDetail();
  }, [fetchNameDetail]);

  return {
    nameList,
    nameFiltered,
    isError,
    isLoading,
  };
};

export default useName;
