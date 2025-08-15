import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";

const TableHeading = ({
    name,
    sortable = true,
    sort_field = null,
    sort_direction = null,
    sortFields = () => {},
    children,
}) => {
    return (
        <th
            onClick={(e) => sortFields(name)}
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
        >
            <div className="flex items-center justify-between gap-1 cursor-pointer">
                {children}
                {sortable && (
                    <div className="">
                        <ChevronUpIcon
                            className={
                                "w-4 " +
                                (sort_field === name && sort_direction === "asc"
                                    ? "text-white size-6"
                                    : "")
                            }
                        />
                        <ChevronDownIcon
                            className={
                                "w-4 -mt-2 " +
                                (sort_field === name &&
                                sort_direction === "desc"
                                    ? "text-white size-6"
                                    : "")
                            }
                        />
                    </div>
                )}
            </div>
        </th>
    );
};

export default TableHeading;
