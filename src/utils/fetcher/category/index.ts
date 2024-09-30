import axios from 'axios';
import { PATH_CATEGORY_LIST } from '../../../constants/routes';

export const getCategoryList = async (): Promise<CategoryList> => {
  try {
    const res = await axios.get<CategoryListResponse>(PATH_CATEGORY_LIST);
    if (res) {
      return res.data.category;
    }
    return [];
  } catch (error) {
    console.log('error', error);
    return [];
  }
};
