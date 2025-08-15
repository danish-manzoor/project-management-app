import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

const Create = ({ users, projects }) => {
    const { data, setData, post, errors, reset } = useForm({
        image: "",
        name: "",
        description: "",
        due_date: "",
        status: "",
        priority: "",
        assigned_user_id: "",
        project_id: "",
    });
    const submitForm = (e) => {
        e.preventDefault();
        post(route("task.store"));
    };
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Create Task
                    </h2>
                </div>
            }
        >
            <Head title="Create Task" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submitForm}>
                                <div className="mt-4">
                                    <InputLabel
                                        className="mt-2"
                                        htmlFor="image"
                                        value="Task Image"
                                    />

                                    <TextInput
                                        className="mt-1 block w-full"
                                        id="image"
                                        type="file"
                                        name="image"
                                        onChange={(e) =>
                                            setData("image", e.target.files[0])
                                        }
                                    />
                                    <InputError
                                        className="mt-1"
                                        message={errors.image}
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        className="mt-2"
                                        htmlFor="name"
                                        value="Task Name"
                                    />

                                    <TextInput
                                        className="mt-2 block w-full"
                                        id="name"
                                        name="name"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        className="mt-2"
                                        htmlFor="description"
                                        value="Task Description"
                                    />

                                    <TextareaInput
                                        className="mt-2 block w-full"
                                        id="description"
                                        name="description"
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.description}
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        className="mt-2"
                                        htmlFor="due_date"
                                        value="Due Date"
                                    />

                                    <TextInput
                                        className="mt-2 block w-full"
                                        id="due_date"
                                        type="date"
                                        name="due_date"
                                        onChange={(e) =>
                                            setData("due_date", e.target.value)
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.due_date}
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        className="mt-2"
                                        htmlFor="status"
                                        value="Task Status"
                                    />

                                    <SelectInput
                                        className="mt-2 block w-full"
                                        id="status"
                                        name="status"
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                    >
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">
                                            In Progress
                                        </option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                    </SelectInput>
                                    <InputError
                                        className="mt-2"
                                        message={errors.status}
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        className="mt-2"
                                        htmlFor="status"
                                        value="Task Priority"
                                    />

                                    <SelectInput
                                        className="mt-2 block w-full"
                                        id="priority"
                                        name="priority"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("priority", e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Select Priority
                                        </option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </SelectInput>
                                    <InputError
                                        className="mt-2"
                                        message={errors.priority}
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        className="mt-2"
                                        htmlFor="status"
                                        value="Task Project"
                                    />

                                    <SelectInput
                                        className="mt-2 block w-full"
                                        id="project_id"
                                        name="project_id"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData(
                                                "project_id",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">Select Project</option>
                                        {Object.entries(projects).map(
                                            ([id, name]) => (
                                                <option key={id} value={id}>
                                                    {name}
                                                </option>
                                            )
                                        )}
                                    </SelectInput>
                                    <InputError
                                        className="mt-2"
                                        message={errors.project_id}
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        className="mt-2"
                                        htmlFor="assigned_user"
                                        value="Assign User"
                                    />

                                    <SelectInput
                                        className="mt-2 block w-full"
                                        id="assigned_user_id"
                                        name="assigned_user_id"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData(
                                                "assigned_user_id",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">Select user</option>

                                        {Object.entries(users).map(
                                            ([id, name]) => (
                                                <option key={id} value={id}>
                                                    {name}
                                                </option>
                                            )
                                        )}
                                    </SelectInput>
                                    <InputError
                                        className="mt-2"
                                        message={errors.assigned_user_id}
                                    />
                                </div>

                                <div className="text-right mt-4">
                                    <Link
                                        className="bg-gray-100 text-gray-800 py-1 px-3 mr-2 rounded shadow transition-all"
                                        href={route("task.index")}
                                    >
                                        Back
                                    </Link>
                                    <button className="bg-emerald-500 py-1 px-3 rounded">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
