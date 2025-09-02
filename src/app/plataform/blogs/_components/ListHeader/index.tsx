"use client";

// Components
import Button from "@/components/Form/Button";

// Types
import type { ListHeaderProps } from "./list-header.props";

const ListHeader = ({
  title,
  subtitle,
  buttonLabel,
  buttonHref,
  buttonOnClick,
  buttonIcon,
}: ListHeaderProps) => {
  return (
    <div className="grid grid-cols-[1fr_auto] justify-between items-center mb-6 border-b border-gray-100 pb-4">
      <div>
        <h1 className="text-2xl font-semibold text-[#18292c]">{title}</h1>
        {subtitle && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 -mt-1">
            {subtitle}
          </p>
        )}
      </div>
      {buttonOnClick ? (
        <Button
          label={buttonLabel}
          variant="primary"
          size="medium"
          onClick={buttonOnClick}
          icon={buttonIcon}
        />
      ) : (
        <Button
          label={buttonLabel}
          variant="primary"
          size="medium"
          to={buttonHref || "#"}
          icon={buttonIcon}
        />
      )}
    </div>
  );
};

export default ListHeader;
