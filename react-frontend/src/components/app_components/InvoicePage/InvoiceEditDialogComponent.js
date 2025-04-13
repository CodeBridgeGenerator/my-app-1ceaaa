import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const InvoiceCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            companyID: _entity?.companyID,
Items: _entity?.Items,
SubTotal: _entity?.SubTotal,
Discount: _entity?.Discount,
Total: _entity?.Total,
        };

        setLoading(true);
        try {
            
        const result = await client.service("invoice").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info invoice updated successfully" });
        props.onEditResult(result);
        
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Edit Invoice" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="invoice-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="companyID">CompanyID:</label>
                <InputText id="companyID" className="w-full mb-3 p-inputtext-sm" value={_entity?.companyID} onChange={(e) => setValByKey("companyID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["companyID"]) && (
              <p className="m-0" key="error-companyID">
                {error["companyID"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="Items">Items:</label>
                <InputText id="Items" className="w-full mb-3 p-inputtext-sm" value={_entity?.Items} onChange={(e) => setValByKey("Items", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Items"]) && (
              <p className="m-0" key="error-Items">
                {error["Items"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="SubTotal">SubTotal:</label>
                <InputNumber id="SubTotal" className="w-full mb-3 p-inputtext-sm" value={_entity?.SubTotal} onChange={(e) => setValByKey("SubTotal", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["SubTotal"]) && (
              <p className="m-0" key="error-SubTotal">
                {error["SubTotal"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="Discount">Discount:</label>
                <InputNumber id="Discount" className="w-full mb-3 p-inputtext-sm" value={_entity?.Discount} onChange={(e) => setValByKey("Discount", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Discount"]) && (
              <p className="m-0" key="error-Discount">
                {error["Discount"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="Total">Total:</label>
                <InputNumber id="Total" className="w-full mb-3 p-inputtext-sm" value={_entity?.Total} onChange={(e) => setValByKey("Total", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Total"]) && (
              <p className="m-0" key="error-Total">
                {error["Total"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(InvoiceCreateDialogComponent);
