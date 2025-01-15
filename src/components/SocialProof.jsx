'use client'
import { Quote } from 'lucide-react';
import { useState } from 'react';

const socialProofs = [
  {
    name: `John Doe`,
    company: `Alphabet Inc.`,
    image: `/images/social-1.webp`,
    text: `Commodo Lorem consequat ea consectetur pariatur proident excepteur.
    Pariatur eiusmod minim minim ipsum tempor aute excepteur minim eu nisi laboris.
    Duis sunt labore eu eu cupidatat labore commodo id aliquip.`,
  },
  {
    name: `Jack Doe`,
    company: `Amazon.com, Inc.`,
    image: `/images/social-2.webp`,
    text: `Anim labore ut amet cupidatat pariatur pariatur labore ad est.
    Fugiat eiusmod dolore aliquip aute duis esse excepteur amet.
    Sit cupidatat ipsum culpa nisi esse ipsum culpa in consectetur.
    Enim incididunt do sunt ex do. Proident duis nulla minim sunt irure est
    magna nostrud Lorem consectetur irure.`,
  },
];

export function SocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    if (currentIndex + 1 < socialProofs.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previous = () => {
    if (currentIndex - 1 >= 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <div className="mx-auto max-w-7xl">
        <section>
          <figure>
            <div className="relative bg-white">
              <Quote className="absolute top-0 left-0 pl-4 w-16 text-gray-300 md:w-12 md:-left-2 md:pl-0" />
              <div className="px-6 pt-20 md:px-0">
                <p className="pb-6 text-base text-gray-600">{socialProofs[currentIndex].text}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center pb-12">
                    <div className="w-12 h-12">
                      <img
                        src={socialProofs[currentIndex].image}
                        alt={socialProofs[currentIndex].name}
                        className="object-cover overflow-hidden w-full h-full rounded-full"
                        height={48}
                        width={48}
                      />
                    </div>
                    <p className="ml-3 font-bold text-gray-600">
                      {socialProofs[currentIndex].name} <br />
                      <span className="text-base font-light text-gray-600">
                        {socialProofs[currentIndex].company}
                      </span>
                    </p>
                  </div>
                  <div className="flex pb-12 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={44}
                      height={44}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#CBD5E0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      onClick={previous}
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="15 6 9 12 15 18" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={44}
                      height={44}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#CBD5E0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      onClick={next}
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="9 6 15 12 9 18" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </figure>
        </section>
      </div>
    </div>
  );
};
