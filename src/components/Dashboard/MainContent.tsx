import React from 'react';

type MainContentProps = {
    children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <div className='flex-1 p-6 bg-gray-100'>
      {children}
    </div>
  )
}

export default MainContent
