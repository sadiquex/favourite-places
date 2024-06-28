import * as SQLite from "expo-sqlite";

// TODO - fix the problem with SQLite

const database = await SQLite.openDatabaseAsync("places.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL,
      )`,
        [],
        // success callback
        () => {
          resolve();
        },
        // error callback
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};
