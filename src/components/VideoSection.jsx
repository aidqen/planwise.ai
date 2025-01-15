import Image from 'next/image';
import preferences from '/public/preferences.svg';
import play from '/public/play.svg';

const PlayButton = () => (
  <button
    type="button"
    className="flex absolute top-full left-1/2 items-center p-4 w-64 font-medium bg-white rounded-full shadow-xl transform -translate-x-1/2 -translate-y-1/2 lg:w-auto group"
    aria-label="play video"
  >
    <Image src={play} className="flex-shrink-0 w-6 h-6 text-gray-400 fill-current group-hover:text-blue-600" />
    <span className="ml-3">Watch the video (5 min)</span>
  </button>
);

export const VideoSection = () => (
  <section className="bg-gradient-to-b from-gray-50 to-white shadow-inner">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col pt-28 mx-auto max-w-4xl">
        <div className="w-full">
          <div className="relative mx-6 shadow-2xl lg:mx-0">
            <Image src={preferences} width="100%" height="100%" />
            <PlayButton />
          </div>
        </div>
      </div>
    </div>
  </section>
);
