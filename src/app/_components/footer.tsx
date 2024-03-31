export function Footer() {
  return (
    <footer className="flex items-center justify-center gap-8 p-4 text-sm bg-slate-50 border-t border-gray-200 text-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
      <p>
        © 2015 - {new Date().getFullYear()} Mengqi | All rights reserved.
      </p>
      <div className="flex flex-col gap-2 md:flex-row md:gap-4">
        <span id="busuanzi_container_site_pv" className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          访问 <span id="busuanzi_value_site_pv"></span> 次
        </span>
        <span id="busuanzi_container_site_uv" className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          访客 <span id="busuanzi_value_site_uv"></span> 人次
        </span>
      </div>
    </footer>
  );
}

export default Footer;
