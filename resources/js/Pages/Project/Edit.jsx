import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

const Edit = ({ project }) => {
    const { data, setData, post, errors, reset } = useForm({
        name: project.data.name || "",
        description: project.data.description || "",
        status: project.data.status || "",
        due_date: project.data.due_date || "",
        _method: "PUT",
    });

    const submitForm = (ev) => {
        ev.preventDefault();
        post(route("project.update", project.data.id));
    };
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Edit Project "{project.data.name}"
                    </h2>
                </div>
            }
        >
            <Head title={"Edit Project | " + project.data.name} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submitForm}>
                                <div className="">
                                    {project.data.image_path && (
                                        <img
                                            className="h-20 w-30"
                                            src={project.data.image_path}
                                            alt=""
                                        />
                                    )}
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        className="mt-2"
                                        htmlFor="image"
                                        value="Project Image"
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
                                        value="Project Name"
                                    />

                                    <TextInput
                                        className="mt-2 block w-full"
                                        id="name"
                                        name="name"
                                        value={data.name}
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
                                        value="Project Description"
                                    />

                                    <TextareaInput
                                        className="mt-2 block w-full"
                                        id="description"
                                        name="description"
                                        value={data.description}
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
                                        value={data.due_date}
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
                                        value="Project Status"
                                    />

                                    <SelectInput
                                        className="mt-2 block w-full"
                                        id="status"
                                        name="status"
                                        value={data.status}
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

                                <div className="text-right mt-4">
                                    <Link
                                        className="bg-gray-100 text-gray-800 py-1 px-3 mr-2 rounded shadow transition-all"
                                        href={route("project.index")}
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

export default Edit;
