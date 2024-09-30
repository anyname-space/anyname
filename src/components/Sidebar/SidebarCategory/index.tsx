import { capitalCase } from 'change-case';
import classNames from 'classnames';
import React, { memo, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export type SidebarCategoryType = 'category' | 'gender' | 'name_type';
export type SidebarCategoryData = Array<string>;

type SidebarCategoryProps = {
  type: SidebarCategoryType;
  data: SidebarCategoryData;
};

const SidebarCategory: React.FC<SidebarCategoryProps> = ({ data, type }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const label = useMemo(() => capitalCase(type), [type]);

  const paramValue = useMemo(() => searchParams.get(type), [searchParams, type]);

  console.log('query', { param: searchParams.get(type) });

  const itemData = useMemo(() => {
    if (type === 'name_type') {
      return data.map((type) => {
        if (type !== '1') {
          return `${type} words`;
        }
        return `${type} word`;
      });
    }
    return data;
  }, [data, type]);

  const handleOnClick = (newParamValue: string) => {
    setSearchParams((currentParam) => {
      if (paramValue === newParamValue) {
        currentParam.delete(type);
      } else {
        currentParam.set(type, newParamValue);
      }

      return currentParam;
    });
  };

  return (
    <div className='space-y-4'>
      <label className='font-semibold block'>{label}</label>
      <div className='flex flex-wrap gap-2'>
        {itemData.map((item) => (
          <div
            key={item}
            className={classNames('inline-block border rounded-full px-4 py-[6px] border-200 cursor-pointer', {
              'bg-neutral-100': item !== paramValue,
              'bg-neutral-300': item === paramValue,
            })}
            onClick={() => handleOnClick(item)}
          >
            <span className='text-sm'>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(SidebarCategory);
