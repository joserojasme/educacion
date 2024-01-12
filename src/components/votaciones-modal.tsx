import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  border: "1px solid  #ECEFF2",
  background: "#FFF",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface INestedModal {
  setOpenModalConfirmDocument: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      id: string;
      name: string;
    }>
  >;
  openModalConfirmDocument: {
    open: boolean;
    id: string;
    name: string;
  };
  handleWriteProfesor: ({
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
  }) => void;
  profesores: any;
}

export default function VotacionesModalContainer({
  setOpenModalConfirmDocument,
  openModalConfirmDocument,
  handleWriteProfesor,
  profesores,
}: INestedModal) {
  const handleClose = () => {
    setOpenModalConfirmDocument({ open: false, id: "", name: "" });
  };
  const [datosProfesor, setDatosProfesor] = React.useState({
    document: "",
    name: "",
    school: "",
  });
  const [isError, setIsError] = React.useState(false);
  const [isErrorFirebase, setIsErrorFirebase] = React.useState(false);
  const [canVote, setCanVote] = React.useState(false);

  const validateCanVote = () => {
    setCanVote(false);
    if (profesores?.length > 0) {
      Object.keys(profesores[0][1]).map((key) => {
        if (profesores[0][1][key]?.document === datosProfesor?.document) {
          setCanVote(true);
        }
      });
    }
  };

  React.useEffect(() => {
    validateCanVote();
  }, [datosProfesor?.document]);

  return (
    <div>
      <Modal
        open={openModalConfirmDocument.open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: "70%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 id="parent-modal-title">{`Tu voto será por ${openModalConfirmDocument.name.toUpperCase()}`}</h2>
          <p id="parent-modal-description">
            Por favor confirma los datos a continuación para asegurar que solo
            los docentes del municipio hayan votado hoy.
          </p>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            mt={3}
          >
            <TextField
              id="outlined-basic"
              label="No. documento"
              value={datosProfesor?.document.toUpperCase()}
              variant="outlined"
              onChange={(event) =>
                setDatosProfesor({
                  ...datosProfesor,
                  document: event.target.value,
                })
              }
            />
            <TextField
              value={datosProfesor?.name.toUpperCase()}
              onChange={(event) =>
                setDatosProfesor({
                  ...datosProfesor,
                  name: event.target.value,
                })
              }
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
            />
            <TextField
              value={datosProfesor?.school.toUpperCase()}
              id="outlined-basic"
              label="Escuela o entidad"
              variant="outlined"
              onChange={(event) =>
                setDatosProfesor({
                  ...datosProfesor,
                  school: event.target.value,
                })
              }
            />
          </Box>
          {(isError || isErrorFirebase) && (
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "30ch" },
                color: "red",
                background: "#FEE2E2",
                textAlign: "center",
                borderRadius: "8px",
              }}
              mt={3}
            >
              <p style={{ marginRight: "8px" }} id="parent-modal-description">
                {isError &&
                  "¡Recuerda llenar todos los campos para poder continuar!"}
                {isErrorFirebase &&
                  "Se ha producido un error. Por favor, informa al equipo de soporte para asistencia."}
              </p>
            </Box>
          )}
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            mt={3}
          >
            <Button variant="outlined" onClick={handleClose}>
              Cerrar
            </Button>
            <Button
              disabled={canVote}
              variant="contained"
              onClick={async () => {
                if (
                  datosProfesor?.document?.trim().length === 0 ||
                  datosProfesor?.name?.trim().length === 0 ||
                  datosProfesor?.school?.trim().length === 0
                ) {
                  setIsError(true);
                  return;
                } else {
                  setIsError(false);
                }
                let response = 400;
                try {
                  //@ts-ignore
                  response = await handleWriteProfesor({
                    documentoCandidato: openModalConfirmDocument?.id,
                    nombreProfesor: datosProfesor?.name,
                    documentoProfesor: datosProfesor?.document,
                    escuelaProfesor: datosProfesor?.school,
                    setIsErrorFirebase: setIsErrorFirebase,
                  });
                } catch (error) {
                  // Maneja el error
                }

                //@ts-ignore
                if (response === 200) {
                  Swal.fire({
                    title: "Gracias por votar",
                    text: `Se registró tu voto exitosamente por ${openModalConfirmDocument.name.toUpperCase()} `,
                    icon: "success",
                    confirmButtonColor: "#07892F",
                  });
                  handleClose();
                }
              }}
            >
              Confirmar voto
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
