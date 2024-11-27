'use client';
import React, { useState } from 'react'
import ApiAccess from './apiAccess';
import CustomizeProfile from './customizeProfile';


const TabComponent = ({ title, isActive, onClick }: { title: string; isActive: boolean; onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '10px 10px',
        cursor: 'pointer',
        borderBottom: isActive ? '1px solid #E5E1DA' : 'none', // Border beneath active tab
        margin: '5px 0',
        fontWeight: isActive ? 'bold' : 'normal', // Optional: Bold the active tab
        transition: 'border-bottom 0.3s ease',
      }}
    >
      {title}
    </div>
  );
};

export default function Tab() {
  const [activeItem, setActiveItem] = useState<string>('API Access'); // Set default active tab

  const handleTabClick = (tab: string) => {
    setActiveItem(tab);
  };

  return (
    <div style={{ display: 'flex',flexDirection: 'column' }}>
      {/* Vertical Tabs */}
      <div style={{ display: 'flex', width: '300px', padding: '10px' }}>
        <TabComponent
          title="API Access"
          isActive={activeItem === 'API Access'}
          onClick={() => handleTabClick('API Access')}
        />
        <TabComponent
          title="Customize Profile"
          isActive={activeItem === 'Customize Profile'}
          onClick={() => handleTabClick('Customize Profile')}
        />
      </div>

      {/* Content Area */}
      <div style={{ padding: '20px', flex: 1 ,  transition: 'opacity 0.5s ease-in-out', // Fade in/out animation for content
          opacity: activeItem ? 1 : 0,}}>
        {activeItem === 'API Access' ? (
            <div className='w-full flex items-center justify-center'>
                <ApiAccess />
            </div>
        ) : (
          <CustomizeProfile />
        )}
      </div>
    </div>
  );
}
