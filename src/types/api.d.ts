type CategoryListResponse = {
  category: CategoryList;
};

type GenderListResponse = {
  gender: GenderList;
};

type NameTypeListResponse = {
  name_type: NameTypeList;
};

type FileNameListResponse = {
  name: string;
};

type NameDetailResponse = {
  name: string;
  name_type: NameType;
  gender: Gender;
  origin: string;
  category: CategoryList;
  contributor: {
    github_username: string;
  };
  meaning: string;
};
