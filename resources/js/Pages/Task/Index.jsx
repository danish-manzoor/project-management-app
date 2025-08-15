import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

import TableHeading from "@/Components/TableHeading";
import TaskTable from "@/Components/TaskTable";

const Index = ({ tasks, queryParams = null, success }) => {
    queryParams = queryParams || {};
    const searchChangedField = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("task.index", queryParams));
    };

    const onKeyPress = (name, e) => {
        if (e.key != "Enter") return;

        searchChangedField(name, e.target.value);
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
        router.get(route("task.index", queryParams));
    };

    const deleteTask = (task) => {
        if (!confirm("Are you sure ?")) {
            return;
        }
        router.delete(route("task.destroy", task.id));
    };
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Task
                    </h2>
                    <Link
                        href={route("task.create")}
                        className="px-2 p-1 text-white rounded bg-emerald-400"
                    >
                        Add Task
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
                                <TaskTable
                                    tasks={tasks}
                                    queryParams={queryParams}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
