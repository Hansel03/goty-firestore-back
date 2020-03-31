import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://firestore-grafica-9e0be.firebaseio.com'
});

// Referencia de base de datos de firestore
const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.json({
    mensaje: 'Hola Mundo desde funciones de Firebase!!'
  });
});

export const getGOTY = functions.https.onRequest(async (request, response) => {
  //   const nombre = request.query.nombre || 'sin nombre';

  //   response.json({
  //     nombre
  //   });

  // Nombre de la colleccion de firebase
  const gotyRef = db.collection('goty');
  //   tomamos una snapshot de los datos en ese momento
  const docsSnap = await gotyRef.get();
  //   los documentos de la base de datos procesados
  const juegos = docsSnap.docs.map(doc => doc.data());

  response.json(juegos);
});
