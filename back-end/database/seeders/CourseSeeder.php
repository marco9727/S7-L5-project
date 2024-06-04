<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Course::factory(20)->create();
        
        $courses = Course::all()->all();
        $user_ids = User::all()->pluck('id')->all();
        foreach ($courses as $course) {
            $users_for_course = fake() -> randomElements($user_ids, null);
            foreach ($users_for_course as $user_id) {

                $course->users()->attach($user_id, ['status' => 'pending']);
            }
       }
    }
}
