/** @format */
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FloatingLabel } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { Baseurl, showMsg, Auth } from "../../../../../Baseurl";

const MSG = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${Baseurl}api/v1/notify/Admin/Notification`
      );
      setData(data.message);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteData = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Baseurl}api/v1/notify/delete/${id}`
      );
      console.log(data);
      toast.success("Notification Deleted");
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [message, setMessage] = useState("");

    const postData = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(`${Baseurl}api/v1/notify`, {
          message,
        });
        showMsg("Success", "Notification Created !", "success");
        props.onHide();
        fetchData();
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Notification
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postData}>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingTextarea2" label="Notification">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center Heading_Container">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Notification
          </span>
          <button
            onClick={() => {
              setModalShow(true);
            }}
          >
            Add Notification
          </button>
        </div>
        {/* Add Form */}

        <div className="table-component">
          <Table>
            <thead>
              <tr>
                <th>Notification</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td>{i.message}</td>
                  <td> {i.createdAt.slice(0, 10)} </td>
                  <td>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteData(i._id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(MSG);
