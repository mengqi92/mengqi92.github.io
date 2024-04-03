'use client';

import clsx from "clsx";
import ClipboardCopy from "./clipboard-copy";
// import './clipboard-copy.css'

const CodeBlock = ({ className, children, raw, ...props }) => {
    console.log('raw: ', raw);
    return (
        <>
            <div className="copyCode">
                <pre className={clsx("p-0 my-4 px-4 py-4 bg-transparent rounded overflow-x-auto relative", className)} {...props}>
                    {children}
                    <ClipboardCopy copyText={raw}/>
                </pre>
            </div>
        </>
    )
}

export default CodeBlock;