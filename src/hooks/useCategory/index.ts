import { useQuery } from 'react-query';
import { getCategoryList } from '../../utils/fetcher/category';
import { CATEGORY_LIST_KEY } from '../../constants/queryKey';

const useCategory = () => {
  const {
    data: categoryList,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [CATEGORY_LIST_KEY],
    queryFn: () => getCategoryList(),
  });

  return {
    categoryList: categoryList || [],
    isError,
    isLoading,
  };
};

export default useCategory;
