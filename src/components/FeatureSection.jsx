import { CheckCircle } from 'lucide-react';

export const FeatureSection = () => (
  <section className="pb-6 bg-white">
    <div className="p-4 mx-auto max-w-7xl sm:p-6 lg:p-8">
      <div className="container p-6 px-6 mx-auto bg-white">
        <div className="mb-16 text-center">
          <h4 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">Features</h4>
          <p className="mt-2 text-5xl font-bold tracking-tight text-gray-900 lg:text-7xl">
            How we change the game
          </p>
        </div>
        <div className="flex flex-wrap my-12">
          <div className="p-8 w-full border-b md:w-1/2 md:border-r lg:w-1/3">
            <div className="flex items-center mb-6">
              <CheckCircle width={20} height={20} fill="currentColor" className="w-6 h-6 text-indigo-500" />
              <div className="ml-4 text-xl">Increase sales</div>
            </div>
            <p className="leading-loose text-gray-500">
              Consectetur pariatur irure exercitation sit amet id consectetur consecteturmagna et Lorem labore qui
              velit.
            </p>
          </div>
          <div className="p-8 w-full border-b md:w-1/2 lg:w-1/3 lg:border-r">
            <div className="flex items-center mb-6">
              <CheckCircle width={20} height={20} fill="currentColor" className="w-6 h-6 text-indigo-500" />
              <div className="ml-4 text-xl">Enterprise-ready</div>
            </div>
            <p className="leading-loose text-gray-500">
              Labore duis pariatur est exercitation laboris cupidatat amet cillum. Amet nisi ullamco.
            </p>
          </div>
          <div className="p-8 w-full border-b md:w-1/2 md:border-r lg:w-1/3 lg:border-r-0">
            <div className="flex items-center mb-6">
              <CheckCircle width={20} height={20} fill="currentColor" className="w-6 h-6 text-indigo-500" />
              <div className="ml-4 text-xl">Unlimited growth</div>
            </div>
            <p className="leading-loose text-gray-500">
              Elit deserunt nisi esse duis cupidatat proident sit minim mollit officia pariatur incididunt in tempor.
            </p>
          </div>
          <div className="p-8 w-full border-b md:w-1/2 lg:w-1/3 lg:border-r lg:border-b-0">
            <div className="flex items-center mb-6">
              <CheckCircle width={20} height={20} fill="currentColor" className="w-6 h-6 text-indigo-500" />
              <div className="ml-4 text-xl">Recommended by experts</div>
            </div>
            <p className="leading-loose text-gray-500">
              Velit sit tempor pariatur quis pariatur incididunt culpa dolor voluptate officia incididunt velit dolore.
            </p>
          </div>
          <div className="p-8 w-full border-b md:w-1/2 md:border-r md:border-b-0 lg:w-1/3 lg:border-b-0">
            <div className="flex items-center mb-6">
              <CheckCircle width={20} height={20} fill="currentColor" className="w-6 h-6 text-indigo-500" />
              <div className="ml-4 text-xl">Modern platform</div>
            </div>
            <p className="leading-loose text-gray-500">
              Laboris elit consectetur sint nisi eu mollit proident sit magna velit adipisicing consequat amet
              reprehenderit.
            </p>
          </div>
          <div className="p-8 w-full md:w-1/2 lg:w-1/3">
            <div className="flex items-center mb-6">
              <CheckCircle width={20} height={20} fill="currentColor" className="w-6 h-6 text-indigo-500" />
              <div className="ml-4 text-xl">Integrations</div>
            </div>
            <p className="leading-loose text-gray-500">
              Nostrud excepteur incididunt proident sit nulla ipsum sunt nostrud est esse adipisicing irure officia
              consectetur.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
