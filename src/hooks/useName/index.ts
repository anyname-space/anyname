import { useQuery } from 'react-query';
import { NAME_TYPE_LIST_KEY } from '../../constants/queryKey';
import { getNameTypeList } from '../../utils/fetcher/nameType';
import { useCallback, useEffect, useState } from 'react';
import { getFileNameList, getNameDetail } from '../../utils/fetcher/name';

const useName = () => {
  const [nameList, setNameList] = useState<Array<NameData>>([]);

  const {
    data: nameTypeList,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [NAME_TYPE_LIST_KEY],
    queryFn: () => getNameTypeList(),
  });

  const fetchNameDetail = useCallback(() => {
    if (nameTypeList) {
      nameTypeList.forEach(async (nameType) => {
        const responseFileNameList = await getFileNameList(nameType);
        if (responseFileNameList) {
          responseFileNameList.forEach(async (fileName) => {
            const responseDetail = await getNameDetail(fileName.fileName, nameType);
            if (responseDetail && responseDetail.name !== '') {
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
    isError,
    isLoading,
  };
};

export default useName;
