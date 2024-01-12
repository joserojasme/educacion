import { Box, Container, useMediaQuery } from "@mui/material";
import MediaCard from "../components/card";
import { useEffect, useState } from "react";
import { useFirebase } from "../hook/useFirebase";
import VotacionesModalContainer from "../components/votaciones-modal";

const Votaciones = () => {
  const phone = useMediaQuery("(max-width:500px)");
  const [openModalConfirmDocument, setOpenModalConfirmDocument] = useState({
    open: false,
    id: "",
    name: "",
  });

  const {
    getFirebaseRTDProfesores,
    profesores,
    getFirebaseRTDVotes,
    writeProfesor,
  } = useFirebase();

  useEffect(() => {
    getFirebaseRTDProfesores();
    getFirebaseRTDVotes();
  }, []);

  return (
    <>
      <Container
        maxWidth="xl"
        style={{ marginBottom: "24px", marginTop: phone ? "48px" : 0 }}
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
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
            <h3 id="parent-modal-title">{`Elección para el Cargo de Secretario o Secretaria de Educación en Girardota`}</h3>
          </Box>
        </Box>
      </Container>
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
          {profesores?.length > 0 &&
            Object.keys(profesores[0][1]).map((key) => {
              if (!profesores[0][1][key]?.isCandidate) return null;
              return (
                <div
                  onClick={() =>
                    setOpenModalConfirmDocument({
                      open: true,
                      id: profesores[0][1][key]?.document,
                      name: profesores[0][1][key]?.name,
                    })
                  }
                >
                  <MediaCard
                    key={profesores[0][1][key]?.document}
                    //@ts-ignore
                    id={profesores[0][1][key]?.document}
                    //@ts-ignore
                    name={profesores[0][1][key]?.name.toUpperCase()}
                    //@ts-ignore
                    document={profesores[0][1][key]?.document}
                  />
                </div>
              );
            })}
        </div>
      </Container>
      {openModalConfirmDocument.open && profesores && (
        <VotacionesModalContainer
          profesores={profesores}
          handleWriteProfesor={writeProfesor}
          openModalConfirmDocument={openModalConfirmDocument}
          setOpenModalConfirmDocument={setOpenModalConfirmDocument}
        />
      )}
    </>
  );
};

export default Votaciones;
