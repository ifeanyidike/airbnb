import React, { useRef, useEffect, ReactNode, RefObject } from "react";

type OutsideAlerterProps = {
  className?: string;
  handleClick: () => void;
  children: ReactNode;
};

function useOutsideAlerter(
  ref: RefObject<HTMLDivElement>,
  handleClick: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default function OutsideAlerter(props: OutsideAlerterProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(wrapperRef, props.handleClick);

  return (
    <div className={props.className} ref={wrapperRef}>
      {props.children}
    </div>
  );
}
