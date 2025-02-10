import { createRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";

export const initDB = async () => {
  const db = await createRxDatabase({
    name: "notesdb",
    storage: getRxStorageDexie(),
  });

  await db.addCollections({
    notes: {
        schema: {
            title: "notes",
            version: 0,
            description: "Notes schema for RxDB",
            type: "object",
            primaryKey: "id",
            properties: {
            userId: {type: "number"},  
            id: { type: "string", maxLength: 100 },
            title: { type: "string" },
            body: { type: "string" },
            },
            required: ["userId", "id", "title", "body"],
        },
    },
  });

  return db;
};