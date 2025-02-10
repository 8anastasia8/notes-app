export const noteSchema = {
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
  };