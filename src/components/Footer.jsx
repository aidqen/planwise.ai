import { Button } from './ui/button';

const productLinks = [`Features`, `Customers`, `Platform`, `Pricing`, `Enterprise`, `What's new?`];
const aboutLinks = [`About Us`, `Careers`, `Leadership`, `Blog`, `Events`, `Press`];
const resourceLinks = [
  `Get started`,
  `Guides`,
  `Tools`,
  `Case studies`,
  `Solutions`,
  `FAQs`,
  `Help Center`,
  `Training`,
  `Other resources`,
];

export const Footer = () => (
  <footer className="pt-14 pb-16 bg-white border-t border-gray-400">
    <div className="flex flex-wrap px-8 mx-auto max-w-7xl text-gray-400 lg:px-0">
      <div className="flex items-center mb-14 w-full">
        <img className="mr-4 w-12 h-12" src="logo.svg" alt="logo" width={48} height={48} />
        <p className="text-4xl font-bold text-indigo-500">STARTD</p>
      </div>
      <div className="w-full lg:w-1/2">
        <ul className="flex flex-wrap w-full text-lg font-light">
          <li className="w-1/2 md:w-1/3 lg:w-1/3">
            <div>
              <h4 className="mb-1 text-base font-bold text-gray-900">Product</h4>
              <ul>
                {productLinks.map((link) => (
                  <li className="text-sm font-medium leading-6 text-gray-800" key={link}>
                    <a href="/">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li className="w-1/2 md:w-1/3 lg:w-1/3">
            <div>
              <h4 className="mb-1 text-base font-bold text-gray-900">Resources</h4>
              <ul>
                {resourceLinks.map((link) => (
                  <li className="text-sm font-medium leading-6 text-gray-800" key={link}>
                    <a href="/">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li className="w-1/2 md:w-1/3 lg:w-1/3">
            <div>
              <h4 className="mb-1 text-base font-bold text-gray-900">About Us</h4>
              <ul>
                {aboutLinks.map((link) => (
                  <li className="text-sm font-medium leading-6 text-gray-800" key={link}>
                    <a href="/">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div className="mt-12 w-full lg:w-1/2 lg:mt-0">
        <div className="px-4 py-5 rounded border border-gray-400">
          <h4 className="mb-3 font-mono text-sm text-gray-500 uppercase">Subscribe our newsletter</h4>
          <div className="flex w-full">
            <input
              aria-label="email address"
              type="text"
              className="px-3 py-2 mr-2 w-full min-w-0 text-gray-800 bg-gray-100 rounded border border-gray-300"
              placeholder="Enter your email"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
