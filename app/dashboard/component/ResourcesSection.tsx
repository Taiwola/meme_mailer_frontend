import React from 'react';
import { useCopyToClipboard } from '@/app/hooks/useCopyToClipboard';

interface ResourcesSectionProps {
  subscribeUrl: string;
}

const ResourcesSection: React.FC<ResourcesSectionProps> = ({ subscribeUrl }) => {
  const { copied, copyToClipboard } = useCopyToClipboard();

  return (
    <div>
      <h5 className='text-xl font-medium'>Resources</h5>
      <br />
      <div>
        <h4 className='font-medium'>Home Page</h4>
        <div
          className="w-full px-2 my-1 h-[38px] bg-transparent border rounded-lg relative flex items-center cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => copyToClipboard(subscribeUrl)}
        >
          <small
            className={`text-sm overflow-hidden overflow-ellipsis whitespace-pre ${
              copied ? 'bg-blue-200' : 'bg-transparent'
            }`}
            style={{ maxWidth: '100%' }}
          >
            {subscribeUrl}
          </small>
        </div>
      </div>
    </div>
  );
};

export default ResourcesSection;
