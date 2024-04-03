'use client';

import clsx from "clsx";
import ClipboardCopy from "./clipboard-copy";
import { ReactElement } from "react";

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement>{
    raw?: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ className, children, raw, ...props }: CodeBlockProps) => {
    children = children as ReactElement;
    if (!children || children.type !== 'code') return null;

    children.props.className = children.props.className.replace(/ bg-\w+/, '');
    return (
        <>
            <ClipboardCopy copyText={raw}/>
            <pre className={clsx("relative my-2 max-h-[650px] pl-4 overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900", className)} {...props}>
                {children}
            </pre>
        </>
    )
}

export default CodeBlock;