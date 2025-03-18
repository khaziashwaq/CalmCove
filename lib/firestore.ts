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
} from "firebase/firestore";

// ... existing functions ...

export async function toggleStoryLike(storyId: string, userId: string) {
  const likeRef = doc(db, "likes", `${storyId}_${userId}`);
  const likeDoc = await getDoc(likeRef);

  const storyRef = doc(db, "stories", storyId);
  const storyDoc = await getDoc(storyRef);
  const currentLikes = storyDoc.data()?.likes || 0;

  if (likeDoc.exists()) {
    // Unlike: Remove like document and decrease count
    await deleteDoc(likeRef);
    await updateDoc(storyRef, {
      likes: currentLikes - 1,
    });
    return false; // Return false to indicate the story is now unliked
  } else {
    // Like: Create like document and increase count
    await setDoc(likeRef, {
      userId,
      storyId,
      createdAt: new Date().toISOString(),
    });
    await updateDoc(storyRef, {
      likes: currentLikes + 1,
    });
    return true; // Return true to indicate the story is now liked
  }
}

export async function checkUserLike(storyId: string, userId: string) {
  const likeRef = doc(db, "likes", `${storyId}_${userId}`);
  const likeDoc = await getDoc(likeRef);
  return likeDoc.exists();
}
