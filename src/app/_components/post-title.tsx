import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export function PostTitle({ children }: Props) {
  return (
    <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold tracking-tighter leading-tight md:leading-none text-center md:text-left font-serif mb-2">
      {children}
    </h2>
  );
}
