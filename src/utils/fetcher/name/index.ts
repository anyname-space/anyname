import axios from 'axios';
import { PATH_NAME_DETAIL, PATH_NAME_LIST } from '../../../constants/routes';
import { DEFAULT_NAME_DATA } from '../../../constants/nameStore';

export const getFileNameList = async (nameType: NameType): Promise<FileNameList> => {
  try {
    const res = await axios.get<Array<FileNameListResponse>>(`${PATH_NAME_LIST}/${nameType}`);
    if (res) {
      return res.data.map((fileData) => ({
        fileName: fileData.name,
      }));
    }
    return [];
  } catch (error) {
    console.log('error', error);
    return [];
  }
};

export const getNameDetail = async (fileName: string, nameType: NameType): Promise<NameData> => {
  try {
    const res = await axios.get<NameDetailResponse>(`${PATH_NAME_DETAIL}/${nameType}/${fileName}`);
    if (res) {
      return res.data;
    }
    return DEFAULT_NAME_DATA;
  } catch (error) {
    console.log('error', error);
    return DEFAULT_NAME_DATA;
  }
};
