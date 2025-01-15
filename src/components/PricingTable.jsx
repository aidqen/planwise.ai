import { Check } from 'lucide-react';
import { Button } from './ui/button';

const features = [
  `Laboris nulla`,
  `Lorem pariatur nisi`,
  `Id aute amet pariatur`,
  `Do duis sint aliquip`,
  `Nostrud duis tempor`,
  `Consequat eiusmod`,
  `Reprehenderit`,
  `Adipisicing reprehenderit`,
];

export const PricingTable = () => (
  <section className="pt-12 bg-gradient-to-b from-gray-100 to-white shadow-inner">
    <div className="relative mx-auto mb-24 max-w-7xl">
      <div className="overflow-hidden lg:max-w-none lg:flex">
        <div className="px-6 py-8 md:px-0 lg:flex-shrink-1">
          <h2 className="mb-12 text-4xl font-bold text-gray-800 lg:text-7xl">Are you ready?</h2>
          <p className="mt-6 text-base leading-6 text-gray-500">
            Lorem id ullamco pariatur eiusmod labore qui deserunt incididunt deserunt nostrud. Tempor duis in
            adipisicing exercitation ipsum nostrud esse. Reprehenderit cupidatat sint est deserunt id eiusmod amet
            aliqua officia.
          </p>
          <div className="mt-8">
            <div className="flex items-center">
              <h3 className="flex-shrink-0 pr-4 text-sm font-semibold tracking-wider leading-5 text-indigo-600 uppercase">
                What is included
              </h3>
              <div className="flex-1 border-t-2 border-gray-200" />
            </div>
            <ul className="mt-8 lg:grid lg:grid-cols-2">
              {features.map((feature) => (
                <li className="flex items-center lg:col-span-1" key={feature}>
                  <div className="flex-shrink-0">
                    <Check className="mr-3 mb-1 w-8 h-8" />
                  </div>
                  <p className="text-gray-600">{feature}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="px-6 py-8 text-center lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
          <p className="text-lg font-medium text-gray-800">If you order now...</p>
          <div className="flex justify-center items-center my-4 text-6xl font-bold leading-none text-gray-800">
            $99/mo
          </div>
          <Button className="mt-6">Contact sales</Button>
        </div>
      </div>
    </div>
  </section>
);
