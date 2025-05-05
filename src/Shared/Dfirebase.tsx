import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

function DfireBase() {
  const deleteAllFromCollection = async (collectionName:any) => {
    try {
      const colRef = collection(db, collectionName);
      const snapshot = await getDocs(colRef);

      const deletePromises = snapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, collectionName, docSnap.id))
      );

      await Promise.all(deletePromises);
      console.log(`All documents deleted from collection: ${collectionName}`);
      alert(`Deleted all documents from ${collectionName}`);
    } catch (error) {
      console.error('Error deleting documents:', error);
      alert('Failed to delete documents. Check the console for more info.');
    }
  };

  return (
    <button onClick={() => deleteAllFromCollection('tour-review')}>
      Delete Firebase Collection Data
    </button>
  );
}

export default DfireBase;
