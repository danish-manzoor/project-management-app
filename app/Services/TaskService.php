<?php

namespace App\Services;

use App\Models\Task;
use Storage;
use Str;

class TaskService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }


    public function create(array $data)
    {
        $image = $data["image"] ?? null;
        if ($image) {
            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
        }
        $data['created_by'] = auth()->user()->id;
        $data['updated_by'] = auth()->user()->id;
        return Task::create($data);
    }

    public function update(Task $task, array $data)
    {
        $image = $data["image"] ?? null;
        if ($image) {
            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
        }
        if ($task->image_path) {
            $directory = dirname($task->image_path);
            Storage::disk('public')->deleteDirectory($directory);
        }
        $data['updated_by'] = auth()->user()->id;
        return $task->update($data);
    }
}
