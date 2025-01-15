
const listItems = [
  {
    title: `Designers`,
    description: `Officia et fugiat mollit qui. Dolor elit aliqua voluptate ipsum
    excepteur cillum consequat consectetur duis magna qui eu consequat occaecat.
    Deserunt nisi sit.`,
  },
  {
    title: `Developers`,
    description: `Pariatur consectetur laboris exercitation duis laboris.
    Commodo duis fugiat magna fugiat et ut anim elit. Tempor aute ex qui
    tempor tempor.`,
  },
  {
    title: `Product owners`,
    description: `Ullamco consectetur ipsum eiusmod nisi adipisicing sint anim
    dolore aute excepteur. Voluptate ea ullamco sunt eu elit qui aliquip.
    Adipisicing.`,
  },
];

export const ListSection = () => (
  <section className="overflow-hidden pt-28 lg:py-28">
    <div className="p-4 mx-auto max-w-7xl bg-white sm:p-6 lg:p-8">
      <div className="mb-16 text-center">
        <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">Grow your revenue</h2>
        <p className="pb-4 mt-2 text-5xl font-bold tracking-tight text-gray-900 lg:text-7xl">
          Transform your business
        </p>
      </div>
      <div className="flex flex-wrap items-center -mx-8">
        <div className="px-8 w-full lg:w-1/2">
          <ul className="space-y-12">
            {listItems.map((item, index) => (
              <li className="flex -mx-4" key={item.title}>
                <div className="px-4">
                  <span className="flex justify-center items-center mx-auto w-16 h-16 text-2xl font-bold text-blue-500 bg-blue-50 rounded-full">
                    {index + 1}
                  </span>
                </div>
                <div className="px-4">
                  <h3 className="my-4 text-xl font-semibold">{item.title}</h3>
                  <p className="leading-loose text-gray-500">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);
