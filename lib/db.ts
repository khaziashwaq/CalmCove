import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";

let db: Database | null = null;

export async function getDb() {
  if (!db) {
    db = await open({
      filename: path.join(process.cwd(), "stories.db"),
      driver: sqlite3.Database,
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS stories (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        content TEXT NOT NULL,
        date TEXT NOT NULL,
        likes INTEGER DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        story_id TEXT NOT NULL,
        author TEXT NOT NULL,
        content TEXT NOT NULL,
        date TEXT NOT NULL,
        FOREIGN KEY (story_id) REFERENCES stories(id)
      );

      CREATE TABLE IF NOT EXISTS likes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        story_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (story_id) REFERENCES stories(id),
        UNIQUE(story_id, user_id)
      );

      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        email TEXT NOT NULL
      );

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
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);

    // Check if we need to insert initial data
    const count = await db.get("SELECT COUNT(*) as count FROM stories");
    if (count.count === 0) {
      // Insert initial stories
      await db.run(`
        INSERT INTO stories (id, title, author, content, date, likes) 
        VALUES 
        ('living-with-anxiety', 
         'Living with Anxiety', 
         'Anonymous',
         'Anxiety controlled my life, making even simple tasks difficult. Every day was a battle against intrusive thoughts and overwhelming fears. Simple activities like going to the grocery store or attending social gatherings became monumental challenges.\n\nThe turning point came when I started cognitive-behavioral therapy (CBT). Through CBT, I learned to identify my triggers and challenge my anxious thoughts. My therapist taught me breathing exercises and grounding techniques that helped me stay present during anxiety attacks.\n\nGradually, I began to see improvements. Tasks that once seemed impossible became manageable. I learned that while anxiety might always be part of my life, it doesn''t have to control it. Today, I can attend social events, maintain healthy relationships, and even give presentations at work.\n\nMy journey with anxiety has taught me the importance of self-compassion and seeking help when needed. If you''re struggling with anxiety, know that you''re not alone, and recovery is possible.',
         '2024-03-15',
         0
        );
      `);

      await db.run(`
        INSERT INTO stories (id, title, author, content, date, likes)
        VALUES 
        ('dealing-with-ocd',
         'Dealing with OCD',
         'Anonymous',
         'OCD rituals consumed my days, turning simple tasks into hours-long ordeals. Every action had to be perfect, and any perceived mistake would trigger an exhausting cycle of repetition. My need for symmetry and order began to isolate me from friends and family.\n\nExposure and response prevention therapy (ERP) became my lifeline. Through gradual exposure to triggering situations without performing compulsions, I learned to tolerate uncertainty and anxiety. It wasn''t easy, but each small victory gave me hope.\n\nToday, while I still experience OCD thoughts, I have the tools to manage them effectively. Life is more manageable, and I feel freer to pursue my goals without being trapped by compulsions.',
         '2024-03-14',
         0
        );
      `);

      await db.run(`
        INSERT INTO stories (id, title, author, content, date, likes)
        VALUES 
        ('adolescent-struggles',
         'Adolescent Struggles with Mental Health',
         'Anonymous',
         'As a teen, depression and anxiety overwhelmed me. School became a daily struggle, and I felt disconnected from my peers. The pressure to maintain good grades while battling internal demons seemed insurmountable.\n\nFinding the right therapist made all the difference. Through therapy, I learned healthy coping mechanisms and the importance of self-care. My family''s support, once I opened up about my struggles, provided a crucial foundation for recovery.\n\nNow, I''m in a better place and looking forward to my future. While there are still challenging days, I have the tools and support system to handle them. My experience has taught me the importance of mental health awareness and breaking the stigma around seeking help.',
         '2024-03-13',
         0
        );
      `);
    }
  }
  return db;
}
