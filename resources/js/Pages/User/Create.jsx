import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";

import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

const Create = () => {
    const { data, setData, post, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
    });
    const submitForm = (e) => {
        e.preventDefault();
        post(route("user.store"));
    };
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Create User
                    </h2>
                </div>
            }
        >
            <Head title="Create User" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submitForm}>
                                <div className="mt-4">
                                    <InputLabel
                                        className="mt-2"
                                        htmlFor="name"
                                        value="User Name"
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
                                        htmlFor="email"
                                        value="User Email"
                                    />

                                    <TextInput
                                        className="mt-2 block w-full"
                                        id="email"
                                        name="email"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.email}
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        className="mt-2"
                                        htmlFor="password"
                                        value="User Password"
                                    />

                                    <TextInput
                                        className="mt-2 block w-full"
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.password}
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        className="mt-2"
                                        htmlFor="password_confirmation"
                                        value="Confirm Password"
                                    />

                                    <TextInput
                                        className="mt-2 block w-full"
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.password_confirmation}
                                    />
                                </div>

                                <div className="text-right mt-4">
                                    <Link
                                        className="bg-gray-100 text-gray-800 py-1 px-3 mr-2 rounded shadow transition-all"
                                        href={route("user.index")}
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
