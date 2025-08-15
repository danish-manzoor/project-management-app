<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Task;
use App\Services\ProjectService;
use Inertia\Inertia;
use Storage;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();

        $sort_field = request("sort_field", "created_at");
        $sort_direction = request("sort_direction", "desc");

        if (request()->has("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if (request()->has("status")) {
            $query->where("status", request("status"));
        }

        $projects = $query->orderBy($sort_field, $sort_direction)->paginate(10)->onEachSide(1);
        return Inertia::render("Project/Index", [
            "projects" => ProjectResource::collection($projects),
            "queryparams" => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request, ProjectService $projectService)
    {
        $projectService->createProject($request->validated());

        return to_route('project.index')->with('success', 'Project added successfully');

    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = Task::query()
            ->select('tasks.*')
            ->where('project_id', $project->id);

        if (request('name')) {
            $query->where('tasks.name', 'like', '%' . request('name') . '%');
        }

        if (request('status')) {
            $query->where('tasks.status', request('status'));
        }

        if (request('priority')) {
            $query->where('tasks.priority', request('priority'));
        }





        $sort_field = request("sort_field", "created_at");
        $sort_direction = request("sort_direction", "desc");

        $query->orderBy($sort_field, $sort_direction);


        $tasks = $query->paginate(10);
        // dd($query->get());
        return Inertia::render('Project/Show', [
            'project' => new ProjectResource($project),
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return Inertia::render('Project/Edit', [
            'project' => new ProjectResource($project)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project, ProjectService $projectService)
    {
        $projectService->updateProject($request->validated(), $project);
        return to_route('project.index')->with('success', "Project \"$project->name\"updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $name = $project->name;
        $project->task()->delete();
        $project->delete();
        if ($project->image_path) {
            $directory = dirname($project->image_path);
            Storage::disk('public')->deleteDirectory($directory);
        }
        return to_route('project.index')->with('success', "project\"$name\" deleted successfully");
    }
}
