import { useQuery } from 'react-query';
import { NAME_TYPE_LIST_KEY } from '../../constants/queryKey';
import { getNameTypeList } from '../../utils/fetcher/nameType';

const useNameType = () => {
  const {
    data: nameTypeList,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [NAME_TYPE_LIST_KEY],
    queryFn: () => getNameTypeList(),
  });

  return {
    nameTypeList: nameTypeList || [],
    isError,
    isLoading,
  };
};

export default useNameType;
