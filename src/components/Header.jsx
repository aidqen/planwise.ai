'use client'

import { Button } from './ui/button';
// import Netlify from '@/constants/svg/netlify.svg';
// import Nike from '@/constants/svg/nike.svg';
// import Figma from '@/constants/svg/figma.svg';
// import Aws from '@/constants/svg/aws.svg';

export const Header = () => (
  <header className="min-h-[calc(100vh-6rem)] bg-white">
    <div className="px-14 py-16 mx-auto max-w-4xl sm:px-6 lg:px-8">
      <h1 className="font-sans text-4xl font-bold leading-snug text-center text-gray-800 md:text-5xl lg:text-5xl">
        Your Best Day Starts Here <br/> Create AI-Optimized Schedule In Minutes 
      </h1>
      <div className="mx-auto max-w-xl">
        <p className="mt-10 text-xl text-center text-gray-500 lg:text-2xl">
          Make your website wonderful and build beyond your expectations.
        </p>
      </div>
      <div className="flex justify-center items-center mx-auto mt-10 w-full">
        <Button className="text-white bg-blue-500 hover:bg-blue-600">Get started</Button>
      </div>
    </div>
    {/* <div className="flex justify-center w-full">
      <div className="mt-4 w-full">
        <p className="font-mono text-sm font-medium text-center text-gray-600 uppercase">These folks get it</p>
        <div className="flex flex-wrap justify-center items-center mx-auto">
          <Aws className="m-12 mb-8" width={120} />
          <Netlify className="m-12" width={140} />
          <Nike className="m-12" width={140} />
          <Figma className="m-12" width={140} />
        </div>
      </div>
    </div> */}
  </header>
);
