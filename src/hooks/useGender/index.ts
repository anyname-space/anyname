import { useQuery } from 'react-query';
import { GENDER_LIST_KEY } from '../../constants/queryKey';
import { getGenderList } from '../../utils/fetcher/gender';

const useGender = () => {
  const {
    data: genderList,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [GENDER_LIST_KEY],
    queryFn: () => getGenderList(),
  });

  return {
    genderList: genderList || [],
    isError,
    isLoading,
  };
};

export default useGender;
