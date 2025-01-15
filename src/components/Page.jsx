import {Navigation} from './Navigation';

export const Page = ({ children }) => (
  <div className='absolute top-0 left-0 z-[100] w-screen'>
    <div className="flex flex-col min-h-screen">
      <Navigation />
      {children}
    </div>
  </div>
);
