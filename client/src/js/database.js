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

// async export function getDb() to retrieve (or READ) data from IndexedDB database
// function to GET to the database
export const getDb = async () => {
  console.log("GET from the database");

  //connection to the IndexedDb database and the version we wnat to use
  const contactDb = await openDB("contact_db", 1);

  //create new transation and specify the store and data privileges
  const tx = contactDb.transaction("contacts", "readonly");

  //open up desired object store
  const store = tx.objectStore("contacts");

  // getAll() method to get all data in database
  const request = store.getAll();

  // get confirmation of the request
  const result = await request;
  console.log("result.value", result);
  return result;
};

// async export function postDb() to POST data from IndexedDB database
export const postDb = async (name, email, phone, profile) => {
  console.log("POST to the database");

  //connection to the IndexedDb database and the version we want to use
  const contactDb = await openDB("contact_db", 1);

  //create new transation and specify the store and data privileges
  const tx = contactDb.transaction("contacts", "readwrite");

  //open up desired object store
  const store = tx.objectStore("contacts");

  // add() method to pass in content
  const request = store.add({
    name: name,
    email: email,
    phone: phone,
    profile: profile,
  });

  // get confirmation of the request
  const result = await request;
  console.log("data added and saved to the database", result);
};

export const deleteDb = async (id) => {
  console.log("DELETE from the database", id);

  // Create a connection to the IndexedDB database and the version we want to use.
  const contactDb = await openDB("contact_db", 1);

  // Create a new transaction and specify the store and data privileges.
  const tx = contactDb.transaction("contacts", "readwrite");

  // Open up the desired object store.
  const store = tx.objectStore("contacts");

  // Use the .delete() method to get all data in the database.
  const request = store.delete(id);

  // Get confirmation of the request.
  const result = await request;
  console.log("result.value", result);
  return result?.value;
};
