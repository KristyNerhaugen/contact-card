import { openDB } from "idb";
import "regenerator-runtime/runtime";

export const initdb = async () => {
  // creating new database, contact_db, which is version 1 of the database
  openDB("contact_db", 1, {
    // add database schema if not already initialized
    upgrade(db) {
      if (db.objectStoreNames.contains("contacts")) {
        console.log("contacts store already exists");
        return;
      }
      // create a new object store for the data and give it the key name of 'id', which will increment automatically
      db.createObjectStore("contacts", { keyPath: "id", autoIncrement: true });
      console.log("contacts store created");
    },
  });
};
