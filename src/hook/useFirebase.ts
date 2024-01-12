import { onValue, push, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../utils";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const useFirebase = () => {
  const [profesores, setProfesores] = useState<any>();
  const [votesResults, setVotesResults] = useState<any>();
  const [userIdFirebase, setUserIdFirebase] = useState<any>();

  useEffect(() => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, "guari.716@gmail.com", "juan123")
      .then((data) => {})
      .catch((error) => {
        console.log("***error", error);
      });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserIdFirebase(uid);
      }
    });
  }, []);

  const getFirebaseRTDProfesores = () => {
    const query = ref(db, `profesor`);
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        const list = Object.entries(data);
        setProfesores(list);
      }
    });
  };

  const getFirebaseRTDVotes = () => {
    const query = ref(db, `table_results`);
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        const list = Object.entries(data);
        setVotesResults(list);
      }
    });
  };

  const writeVotes = ({
    documentoCandidato,
    nombreProfesor,
    documentoProfesor,
    escuelaProfesor,
    setIsErrorFirebase,
  }: {
    documentoCandidato: string;
    nombreProfesor: string;
    documentoProfesor: string;
    escuelaProfesor: string;
    setIsErrorFirebase: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    return new Promise((resolve, reject) => {
      const date = new Date();

      push(ref(db, "table_results/" + userIdFirebase), {
        candidate: documentoCandidato,
        createdAt: date,
        document: documentoProfesor,
        name: nombreProfesor,
        school: escuelaProfesor,
      })
        .then(() => {
          resolve(200);
        })
        .catch((error) => {
          console.log("***ERROR AL GUARDAR VOTO", error);
          setIsErrorFirebase(true);
          reject(error);
        });
    });
  };

  const writeProfesor = ({
    nombreProfesor,
    documentoProfesor,
    escuelaProfesor,
    documentoCandidato,
    setIsErrorFirebase,
  }: {
    nombreProfesor: string;
    documentoProfesor: string;
    escuelaProfesor: string;
    documentoCandidato: string;
    setIsErrorFirebase: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    return new Promise(async (resolve, reject) => {
      const data = {
        canVote: false,
        createdAt: new Date(),
        document: documentoProfesor,
        isCandidate: true,
        name: nombreProfesor,
        school: escuelaProfesor,
      };

      try {
        await push(ref(db, "profesor/" + userIdFirebase), data);
        const response = await writeVotes({
          documentoCandidato,
          nombreProfesor,
          documentoProfesor,
          escuelaProfesor,
          setIsErrorFirebase,
        });
        resolve(response);
      } catch (error) {
        console.log("***ERROR AL GUARDAR PROFESOR", error);
        setIsErrorFirebase(true);
        reject(error);
      }
    });
  };

  // const updateProfesor = (idProfesor = "-NnsaTAOJoxDnL0wtDXt") => {
  //   const dataRef = ref(db, "profesor/" + userIdFirebase + "/" + idProfesor);
  //   const updates = {
  //     canVote: false,
  //   };
  //   update(dataRef, updates)
  //     .then(() => {
  //       console.log("Data updated successfully!");
  //     })
  //     .catch((error) => {
  //       console.error("An error occurred while updating data:", error);
  //     });
  // };

  return {
    getFirebaseRTDProfesores,
    profesores,
    setProfesores,
    // updateProfesor,
    getFirebaseRTDVotes,
    votesResults,
    writeVotes,
    writeProfesor,
  };
};
