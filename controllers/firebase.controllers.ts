import { db } from "@/config/config";
import {
  Database,
  ref,
  onValue,
  DataSnapshot,
  update as FirebaseUpdate,
  update,
} from "firebase/database";

export default class FirebaseRepository {
  private db: Database;

  constructor() {
    this.db = db;
  }

  read(route: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const starCountRef = ref(this.db, route);

      onValue(
        starCountRef,
        (snapshot: DataSnapshot) => {
          const data = snapshot.val();
          console.log(data);
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  create() {
    // Implement the create method
  }

  update(route: string, payload: any) {
    const starCountRef = ref(this.db, route);
    return update(starCountRef, payload);
  }

  delete() {
    // Implement the delete method
  }
}
