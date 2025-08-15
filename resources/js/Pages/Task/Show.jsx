import TaskTable from "@/Components/TaskTable";
import {
    PROJECT_STATUS_CLASS_MAP,
    PROJECT_STATUS_TEXT_MAP,
    TASK_PRIORITY_CLASS_MAP,
    TASK_PRIORITY_TEXT_MAP,
} from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";

const Show = ({ task }) => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Task: {task.name}
                </h2>
            }
        >
            <Head title={task.name} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="">
                            <img
                                src={task.image_path}
                                className="h-96 w-full"
                                alt=""
                            />
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid grid-cols-2 gap-1">
                                <div className="">
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Task Name
                                        </label>
                                        <p className="mt-1">{task.name}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Task Status
                                        </label>
                                        <p className="mt-1">
                                            <span
                                                className={
                                                    "px-2 py-1 rounded text-white " +
                                                    PROJECT_STATUS_CLASS_MAP[
                                                        task.status
                                                    ]
                                                }
                                            >
                                                {
                                                    PROJECT_STATUS_TEXT_MAP[
                                                        task.status
                                                    ]
                                                }
                                            </span>
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Task Priority
                                        </label>
                                        <p className="mt-1">
                                            <span
                                                className={
                                                    "px-2 py-1 rounded text-white " +
                                                    TASK_PRIORITY_CLASS_MAP[
                                                        task.priority
                                                    ]
                                                }
                                            >
                                                {
                                                    TASK_PRIORITY_TEXT_MAP[
                                                        task.priority
                                                    ]
                                                }
                                            </span>
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Task Created by
                                        </label>
                                        <p className="mt-1">
                                            {task.createdBy.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Project Name
                                        </label>
                                        <p className="mt-1">
                                            <Link
                                                href={route(
                                                    "project.show",
                                                    task.project.id
                                                )}
                                                className="text-white hover:underline"
                                            >
                                                {task.project.name}
                                            </Link>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Due Date
                                        </label>
                                        <p className="mt-1">{task.due_date}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Created Date
                                        </label>
                                        <p className="mt-1">
                                            {task.created_at}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Assigned User
                                        </label>
                                        <p className="mt-1">
                                            {task.assignedUser.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <label className="font-bold text-lg">
                                    Description
                                </label>
                                <p className="mt-1">{task.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
