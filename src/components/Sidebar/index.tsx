import useCategory from '../../hooks/useCategory';
import useGender from '../../hooks/useGender';
import useNameType from '../../hooks/useNameType';
import SidebarCategory, { SidebarCategoryData, SidebarCategoryType } from './SidebarCategory';

const Sidebar = () => {
  const { categoryList } = useCategory();
  const { genderList } = useGender();
  const { nameTypeList } = useNameType();

  type SidebarData = Array<{
    type: SidebarCategoryType;
    data: SidebarCategoryData;
  }>;

  const sidebarData: SidebarData = [
    {
      type: 'category',
      data: categoryList,
    },
    {
      type: 'gender',
      data: genderList,
    },
    {
      type: 'name_type',
      data: nameTypeList,
    },
  ];
  return (
    <>
      <aside>
        <div className='p-7 space-y-8'>
          {sidebarData.map((sidebarItem) => (
            <SidebarCategory key={sidebarItem.type} type={sidebarItem.type} data={sidebarItem.data} />
          ))}
          {/* <div className='space-y-4'>
            <label className='font-semibold block'>Categories</label>
            <div className='flex flex-wrap gap-2'>
              {categoryList.map((category) => (
                <div className='inline-block border rounded-full px-4 py-[6px] bg-neutral-100 border-200 cursor-pointer'>
                  <span className='text-sm'>{category}</span>
                </div>
              ))}
            </div>
          </div>
          <div className='space-y-4'>
            <label className='font-semibold block'>Genders</label>
            <div className='flex flex-wrap gap-2'>
              {genderList.map((gender) => (
                <div className='inline-block border rounded-full px-4 py-[6px] bg-neutral-100 border-200 cursor-pointer'>
                  <span className='text-sm'>{gender}</span>
                </div>
              ))}
            </div>
          </div>
          <div className='space-y-4'>
            <label className='font-semibold block'>Name Types</label>
            <div className='flex flex-wrap gap-2'>
              {nameTypes.map((nameType) => (
                <div className='inline-block border rounded-full px-4 py-[6px] bg-neutral-100 border-200 cursor-pointer'>
                  <span className='text-sm'>{nameType}</span>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
