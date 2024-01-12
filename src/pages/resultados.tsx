import { Box, Container, useMediaQuery } from "@mui/material";
import MediaCard from "../components/card";
import { useEffect, useState } from "react";
import { useFirebase } from "../hook/useFirebase";
import VotacionesModalContainer from "../components/votaciones-modal";

function ordenarObjetoPorValor(objeto: any) {
  const arregloOrdenado = Object.entries(objeto)
    //@ts-ignore
    .sort(([, valorA], [, valorB]) => valorB - valorA)
    .map(([clave, valor]) => ({ [clave]: valor }));

  return arregloOrdenado;
}

function agruparCandidatos(objeto: any) {
  if (!Array.isArray(objeto) || objeto.length === 0) {
    return {};
  }

  const primerElemento = objeto[0][1];
  const candidatos = {};

  for (const key in primerElemento) {
    if (primerElemento.hasOwnProperty(key)) {
      const candidatoId = primerElemento[key].candidate;

      if (candidatoId) {
        //@ts-ignore
        if (candidatos[candidatoId]) {
          //@ts-ignore
          candidatos[candidatoId]++;
        } else {
          //@ts-ignore
          candidatos[candidatoId] = 1;
        }
      }
    }
  }

  return candidatos;
}

const obtenerNameCandidato = (id: string, profesores: any) => {
  let name = "";
  Object.keys(profesores[0][1]).map((key) => {
    if (profesores[0][1][key]?.document === id) {
      name = profesores[0][1][key]?.name;
    }
  });
  return name;
};

const getVotos = (objeto: any) => {
  let votos;
  for (const clave in objeto) {
    if (objeto.hasOwnProperty(clave)) {
      votos = objeto[clave];
    }
  }
  return votos;
};

const Resultados = () => {
  const phone = useMediaQuery("(max-width:500px)");
  const [ordenCandidatos, setOrdenCandidatos] = useState<any>([]);
  const {
    getFirebaseRTDProfesores,
    profesores,
    getFirebaseRTDVotes,
    votesResults,
  } = useFirebase();

  useEffect(() => {
    getFirebaseRTDProfesores();
    getFirebaseRTDVotes();
  }, []);

  useEffect(() => {
    if (votesResults?.length > 0 && profesores?.length > 0) {
      const candidatos = agruparCandidatos(votesResults);
      setOrdenCandidatos(ordenarObjetoPorValor(candidatos));
    }
  }, [votesResults, profesores]);

  return (
    <>
      <Container
        maxWidth="xl"
        style={{ marginBottom: "24px", marginTop: phone ? "48px" : 0 }}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: phone ? "column" : "row",
          alignItems: phone ? "center" : "flex-start",
          height: "5vh",
          padding: "24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "24px",
            marginBottom: "24px",
          }}
        >
          <Box mb={3}>
            <h3 id="parent-modal-title">{`Resultados`}</h3>
          </Box>
        </Box>
      </Container>
      {ordenCandidatos?.length > 0 && (
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: phone ? "row" : "column",
            alignItems: "center",
            flexWrap: "wrap",

            padding: "48px",
            gap: 2,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            {Object.entries(ordenCandidatos)[0] && (
              <MediaCard
                podium={4}
                name={`${obtenerNameCandidato(
                  //@ts-ignore
                  Object.keys(Object.entries(ordenCandidatos)[0][1])[0],
                  profesores
                ).toUpperCase()} - ${getVotos(
                  Object.entries(ordenCandidatos)[0][1]
                )}`}
              />
            )}
            {Object.entries(ordenCandidatos)[1] && (
              <MediaCard
                podium={4}
                name={`${obtenerNameCandidato(
                  //@ts-ignore
                  Object.keys(Object.entries(ordenCandidatos)[1][1])[0],
                  profesores
                ).toUpperCase()} -  ${getVotos(
                  Object.entries(ordenCandidatos)[1][1]
                )}`}
              />
            )}
            {Object.entries(ordenCandidatos)[2] && (
              <MediaCard
                podium={4}
                name={`${obtenerNameCandidato(
                  //@ts-ignore
                  Object.keys(Object.entries(ordenCandidatos)[2][1])[0],
                  profesores
                ).toUpperCase()} -  ${getVotos(
                  Object.entries(ordenCandidatos)[2][1]
                )}`}
              />
            )}
            {Object.entries(ordenCandidatos)[3] && (
              <MediaCard
                podium={4}
                name={`${obtenerNameCandidato(
                  //@ts-ignore
                  Object.keys(Object.entries(ordenCandidatos)[3][1])[0],
                  profesores
                ).toUpperCase()} - ${getVotos(
                  Object.entries(ordenCandidatos)[3][1]
                )}`}
              />
            )}
            {Object.entries(ordenCandidatos)[4] && (
              <MediaCard
                podium={5}
                name={`${obtenerNameCandidato(
                  //@ts-ignore
                  Object.keys(Object.entries(ordenCandidatos)[4][1])[0],
                  profesores
                ).toUpperCase()} -  ${getVotos(
                  Object.entries(ordenCandidatos)[4][1]
                )}`}
              />
            )}
            {Object.entries(ordenCandidatos)[5] && (
              <MediaCard
                podium={6}
                name={`${obtenerNameCandidato(
                  //@ts-ignore
                  Object.keys(Object.entries(ordenCandidatos)[5][1])[0],
                  profesores
                ).toUpperCase()} -  ${getVotos(
                  Object.entries(ordenCandidatos)[5][1]
                )}`}
              />
            )}
          </div>
        </Container>
      )}
    </>
  );
};

export default Resultados;
