/**
 * Run this once to seed initial stories into Firestore:
 *   npx ts-node --skip-project scripts/seed-stories.ts
 *
 * Or add to Firestore manually via the Firebase Console.
 */

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDe8U7apEE2Jx713qetmIG4kb99s5GH79o",
  authDomain: "mental-health-chat-62ac6.firebaseapp.com",
  projectId: "mental-health-chat-62ac6",
  storageBucket: "mental-health-chat-62ac6.firebasestorage.app",
  messagingSenderId: "440860208429",
  appId: "1:440860208429:web:bd5ec004a465a9c410b7a4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const stories = [
  {
    id: "living-with-anxiety",
    title: "Living with Anxiety",
    author: "Anonymous",
    content: `Anxiety controlled my life, making even simple tasks difficult. Every day was a battle against intrusive thoughts and overwhelming fears. Simple activities like going to the grocery store or attending social gatherings became monumental challenges.

The turning point came when I started cognitive-behavioral therapy (CBT). Through CBT, I learned to identify my triggers and challenge my anxious thoughts. My therapist taught me breathing exercises and grounding techniques that helped me stay present during anxiety attacks.

Gradually, I began to see improvements. Tasks that once seemed impossible became manageable. I learned that while anxiety might always be part of my life, it doesn't have to control it. Today, I can attend social events, maintain healthy relationships, and even give presentations at work.

My journey with anxiety has taught me the importance of self-compassion and seeking help when needed. If you're struggling with anxiety, know that you're not alone, and recovery is possible.`,
    date: "2024-03-15",
    likes: 0,
  },
  {
    id: "dealing-with-ocd",
    title: "Dealing with OCD",
    author: "Anonymous",
    content: `OCD rituals consumed my days, turning simple tasks into hours-long ordeals. Every action had to be perfect, and any perceived mistake would trigger an exhausting cycle of repetition. My need for symmetry and order began to isolate me from friends and family.

Exposure and response prevention therapy (ERP) became my lifeline. Through gradual exposure to triggering situations without performing compulsions, I learned to tolerate uncertainty and anxiety. It wasn't easy, but each small victory gave me hope.

Today, while I still experience OCD thoughts, I have the tools to manage them effectively. Life is more manageable, and I feel freer to pursue my goals without being trapped by compulsions.`,
    date: "2024-03-14",
    likes: 0,
  },
  {
    id: "adolescent-struggles",
    title: "Adolescent Struggles with Mental Health",
    author: "Anonymous",
    content: `As a teen, depression and anxiety overwhelmed me. School became a daily struggle, and I felt disconnected from my peers. The pressure to maintain good grades while battling internal demons seemed insurmountable.

Finding the right therapist made all the difference. Through therapy, I learned healthy coping mechanisms and the importance of self-care. My family's support, once I opened up about my struggles, provided a crucial foundation for recovery.

Now, I'm in a better place and looking forward to my future. While there are still challenging days, I have the tools and support system to handle them. My experience has taught me the importance of mental health awareness and breaking the stigma around seeking help.`,
    date: "2024-03-13",
    likes: 0,
  },
];

async function seed() {
  for (const story of stories) {
    const ref = doc(db, "stories", story.id);
    const existing = await getDoc(ref);
    if (!existing.exists()) {
      await setDoc(ref, story);
      console.log(`Seeded: ${story.title}`);
    } else {
      console.log(`Already exists: ${story.title}`);
    }
  }
  console.log("Done!");
  process.exit(0);
}

seed().catch(console.error);
