import { FirestoreUser } from '@/types';
import { User } from 'firebase/auth';
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

export const addFirestoreUser = async (db: Firestore, user: User | FirestoreUser) => {
  const { uid, email, displayName, emailVerified, photoURL } = user;

  const userData: FirestoreUser = {
    uid: uid as string,
    email: email as string,
    displayName: displayName as string,
    emailVerified: emailVerified as boolean,
    photoURL: photoURL as string,
  };

  try {
    return await addDoc(collection(db, 'users'), userData);
  } catch (error) {
    console.error(error);
    throw createError({
      message: "Couldn't add user",
      statusCode: 500,
    });
  }
};

export const updateFirestoreUser = async (db: Firestore, user: FirestoreUser) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, 'users'), where('uid', '==', user.uid))
    );

    querySnapshot?.forEach(async (doc) => {
      const docRef = doc.ref;
      if (docRef) {
        await updateDoc(docRef, { ...user });
      }
    });
  } catch (error) {
    console.error(error);
    throw createError({
      message: "Couldn't update user",
      statusCode: 500,
    });
  }
};

export const deleteFirestoreUser = async (db: Firestore, user: FirestoreUser) => {
  if (!user.uid) {
    throw createError({
      message: "Send user's uid",
      statusCode: 400,
    });
  }

  try {
    const querySnapshot = await getDocs(
      query(collection(db, 'users'), where('uid', '==', user.uid))
    );

    querySnapshot?.forEach(async (doc) => {
      const docRef = doc.ref;
      if (docRef) {
        await deleteDoc(docRef);
      }
    });
  } catch (error) {
    console.error(error);
    throw createError({
      message: "Couldn't delete user",
      statusCode: 500,
    });
  }
};

export const getFirestoreUser = async (
  db: Firestore,
  uid: string
): Promise<FirestoreUser | undefined> => {
  try {
    const querySnapshot = await getDocs(query(collection(db, 'users'), where('uid', '==', uid)));
    const doc = querySnapshot.docs[0]; // Assuming UID is unique, retrieve the first document
    if (doc) {
      const user = doc.data() as FirestoreUser;
      return user;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(error);
    throw createError({
      message: "Couldn't get user",
      statusCode: 500,
    });
  }
};
