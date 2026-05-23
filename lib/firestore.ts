import { db } from "@/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  orderBy,
  where,
  deleteDoc,
  setDoc,
  increment,
} from "firebase/firestore";

// ============ STORIES ============

export async function getAllStories() {
  const q = query(collection(db, "stories"), orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getStoryById(id: string) {
  const storyRef = doc(db, "stories", id);
  const storyDoc = await getDoc(storyRef);
  if (!storyDoc.exists()) return null;
  return { id: storyDoc.id, ...storyDoc.data() };
}

export async function createStory(data: {
  id: string;
  title: string;
  author: string;
  content: string;
  date: string;
}) {
  const storyRef = doc(db, "stories", data.id);
  await setDoc(storyRef, { ...data, likes: 0 });
  return data.id;
}

// ============ COMMENTS ============

export async function getCommentsByStoryId(storyId: string) {
  const q = query(
    collection(db, "stories", storyId, "comments"),
    orderBy("date", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function createComment(
  storyId: string,
  data: { author: string; content: string; date: string }
) {
  const commentsRef = collection(db, "stories", storyId, "comments");
  const docRef = await addDoc(commentsRef, data);
  return { id: docRef.id, ...data };
}

// ============ LIKES ============

export async function toggleStoryLike(storyId: string, userId: string) {
  const likeRef = doc(db, "likes", `${storyId}_${userId}`);
  const likeDoc = await getDoc(likeRef);

  const storyRef = doc(db, "stories", storyId);

  if (likeDoc.exists()) {
    await deleteDoc(likeRef);
    await updateDoc(storyRef, { likes: increment(-1) });
    return false;
  } else {
    await setDoc(likeRef, {
      userId,
      storyId,
      createdAt: new Date().toISOString(),
    });
    await updateDoc(storyRef, { likes: increment(1) });
    return true;
  }
}

export async function checkUserLike(storyId: string, userId: string) {
  const likeRef = doc(db, "likes", `${storyId}_${userId}`);
  const likeDoc = await getDoc(likeRef);
  return likeDoc.exists();
}

// ============ JOURNAL ============

export async function createJournalEntry(
  userId: string,
  data: {
    date: string;
    mood: string;
    daily_tasks?: string;
    goals_for_tomorrow?: string;
    creative_ideas?: string;
    habit_tracker?: string;
    todays_wins?: string;
    gratitude_list?: string;
    personal_reflections?: string;
  }
) {
  const journalId = `${data.date}-${userId}`;
  const journalRef = doc(db, "journal", journalId);
  await setDoc(journalRef, { ...data, user_id: userId }, { merge: true });
  return journalId;
}

export async function getJournalEntries(userId: string, date?: string) {
  if (date) {
    const journalId = `${date}-${userId}`;
    const journalRef = doc(db, "journal", journalId);
    const journalDoc = await getDoc(journalRef);
    if (!journalDoc.exists()) return null;
    return { id: journalDoc.id, ...journalDoc.data() };
  }

  const q = query(
    collection(db, "journal"),
    where("user_id", "==", userId),
    orderBy("date", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getJournalProgress(userId: string) {
  const q = query(
    collection(db, "journal"),
    where("user_id", "==", userId),
    orderBy("date", "asc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}
