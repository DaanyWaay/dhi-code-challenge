import classnames from "classnames";
import type { PropsWithChildren } from "react";

interface PageContentProps extends PropsWithChildren {
  className?: string;
}

export const PageContent = ({ children, className }: PageContentProps) => {
  return (
    <div
      className={classnames("tw-p-4 tw-h-[calc(100vh-48px-24px)]", className)}
    >
      {children}
    </div>
  );
};
