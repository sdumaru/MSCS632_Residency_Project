import { db } from './config';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy,
  where,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';

// Todos Collection
const todosCollection = collection(db, 'todos');

export const subscribeToTodos = (callback) => {
  const q = query(todosCollection, orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const todos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(todos);
  });
};

export const addTodo = async (todo) => {
  const docRef = await addDoc(todosCollection, {
    ...todo,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

export const updateTodo = async (todoId, updates) => {
  const todoRef = doc(db, 'todos', todoId);
  await updateDoc(todoRef, {
    ...updates,
    updatedAt: serverTimestamp()
  });
};

// Users Collection
const usersCollection = collection(db, 'users');

export const subscribeToUsers = (callback) => {
  const q = query(usersCollection, orderBy('name'));
  return onSnapshot(q, (snapshot) => {
    const users = snapshot.docs.map(doc => doc.data().name);
    callback(users);
  });
};

export const addUser = async (userName) => {
  await addDoc(usersCollection, { 
    name: userName,
    createdAt: serverTimestamp()
  });
};

export const deleteUser = async (userName) => {
  const userQuery = query(usersCollection, where('name', '==', userName));
  const snapshot = await getDocs(userQuery);
  snapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
}; 