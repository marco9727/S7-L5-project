<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::with('activity', 'slot')->get();
        return $courses;
    }


    public function coursesForUser()
    {
        $user_id = Auth::user()->id;

        $coursesForUser = User::with('courses')->find($user_id);  

        if(!$coursesForUser) {
            return response(['exist' => false]);
        } else {
            return [
                'exist' => true,
                'data' => $coursesForUser
            ];
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequest $request)
    {
        
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $course = Course::with('activity', 'slot')->find($id);
        if(!$course) {
            return response(['message' => 'Not found'], 404);
        } else {
            return [
                'data' => $course
            ];
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, Course $course)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        //
    }
}
