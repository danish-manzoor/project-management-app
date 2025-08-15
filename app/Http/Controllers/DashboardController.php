<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $totalPendingTask = Task::query()->where(['status' => 'pending'])->count();
        $myPendingTask = Task::query()->where(['status' => 'pending', 'assigned_user_id' => $user->id])
            ->count();


        $totalInProgressTask = Task::query()->where(['status' => 'in_progress'])->count();
        $myInProgressTask = Task::query()->where(['status' => 'in_progress', 'assigned_user_id' => $user->id])
            ->count();


        $totalCompletedTask = Task::query()->where(['status' => 'completed'])->count();
        $myCompletedTask = Task::query()->where(['status' => 'completed', 'assigned_user_id' => $user->id])
            ->count();

        $activeTask = Task::query()->whereIn('status', ['pending', 'in_progress'])
            ->where('assigned_user_id', $user->id)->limit(10)->get();
        // dd($activeTask);
        return Inertia::render("Dashboard", [
            "totalPendingTask" => $totalPendingTask,
            "myPendingTask" => $myPendingTask,
            "totalInProgressTask" => $totalInProgressTask,
            "myInProgressTask" => $myInProgressTask,
            "totalCompletedTask" => $totalCompletedTask,
            "myCompletedTask" => $myInProgressTask,
            "activeTask" => TaskResource::collection($activeTask),

        ]);
    }
}
