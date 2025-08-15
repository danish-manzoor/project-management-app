<?php

namespace App\Services;

use App\Models\Project;
use Storage;
use Str;

class ProjectService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function createProject($data)
    {
        $image = $data['image'] ?? null;
        if ($image) {
            $data['image_path'] = $image->store('project/' . Str::random(), 'public');
        }
        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();
        return Project::create($data);

    }

    public function updateProject($data, Project $project)
    {
        $image = $data['image'] ?? null;
        if ($image) {
            $data['image_path'] = $image->store('project/' . Str::random(), 'public');
        }
        if ($project->image_path) {
            $directory = dirname($project->image_path);
            Storage::disk('public')->deleteDirectory($directory);
        }
        $data['updated_by'] = auth()->id();
        $project->update($data);
    }
}
