import { db } from "@/config/config";
import { Database, ref, onValue, DataSnapshot } from "firebase/database";

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

  update() {
    // Implement the update method
  }

  delete() {
    // Implement the delete method
  }
}
