-- Create journal table
CREATE TABLE IF NOT EXISTS journal (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    mood TEXT NOT NULL,
    daily_tasks JSON,
    goals_for_tomorrow TEXT,
    creative_ideas TEXT,
    habit_tracker JSON,
    todays_wins TEXT,
    gratitude_list TEXT,
    personal_reflections TEXT,
    user_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
); 