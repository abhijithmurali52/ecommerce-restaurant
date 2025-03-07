import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Table } from "react-bootstrap";
import {
    faPlus,
    faEdit,
    faTimes,
    faSave,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import AddSupplier from "./AddSupplier";
import logo from './Images/logo.png';

function NewModal({ show, handleClose }) {
    const initialFormData = {
        supplierName: '',
        billNumber: '',
        invoiceDate: '',
        sl_no: '',
        barcode: '',
        item: '',
        itemDescription: '',
        qty: '',
        uom: '',
        rate: '',
        cgst: '',
        sgst: '',
        discount: '',
        netRate: '',
        amount: '',
        netAmount: '',
        groupName: '',
        margin: '',
        MRP: '',
        salesRate: '',
        minRate: '',
        paymentMode: '',
        tenderedAmount: '',
        balanceAmount: '',
        discountAmount: '',
        brand: '',
        itemCode: '',
        minimumRate: '',
        minStock: '',
        location: '',
        hasBatch: '',
        isActive: '',
        isFMP: '',
    };
    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    useEffect(() => {
        if (formData.qty && formData.rate) {
            const netRate = parseFloat(formData.qty) * parseFloat(formData.rate);
            setFormData((prevState) => ({
                ...prevState,
                netRate: netRate.toFixed(2),
            }));
        }
    }, [formData.qty, formData.rate]);

    useEffect(() => {
        if (formData.cgst && formData.sgst && formData.netRate) {
            const amount = parseFloat(formData.netRate) + parseFloat(formData.cgst) + parseFloat(formData.sgst);
            setFormData((prevState) => ({
                ...prevState,
                amount: amount.toFixed(2), // Assuming you want 2 decimal places
            }));
        }
    }, [formData.cgst, formData.sgst, formData.netRate]);

    useEffect(() => {
        if (formData.amount && formData.discount) {
            const discountedAmount = parseFloat(formData.amount) - parseFloat(formData.discount);
            setFormData((prevState) => ({
                ...prevState,
                netAmount: discountedAmount.toFixed(2), // Assuming you want 2 decimal places
            }));
        }
    }, [formData.amount, formData.discount]);

    useEffect(() => {
        if (formData.margin && formData.rate) {
            const mrp = parseFloat(formData.rate) * (1 + parseFloat(formData.margin) / 100);
            setFormData((prevState) => ({
                ...prevState,
                salesRate: mrp.toFixed(2),
            }));
        }
    }, [formData.margin, formData.rate]);


    const [showModalAddSupplier, setShowModalAddSupplier] = useState(false);

    const handleModalClose = () => {
        setShowModalAddSupplier(false);
    };

    const [showItemUpdateModal, setShowItemUpdateModal] = useState(false);
    const [showPurPayModal, setShowPurPayModal] = useState(false);
    const [items, setItems] = useState([]);

    const handleAddItem = () => {
        setItems([...items, formData]);
        setFormData({
            sl_no: formData.sl_no,
            item: formData.item,
            itemDescription: formData.itemDescription,
            qty: formData.qty,
            uom: formData.uom,
            barcode: formData.barcode,
            rate: formData.rate,
            discount: formData.discount,
            netRate: formData.netRate,
            amount: formData.amount,
            netAmount: formData.netAmount,
            supplierName: formData.supplierName,
            purchaseNumber: formData.purchaseNumber,
            deliveryDate: formData.deliveryDate,
            invoiceNumber: formData.invoiceNumber,
            invoiceDate: formData.invoiceDate,
            cgst: formData.cgst,
            sgst: formData.sgst,
            groupName: formData.groupName,
            margin: formData.margin,
            MRP: formData.MRP,
            salesRate: formData.salesRate,
            minRate: formData.minRate,
            paymentMode: formData.paymentMode,
            tenderedAmount: formData.tenderedAmount,
            balanceAmount: formData.balanceAmount,
            discountAmount: formData.discountAmount,
            selectedSupplierId: formData.selectedSupplierId,
            brand: formData.brand,
            itemCode: formData.itemCode,
            minimumRate: formData.minRate,
            minStock: formData.minStock,
            location: formData.location,
            hasBatch: formData.hasBatch,
            isActive: formData.isActive,
            isFMP: formData.FMP,
        });
        setShowItemUpdateModal(false);
    };

    const handleDeleteItem = (index) => {
        setItems((prevItems) => prevItems.filter((item, i) => i !== index));
    };

    const [addItems, setAddItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState("");

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/getAllItems");
            if (!response.ok) {
                throw new Error("Failed to fetch suppliers");
            }
            const data = await response.json();
            setAddItems(data);
        } catch (error) {
            console.error(error);
        }
    };


    const handleItemChange = async (event) => {
        const selectedItem = event.target.value;
        const itemDetails = addItems.find((item) => item.itemName === selectedItem);
        console.log(itemDetails);
        setSelectedItem(selectedItem);
        if (itemDetails) {
            setFormData((prevState) => ({
                ...prevState,
                item: selectedItem,
                uom: itemDetails.baseUom,
                rate: itemDetails.purchaseRate,
                groupName: itemDetails.groupName,
                brand: itemDetails.brand,
                itemCode: itemDetails.itemCode,
                minimumRate: itemDetails.minRate,
                minStock: itemDetails.minStock,
                location: itemDetails.location,
                hasBatch: itemDetails.hasBatch,
                isFMP: itemDetails.FMP,
                isActive: itemDetails.isActive,
            }));
        }
    };
    

    return (
        <div>
            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div style={{ border: "1px solid black", padding: "15px" }}>
                        <div
                            className="text-center mt-3"
                            style={{ backgroundColor: "lightgrey" }}
                        >
                            <p>
                                <b>Product List 5000 (Year: 2024-2025)</b>
                            </p>
                        </div>
                        <Row>
                            <Col sm={4}>
                                <Form.Group controlId="formSupplier">
                                    <Form.Label>Product Schme</Form.Label>
                                    <Form.Select
                                        size="sm"
                                    >
                                    </Form.Select>
                                </Form.Group>
                                <div className="d-flex justify-content-center mt-1">
                                    <Button
                                        variant="success"
                                        size="sm"
                                        className="mx-2"
                                        onClick={() => setShowModalAddSupplier(true)}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </Button>
                                    <Button variant="secondary" size="sm" className="mx-2">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Button>
                                </div>
                            </Col>
                            <Col sm={4}>
                                <Form.Group controlId="formInvoiceNumber">
                                    <Form.Label>Product Invoice</Form.Label>
                                    <Form.Control
                                        type="text"
                                        size="sm"
                                        placeholder="Enter invoice number"
                                        name="invoiceNumber"
                                        value={formData.invoiceNumber}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={4}>
                                 <Form.Group controlId="formBarcode">
                                    <Form.Label>Barcode</Form.Label>
                                    <Form.Control
                                        type="text"
                                        size="sm"
                                        placeholder="Enter barcode"
                                        name="barcode"
                                        value={formData.barcode}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={4}>
                            <Form.Group controlId="formInvoiceDate">
                                    <Form.Label>Production Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        size="sm"
                                        name="invoiceDate"
                                        value={formData.invoiceDate}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Col>
                            
                        </Row>

                        <Row>
                            <Col sm={4}>
                               
                            </Col>
                        </Row>

                        <Table striped hover className="mt-4" size="sm">
                            <thead
                                style={{ backgroundColor: "lightgrey", textAlign: "center" }}
                            >
                                <tr>
                                    <th>SL No</th>
                                    <th>Item</th>
                                    <th>Description</th>
                                    <th>QTY</th>
                                    <th>UoM</th>
                                    <th>PRate</th>
                                    <th>cgst</th>
                                    <th>sgst</th>
                                    <th>Discount</th>
                                    <th>Net Rate</th>
                                    <th>Amount</th>
                                    <th>Net Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            size="sm"
                                            name="sl_no"
                                            placeholder="Enter item"
                                            value={formData.sl_no}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <Form.Select
                                            value={selectedItem}
                                            onChange={handleItemChange}
                                            size="sm"
                                        >
                                            <option value="">Select a item Name</option>
                                            {addItems.map((item, index) => (
                                                <option key={index} value={item.itemName}>
                                                    {item.itemName}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="text"
                                            size="sm"
                                            name="itemDescription"
                                            placeholder="Enter description"
                                            value={formData.itemDescription}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            size="sm"
                                            name="qty"
                                            placeholder="Enter quantity"
                                            value={formData.qty}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="text"
                                            size="sm"
                                            name="uom"
                                            placeholder="Enter UoM"
                                            value={formData.uom}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            size="sm"
                                            name="rate"
                                            placeholder="Enter rate"
                                            value={formData.rate}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            size="sm"
                                            name="cgst"
                                            placeholder="cgst"
                                            value={formData.cgst}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            size="sm"
                                            name="sgst"
                                            placeholder="sgst"
                                            value={formData.sgst}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            size="sm"
                                            name="discount"
                                            placeholder="Enter discount"
                                            value={formData.discount}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            size="sm"
                                            name="netRate"
                                            placeholder="Enter net rate"
                                            value={formData.netRate}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            size="sm"
                                            name="amount"
                                            placeholder="Enter amount"
                                            value={formData.amount}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            size="sm"
                                            name="netAmount"
                                            placeholder="Enter net amount"
                                            value={formData.netAmount}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <Button variant="success" size="sm">
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                onClick={() => setShowItemUpdateModal(true)}
                                            />
                                        </Button>
                                    </td>
                                </tr>
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.sl_no}</td>
                                        <td>{item.item}</td>
                                        <td>{item.itemDescription}</td>
                                        <td>{item.qty}</td>
                                        <td>{item.uom}</td>
                                        <td>{item.rate}</td>
                                        <td>{item.cgst}</td>
                                        <td>{item.sgst}</td>
                                        <td>{item.discount}</td>
                                        <td>{item.netRate}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.netAmount}</td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDeleteItem(index)}
                                            >
                                                <FontAwesomeIcon icon={faTimes} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Row className="text-center mt-3">
                            <Col xs={3} className="px-1">
                                <Button variant="secondary" size="sm" className="w-50">
                                    Purchase Order
                                </Button>
                            </Col>
                            <Col xs={3} className="px-1">
                                <Button variant="secondary" size="sm" className="w-50">
                                    Receipt Note
                                </Button>
                            </Col>
                            <Col xs={3} className="px-1">
                                <Button variant="secondary" size="sm" className="w-50">
                                    Update
                                </Button>
                            </Col>
                            <Col xs={3} className="px-1">
                                <Button variant="secondary" size="sm" className="w-50">
                                    Print
                                </Button>
                            </Col>
                            <Col xs={{ span: 2, offset: 5 }} className="px-1">
                                <Button
                                    variant="success"
                                    size="sm"
                                    className="w-50">
                                    Save
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
            </Modal>
            <AddSupplier show={showModalAddSupplier} handleClose={handleModalClose} />
        </div>
    );
}

export default NewModal;
