'use client';

import clsx from "clsx";
import ClipboardCopy from "./clipboard-copy";

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement>{
    raw?: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ className, children, raw, ...props }: CodeBlockProps) => {
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