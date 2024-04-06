import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "react-bootstrap/Modal.css";
// import "bootstrap/dist/css/Modal.min.css";
import "./Boots.css";
// import "bootstrap/dist/css/bootstrap.min.css";
function Example({ children, setOpen, open = false }) {
  const [show, setShow] = useState(open);
  useEffect(() => {
    setShow(open);
  }, [open]);
  const handleClose = () => {
    setShow(false);
    setOpen(false);
  };
  const handleShow = () => {
    setShow(true);
    setOpen(true);
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        // fullscreen={"sm-down"}
        // dialogClassName="modal-100w"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header
          style={{
            position: "absolute",
            right: "-5px",
            top: "-5px",
            border: "none",
            cursor: "pointer",
            zIndex: "1",
          }}
          closeButton
        ></Modal.Header>
        <Modal.Body style={{ height: "85vh" }}>{children}</Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default Example;
