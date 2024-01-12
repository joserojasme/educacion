import { Box, Container, useMediaQuery } from "@mui/material";
import MediaCard from "../components/card";
import { useEffect, useState } from "react";
import { useFirebase } from "../hook/useFirebase";
import VotacionesModalContainer from "../components/votaciones-modal";

const Votaciones = () => {
  const phone = useMediaQuery("(max-width:500px)");
  const deleteImages = useMediaQuery("(max-width:1330px)");
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
  console.log("***profesores", profesores);
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
          height: deleteImages ? "10vh" : "25vh",
          padding: "24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "24px",
            marginBottom: "24px",
            justifyItems: "space-between",
          }}
        >
          <Box display={deleteImages ? "none" : "block"} width="25%" mb={3}>
            <img
              src="https://girardota.gov.co/Style%20Library/archivos/images/logo-escudo.png"
              alt="Decencia en lo público"
              style={{ width: "350px", height: "150px " }}
            />
          </Box>
          <Box width={deleteImages ? "100%" : "50%"} mb={3}>
            <h3 id="parent-modal-title">{`Elección para el Cargo de Secretario o Secretaria de Educación en Girardota`}</h3>
          </Box>
          <Box display={deleteImages ? "none" : "block"} width="25%" mb={3}>
            <img
              src="data:image/jpeg;base64,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"
              alt="Decencia en lo público"
              style={{ width: "300px", height: "100px " }}
            />
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
                    image={profesores[0][1][key]?.img}
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
