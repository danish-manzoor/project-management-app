import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

import TableHeading from "@/Components/TableHeading";

const Index = ({ projects, queryparams = null, success }) => {
    queryparams = queryparams || {};
    const searchChangedField = (name, value) => {
        if (value) {
            queryparams[name] = value;
        } else {
            delete queryparams[name];
        }

        router.get(route("project.index", queryparams));
    };

    const onKeyPress = (name, e) => {
        if (e.key != "Enter") return;

        searchChangedField(name, e.target.value);
    };
    const sortFields = (name) => {
        if (name === queryparams.sort_field) {
            if (queryparams.sort_direction === "asc") {
                queryparams.sort_direction = "desc";
            } else {
                queryparams.sort_direction = "asc";
            }
        } else {
            queryparams.sort_field = name;
            queryparams.sort_direction = "asc";
        }
        router.get(route("project.index", queryparams));
    };

    const deleteProject = (project) => {
        if (!confirm("Are you sure ?")) {
            return;
        }
        router.delete(route("project.destroy", project.id));
    };
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Project
                    </h2>
                    <Link
                        href={route("project.create")}
                        className="px-2 p-1 text-white rounded bg-emerald-400"
                    >
                        Add Project
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {success && (
                        <div className="bg-emerald-500 text-white py-3 px-2">
                            {success}
                        </div>
                    )}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <TableHeading
                                                name="id"
                                                sort_field={
                                                    queryparams.sort_field
                                                }
                                                sort_direction={
                                                    queryparams.sort_direction
                                                }
                                                sortFields={sortFields}
                                            >
                                                ID
                                            </TableHeading>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Image
                                            </th>
                                            <TableHeading
                                                name="name"
                                                sort_field={
                                                    queryparams.sort_field
                                                }
                                                sort_direction={
                                                    queryparams.sort_direction
                                                }
                                                sortFields={sortFields}
                                            >
                                                Name
                                            </TableHeading>
                                            <TableHeading
                                                name="status"
                                                sort_field={
                                                    queryparams.sort_field
                                                }
                                                sort_direction={
                                                    queryparams.sort_direction
                                                }
                                                sortFields={sortFields}
                                            >
                                                Status
                                            </TableHeading>
                                            <TableHeading
                                                name="created_at"
                                                sort_field={
                                                    queryparams.sort_field
                                                }
                                                sort_direction={
                                                    queryparams.sort_direction
                                                }
                                                sortFields={sortFields}
                                            >
                                                Created Date
                                            </TableHeading>
                                            <TableHeading
                                                name="due_date"
                                                sort_field={
                                                    queryparams.sort_field
                                                }
                                                sort_direction={
                                                    queryparams.sort_direction
                                                }
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
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"></th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={
                                                        queryparams.name
                                                    }
                                                    placeholder="Project Name"
                                                    onBlur={(e) =>
                                                        searchChangedField(
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress("name", e)
                                                    }
                                                />
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                <SelectInput
                                                    className="w-full"
                                                    defaultValue={
                                                        queryparams.status
                                                    }
                                                    onChange={(e) =>
                                                        searchChangedField(
                                                            "status",
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Select Status
                                                    </option>
                                                    <option value="pending">
                                                        Pending
                                                    </option>
                                                    <option value="in_progress">
                                                        In Progress
                                                    </option>
                                                    <option value="completed">
                                                        Complete
                                                    </option>
                                                </SelectInput>
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"></th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"></th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"></th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                        {projects.data.map((project) => (
                                            <tr
                                                key={project.id}
                                                className="hover:bg-gray-100 dark:hover:bg-gray-800"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    {project.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    <img
                                                        className="h-20"
                                                        src={project.image_path}
                                                        alt=""
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    <Link
                                                        className="text-white hover:underline"
                                                        href={route(
                                                            "project.show",
                                                            project.id
                                                        )}
                                                    >
                                                        {project.name}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span
                                                        className={
                                                            "px-2 py-1 rounded text-white " +
                                                            PROJECT_STATUS_CLASS_MAP[
                                                                project.status
                                                            ]
                                                        }
                                                    >
                                                        {
                                                            PROJECT_STATUS_TEXT_MAP[
                                                                project.status
                                                            ]
                                                        }
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {project.created_at}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {project.due_date}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {project.createdBy.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    <Link
                                                        href={route(
                                                            "project.edit",
                                                            project.id
                                                        )}
                                                        className="bg-blue-400 text-white px-2 py-1 rounded"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={(e) =>
                                                            deleteProject(
                                                                project
                                                            )
                                                        }
                                                        className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <Pagination links={projects.meta.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
