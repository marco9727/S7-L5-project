<?php

namespace Database\Factories;

use App\Models\Activity;
use App\Models\Slot;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $activity_ids = Activity::all()->pluck('id')->all();
        $slot_ids = Slot::all()->pluck('id')->all();
        return [
            'location'=> fake()->address(),
            'activity_id'=> fake()->randomElement($activity_ids),
            'slot_id'=> fake()->randomElement($slot_ids),
        ];
    }
}
