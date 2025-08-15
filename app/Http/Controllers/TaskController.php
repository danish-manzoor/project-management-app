<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\User;
use App\Services\TaskService;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query()
            ->select('tasks.*')
            ->join('projects', 'tasks.project_id', '=', 'projects.id') // JOIN is mandatory
            ->with('project');
        if (request('name')) {
            $query->where('tasks.name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('tasks.status', request('status'));
        }
        if (request('priority')) {
            $query->where('tasks.priority', request('priority'));
        }
        if (request('project_filter')) {
            $query->whereHas('project', function ($q) {
                $q->where('projects.name', 'like', '%' . request('project_filter') . '%');
            });
        }


        $sort_field = request("sort_field", "tasks.created_at");
        $sort_direction = request("sort_direction", "desc");
        if ($sort_field == 'project') {
            $query->orderBy('projects.name', $sort_direction);
        } else {
            $query->orderBy($sort_field, $sort_direction);
        }
        $tasks = $query->paginate(10);
        // dd($tasks);
        return Inertia::render("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::pluck('name', 'id');
        $projects = Project::pluck('name', 'id');
        return Inertia::render('Task/Create', [
            'users' => $users,
            'projects' => $projects,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request, TaskService $taskService)
    {
        $taskService->create($request->validated());
        return to_route('task.index')->with('success', 'Task created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return Inertia::render('Task/Show', [
            "task" => new TaskResource($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $users = User::pluck('name', 'id');
        $projects = Project::pluck('name', 'id');
        return Inertia::render('Task/Edit', [
            'task' => new TaskResource($task),
            'users' => $users,
            'projects' => $projects
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task, TaskService $taskService)
    {

        $taskService->update($task, $request->validated());
        return to_route('task.index')->with('success', "Task \"$task->name\" created successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();
        return to_route("task.index")->with("success", "Task \"$task->name\" deleted successfully");

    }


    public function myTask()
    {
        $query = Task::query()
            ->select('tasks.*')
            ->join('projects', 'tasks.project_id', '=', 'projects.id') // JOIN is mandatory
            ->where('assigned_user_id', auth()->user()->id)
            ->with('project');
        if (request('name')) {
            $query->where('tasks.name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('tasks.status', request('status'));
        }
        if (request('priority')) {
            $query->where('tasks.priority', request('priority'));
        }
        if (request('project_filter')) {
            $query->whereHas('project', function ($q) {
                $q->where('projects.name', 'like', '%' . request('project_filter') . '%');
            });
        }


        $sort_field = request("sort_field", "tasks.created_at");
        $sort_direction = request("sort_direction", "desc");
        if ($sort_field == 'project') {
            $query->orderBy('projects.name', $sort_direction);
        } else {
            $query->orderBy($sort_field, $sort_direction);
        }
        $tasks = $query->paginate(10);
        // dd($tasks);
        return Inertia::render("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }
}
