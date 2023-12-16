/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import { Baseurl, Auth, showMsg } from "../../../../../Baseurl";
import Modal from "react-bootstrap/Modal";
import { FaEye } from "react-icons/fa";
import { Button, Form } from "react-bootstrap";

const PendingVendor = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [modalShow, setModalShow] = React.useState(false);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/admin/pending-vendors`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  //update vender profile
  const handle_updateVendor = (id) => {
    setId(id);
    setModalShow(true);
  };

  function MyVerticallyCenteredModal(props) {
    const [status, setStatus] = useState("");

    const handlePost = async (e) => {
      e.preventDefault();
      try {
        await axios.put(
          `${Baseurl}api/admin/approve-vendor/${id}`,
          {
            isVendorVerified: status,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchData();
        props.onHide();
        toast.error("vendor Update is successful", {
          position: "top-right",
        });
      } catch (error) {
        toast.error(error?.response?.data?.message);
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
          <Modal.Title id="contained-modal-title-vcenter">Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePost}>
            <Form.Select onChange={(e) => setStatus(e.target.value)}>
              <option>Open this select menu</option>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </Form.Select>

            <Modal.Footer>
              <Button type="submit">Submit</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section>
        <div className="pb-4  w-full flex justify-between items-center Heading_Container">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Pending Vendor ( Total : {data?.length} )
          </span>
        </div>
        {/* Add Form */}

        <div className="table-component">
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile No.</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Is VendorVerified</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td>{i.userName}</td>
                  <td>{i.mobileNumber}</td>
                  <td>{i.email}</td>
                  <td>{i.userType}</td>
                  <td>{i.isVendorVerified ? "True" : "False"}</td>
                  <td>
                    <div onClick={() => handle_updateVendor(i._id)}>
                      <FaEye
                        style={{
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
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
export default HOC(PendingVendor);
