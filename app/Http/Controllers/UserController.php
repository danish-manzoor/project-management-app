<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        $sort_field = request("sort_field", "created_at");
        $sort_direction = request("sort_direction", "desc");

        if (request()->has("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request()->has("email")) {
            $query->where("email", "like", "%" . request("email") . "%");
        }

        $users = $query->orderBy($sort_field, $sort_direction)->paginate(10)->onEachSide(1);
        return Inertia::render("User/Index", [
            "users" => UserResource::collection($users),
            "queryparams" => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {

        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'email_verified_at' => time()
        ]);
        return to_route('user.index')->with('success', 'User created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('User/Edit', [
            'user' => new UserResource($user)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $data['email_verified_at'] = time();
        if (isset($data['password']) && $data['password']) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);
        return to_route('user.index')->with('success', "User \"$user->name\" updated successfully");

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return to_route('user.index')->with('success', "User \"$user->name\" delete successfully");
    }
}
