import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import {
    TASK_PRIORITY_CLASS_MAP,
    TASK_PRIORITY_TEXT_MAP,
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP,
} from "@/constant";
import { Link, router } from "@inertiajs/react";
const TaskTable = ({
    tasks,
    queryParams,
    hideColumn = false,
    appendProjectId = false,
    projectID = null,
}) => {
    queryParams = queryParams || {};

    const searchChangedField = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        appendProjectId
            ? router.get(
                  route("project.show", { project: projectID, ...queryParams }),
                  {},
                  { preserveScroll: true }
              )
            : router.get(
                  route("task.index", queryParams),
                  {},
                  { preserveScroll: true }
              );
    };

    const sortFields = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        appendProjectId
            ? router.get(
                  route("project.show", { project: projectID, ...queryParams }),
                  {},
                  { preserveScroll: true }
              )
            : router.get(
                  route("task.index", queryParams),
                  {},
                  { preserveScroll: true }
              );
    };
    const onKeyPress = (name, e) => {
        if (e.key != "Enter") return;

        searchChangedField(name, e.target.value);
    };

    const deleteTask = (task) => {
        if (!confirm("Are you sure ?")) {
            return;
        }
        router.delete(route("task.destroy", task.id));
    };
    return (
        <>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <TableHeading
                            name="id"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortFields={sortFields}
                        >
                            ID
                        </TableHeading>
                        <TableHeading
                            name="name"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortFields={sortFields}
                        >
                            Name
                        </TableHeading>
                        {!hideColumn && (
                            <TableHeading
                                name="project"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortFields={sortFields}
                            >
                                Project
                            </TableHeading>
                        )}

                        <TableHeading
                            name="status"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortFields={sortFields}
                        >
                            Status
                        </TableHeading>
                        <TableHeading
                            name="priority"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortFields={sortFields}
                        >
                            Priority
                        </TableHeading>
                        <TableHeading
                            name="created_at"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortFields={sortFields}
                        >
                            Created Date
                        </TableHeading>
                        <TableHeading
                            name="due_date"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortFields={sortFields}
                        >
                            Due Date
                        </TableHeading>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Created By
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"></th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            <TextInput
                                defaultValue={queryParams.name}
                                placeholder="Enter Name"
                                onBlur={(e) =>
                                    searchChangedField("name", e.target.value)
                                }
                                onKeyPress={(e) => onKeyPress("name", e)}
                            />
                        </th>
                        {!hideColumn && (
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                <TextInput
                                    defaultValue={queryParams.project}
                                    placeholder="Enter Project"
                                    onBlur={(e) =>
                                        searchChangedField(
                                            "project_filter",
                                            e.target.value
                                        )
                                    }
                                    onKeyPress={(e) =>
                                        onKeyPress("project_filter", e)
                                    }
                                />
                            </th>
                        )}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            <SelectInput
                                defaultValue={queryParams.status}
                                onChange={(e) =>
                                    searchChangedField("status", e.target.value)
                                }
                            >
                                <option value="">Select Status</option>
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Complete</option>
                            </SelectInput>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            <SelectInput
                                defaultValue={queryParams.priority}
                                onChange={(e) =>
                                    searchChangedField(
                                        "priority",
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">Select Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </SelectInput>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"></th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"></th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"></th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"></th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {tasks.data.map((task) => (
                        <tr
                            className="hover:bg-gray-100 dark:hover:bg-gray-800"
                            key={task.id}
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                {task.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                <Link
                                    href={route("task.show", task.id)}
                                    className="text-white hover:underline"
                                >
                                    {task.name}
                                </Link>
                            </td>
                            {!hideColumn && (
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    {task.project.name}
                                </td>
                            )}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                <span
                                    className={
                                        "px-2 py-1 rounded text-white " +
                                        TASK_STATUS_CLASS_MAP[task.status]
                                    }
                                >
                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                </span>
                            </td>
                            <td
                                className={
                                    "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                                }
                            >
                                <span
                                    className={
                                        "px-2 py-1 rounded text-white " +
                                        TASK_PRIORITY_CLASS_MAP[task.priority]
                                    }
                                >
                                    {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {task.created_at}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {task.due_date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {task.createdBy.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                <Link
                                    href={route("task.edit", task.id)}
                                    className="bg-blue-400 text-white px-2 py-1 rounded"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={(e) => deleteTask(task)}
                                    className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination links={tasks.meta.links} />
        </>
    );
};

export default TaskTable;
