'use client';
import { useCallback } from 'react';
import { ArrowRight } from 'lucide-react';

const articles = [
  {
    title: `Velit reprehenderit culpa Lorem reprehenderit excepteur ipsum esse.`,
    image: `/images/case-1.webp`,
    alt: `Proident pariatur est.`,
  },
  {
    title: `Velit reprehenderit culpa Lorem reprehenderit ipsum esse.`,
    image: `/images/case-2.webp`,
    alt: `Proident pariatur est.`,
  },
  {
    title: `Velit reprehenderit culpa Lorem reprehenderit excepteur esse.`,
    image: `/images/case-3.webp`,
    alt: `Proident pariatur est.`,
  },
];

export const CasesSection = () => (
  <section>
    <div className="relative w-full min-h-screen bg-gray-900">
      <div className="pt-20 mx-4 max-w-7xl lg:mx-auto lg:pt-40">
        <h1 className="text-4xl font-bold text-center text-white lg:text-7xl">What will you build?</h1>
        <p className="mt-12 text-xl text-center text-white text-gray-400">
          Don’t just take our word for it — see what leaders in digital are saying
        </p>
        <div className="pt-24 mx-auto">
          <div className="flex flex-wrap justify-around w-full">
            {articles.map((article) => (
              <div
                key={article.title}
                className="relative mx-auto mb-32 w-11/12 cursor-pointer xl:w-1/3 sm:w-5/12 sm:max-w-xs lg:mb-20 xl:max-w-sm lg:w-1/2 sm:mx-0 hover:scale-105"
              >
                <div className="z-20 h-64">
                  {/* <img
                    src={article.image}
                    alt={article.alt}
                    className="object-cover overflow-hidden w-full h-full rounded"
                    width={400}
                    height={300}
                  /> */}
                </div>
                <div className="relative z-30 p-4 mx-auto -mt-8 w-full bg-white rounded-b shadow-lg">
                  <p className="pb-1 text-sm text-center text-gray-700 uppercase">Case study</p>
                  <p className="pb-1 text-sm text-center text-gray-500">{article.title}</p>
                </div>
              </div>
            ))}
            <span
              className="flex z-30 items-center pb-12 -mt-8 text-xl text-indigo-400 cursor-pointer lg:mt-4 hover:text-indigo-600"
            >
              See all case studies
              <ArrowRight className="ml-2 w-6 h-6 fill-current" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);
