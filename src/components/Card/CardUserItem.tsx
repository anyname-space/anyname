import React from 'react';
import { IconUser } from '@tabler/icons-react';
import { capitalCase } from 'change-case';

type CardUserItemProps = {
  name: string;
  gender: Gender;
};

const CardUserItem: React.FC<CardUserItemProps> = ({ gender, name }) => {
  return (
    <>
      <div className='inline-block border transition duration-150 hover:shadow-md cursor-pointer rounded-lg p-3'>
        <div className='inline-flex items-center gap-2'>
          <div className='w-10 h-10 border rounded-full bg-neutral-200 flex'>
            <IconUser size={20} className='m-auto' />
          </div>
          <div className='flex flex-col'>
            <span className='text-xl font-bold text-neutral-700'>{name}</span>
            <span className='text-xs text-neutral-500'>{capitalCase(gender)}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardUserItem;
