'use client'

import Link from "next/link";
import Obfuscate from 'react-obfuscate';

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <>
      <div className="flex justify-between items-center mb-20 mt-8 mx-auto max-w-3xl">
        <div className="flex-grow text-center">
          <h2 className="text-5xl md:text-5xl font-extrabold tracking-tight md:tracking-tighter leading-tight">
            <Link href="/" className="hover:text-red-600 transition-colors duration-300 bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500">
              {title}
            </Link>
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Obfuscate email={'iepiqgnem'.split('').reverse().join('') + '@' + 'moc.liamg'.split('').reverse().join('')}>
            <span className="icon icon-tabler icon-tabler-mail transition-colors group group-hover:text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail hover:stroke-red-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                <path d="M3 7l9 6l9 -6" />
              </svg>
            </span>
          </Obfuscate>
          <a href="https://github.com/mengqi92/mengqi92.github.io" className="group group-hover:text-red-600 transition-colors">
            <span className="icon icon-tabler icon-tabler-brand-github-filled">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-github hover:stroke-red-600 hover:stroke-red-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
              </svg>
            </span>
          </a>
          <Obfuscate element='a' style={{ display: 'inline-block' }} href="https://twitter.com/mengqipei">
            <span className="icon icon-tabler icon-tabler-brand-twitter-filled transition-colors group group-hover:text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-twitter hover:stroke-red-600 hover:stroke-red-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" />
              </svg>
            </span>
          </Obfuscate>
          <a href="/api/atom.xml">
            <span className="icon icon-tabler icon-tabler-rss transition-colors group group-hover:text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-rss hover:stroke-red-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                <path d="M4 4a16 16 0 0 1 16 16" />
                <path d="M4 11a9 9 0 0 1 9 9" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
