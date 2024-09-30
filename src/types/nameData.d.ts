type Category = string;
type Gender = 'male' | 'female' | 'other';
type NameType = '1' | '2' | '3';
type FileNameData = {
  fileName: string;
};
type NameData = NameDetailResponse;

type CategoryList = Array<Category>;
type GenderList = Array<Gender>;
type NameTypeList = Array<NameType>;
type FileNameList = Array<FileNameData>;

type NameStoreState = {
  categories: CategoryList;
  genders: GenderList;
  nameTypes: NameTypeList;
};

type NameStoreAction = {
  setCategories: (categories: CategoryList) => void;
  setGenders: (genders: GenderList) => void;
  setNameTypes: (names: NameTypeList) => void;
};

type NameStore = NameStoreState & NameStoreAction;
