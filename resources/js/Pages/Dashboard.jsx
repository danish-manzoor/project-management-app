import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({
    totalPendingTask,
    myPendingTask,
    totalInProgressTask,
    myInProgressTask,
    totalCompletedTask,
    myCompletedTask,
    activeTask,
}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="font-xl text-amber-700 font-bold text-2xl">
                                Pending Task
                            </h3>
                            <span className="mr-2">{myPendingTask}</span>/
                            <span className="mr-2 ml-2">
                                {totalPendingTask}
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="font-xl text-blue-700 font-bold text-2xl">
                                Pending Task
                            </h3>
                            <span className="mr-2">{myInProgressTask}</span>/
                            <span className="mr-2 ml-2">
                                {totalInProgressTask}
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="font-xl text-green-500 font-bold text-2xl">
                                Pending Task
                            </h3>
                            <span className="mr-2">{myCompletedTask}</span>/
                            <span className="mr-2 ml-2">
                                {totalCompletedTask}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-4">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="font-xl text-gray-400 font-bold text-2xl">
                                My Active Task
                            </h3>
                            <div class="overflow-x-auto">
                                <table class="min-w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm">
                                    <thead>
                                        <tr class="bg-gray-700 text-gray-300 text-left text-sm uppercase tracking-wider">
                                            <th class="px-4 py-3 border-b border-gray-600">
                                                ID
                                            </th>
                                            <th class="px-4 py-3 border-b border-gray-600">
                                                Project Name
                                            </th>
                                            <th class="px-4 py-3 border-b border-gray-600">
                                                Task Name
                                            </th>

                                            <th class="px-4 py-3 border-b border-gray-600">
                                                Due Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="text-gray-200 text-sm">
                                        {activeTask.data.map((task) => (
                                            <tr
                                                class="hover:bg-gray-700"
                                                key={task.id}
                                            >
                                                <td class="px-4 py-2 border-b border-gray-700">
                                                    {task.id}
                                                </td>
                                                <td class="px-4 py-2 border-b border-gray-700">
                                                    <Link
                                                        className="text-white hover:underline"
                                                        href={route(
                                                            "project.show",
                                                            task.project.id
                                                        )}
                                                    >
                                                        {task.project.name}
                                                    </Link>
                                                </td>
                                                <td class="px-4 py-2 border-b border-gray-700">
                                                    <Link
                                                        className="text-white hover:underline"
                                                        href={route(
                                                            "task.show",
                                                            task.id
                                                        )}
                                                    >
                                                        {task.name}
                                                    </Link>
                                                </td>

                                                <td class="px-4 py-2 border-b border-gray-700">
                                                    {task.due_date}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
