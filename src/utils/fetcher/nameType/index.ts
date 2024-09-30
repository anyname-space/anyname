import axios from 'axios';
import { PATH_NAME_TYPE_LIST } from '../../../constants/routes';

export const getNameTypeList = async (): Promise<NameTypeList> => {
  try {
    const res = await axios.get<NameTypeListResponse>(PATH_NAME_TYPE_LIST);
    if (res) {
      return res.data.name_type;
    }
    return [];
  } catch (error) {
    console.log('error', error);
    return [];
  }
};
