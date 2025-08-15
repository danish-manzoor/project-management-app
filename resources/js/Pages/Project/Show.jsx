import TaskTable from "@/Components/TaskTable";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

const Show = ({ project, tasks, queryParams = null }) => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Project: {project.data.name}
                </h2>
            }
        >
            <Head title={project.data.name} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="">
                            <img
                                src={project.data.image_path}
                                className="h-96 w-full"
                                alt=""
                            />
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid grid-cols-2 gap-1">
                                <div className="">
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Project Name
                                        </label>
                                        <p className="mt-1">
                                            {project.data.name}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Project Status
                                        </label>
                                        <p className="mt-1">
                                            <span
                                                className={
                                                    "px-2 py-1 rounded text-white " +
                                                    PROJECT_STATUS_CLASS_MAP[
                                                        project.data.status
                                                    ]
                                                }
                                            >
                                                {
                                                    PROJECT_STATUS_TEXT_MAP[
                                                        project.data.status
                                                    ]
                                                }
                                            </span>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Project Created by
                                        </label>
                                        <p className="mt-1">
                                            {project.data.createdBy.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Due Date
                                        </label>
                                        <p className="mt-1">
                                            {project.data.due_date}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Created Date
                                        </label>
                                        <p className="mt-1">
                                            {project.data.created_at}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Updated By
                                        </label>
                                        <p className="mt-1">
                                            {project.data.updated_by.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <label className="font-bold text-lg">
                                    Description
                                </label>
                                <p className="mt-1">
                                    {project.data.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <TaskTable
                                tasks={tasks}
                                queryParams={queryParams}
                                hideColumn={true}
                                appendProjectId={true}
                                projectID={project.data.id}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
