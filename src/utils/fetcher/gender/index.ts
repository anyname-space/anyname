import axios from 'axios';
import { PATH_GENDER_LIST } from '../../../constants/routes';

export const getGenderList = async (): Promise<GenderList> => {
  try {
    const res = await axios.get<GenderListResponse>(PATH_GENDER_LIST);
    if (res) {
      return res.data.gender;
    }
    return [];
  } catch (error) {
    console.log('error', error);
    return [];
  }
};
