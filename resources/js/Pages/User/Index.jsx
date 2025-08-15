import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

import TableHeading from "@/Components/TableHeading";

const Index = ({ users, queryparams = null, success }) => {
    queryparams = queryparams || {};
    const searchChangedField = (name, value) => {
        if (value) {
            queryparams[name] = value;
        } else {
            delete queryparams[name];
        }

        router.get(route("user.index", queryparams));
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
        router.get(route("user.index", queryparams));
    };

    const deleteUser = (user) => {
        if (!confirm("Are you sure ?")) {
            return;
        }
        router.delete(route("user.destroy", user.id));
    };
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        User
                    </h2>
                    <Link
                        href={route("user.create")}
                        className="px-2 p-1 text-white rounded bg-emerald-400"
                    >
                        Add User
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
                                                name="email"
                                                sort_field={
                                                    queryparams.sort_field
                                                }
                                                sort_direction={
                                                    queryparams.sort_direction
                                                }
                                                sortFields={sortFields}
                                            >
                                                Email
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
                                                    className="w-full"
                                                    defaultValue={
                                                        queryparams.name
                                                    }
                                                    placeholder="User Name"
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
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={
                                                        queryparams.email
                                                    }
                                                    placeholder="User Email"
                                                    onBlur={(e) =>
                                                        searchChangedField(
                                                            "email",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress("email", e)
                                                    }
                                                />
                                            </th>

                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"></th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                        {users.data.map((user) => (
                                            <tr
                                                key={user.id}
                                                className="hover:bg-gray-100 dark:hover:bg-gray-800"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    {user.id}
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {user.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {user.created_at}
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    <Link
                                                        href={route(
                                                            "user.edit",
                                                            user.id
                                                        )}
                                                        className="bg-blue-400 text-white px-2 py-1 rounded"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={(e) =>
                                                            deleteUser(user)
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

                                <Pagination links={users.meta.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
