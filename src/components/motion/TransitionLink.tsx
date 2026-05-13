"use client";

import Link from "next/link";
import { useTransition } from "./TransitionContext";
import { ReactNode } from "react";

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  [key: string]: any;
}

export default function TransitionLink({
  href,
  children,
  className,
  style,
  onClick,
  ...props
}: TransitionLinkProps) {
  const { animateOut } = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) onClick();
    animateOut(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </a>
  );
}
