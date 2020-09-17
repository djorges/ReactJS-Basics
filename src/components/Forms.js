import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, TextField, Container, Grid} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#006666",
        borderRadius: 5,
        color: "white",
    },
    button: {
        backgroundColor: "#00cc00",
        color: "white",
        marginTop: "20px",
        marginBottom: "20px",
        '&:hover': {
            backgroundColor: '#00b300',
            borderColor: '#00cc00'
        },
    }
}));

function SimpleAlert(props) {
    return (
        <Alert severity={props.status ? 'success' : 'error'}>{props.status ? props.successMsg : props.errorMsg }</Alert>
    );
}
function FormInsert(props) {
    const classes = useStyles();
    const [insarticulo, setInsArticulo] = useState({
        id: '',
        descripcion: '',
        precio: '',
        categoria: '',
        marca: '',
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertStatus, setAlertStatus] = useState(false);
    const mounted = useRef(true);
    
    useEffect(() => {
        if (mounted.current) {
            // ComponentDidMount Logic
            mounted.current = false;
        } else {
            // ComponentDidUpdate Logic

            //If alert is shown, hide alert.
            if (showAlert) {
                setTimeout(() => {
                    setShowAlert(false);
                }, 4000);
            }
        }
    }, [showAlert]);

    function onChangeInputInsert(e) {
        const { value, name } = e.target;

        //Set new insarticulo state. Merge object updates
        setInsArticulo(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    function submitFormInsert(form) {
        form.preventDefault();

        //Call handlerInsertArticulo.
        const status = props.addArticulo(insarticulo);

        //Show alert
        setShowAlert(true);
        setAlertStatus(status);
    }

    return (
        <Container className={classes.root}>
            <Typography variant="h6" align="center" gutterBottom>Insertar</Typography>
            <form id="frm_insert" onSubmit={submitFormInsert}>
                <TextField
                    id="frm_ins_id"
                    name="id"
                    label="Id"
                    placeholder="Id"
                    type="number"
                    inputProps={{ maxLength: 4 }}
                    fullWidth
                    required
                    value={insarticulo.id}
                    onChange={(e) => { onChangeInputInsert(e) }}
                />
                <TextField
                    id="frm_ins_description"
                    name="descripcion"
                    label="Descripción"
                    inputProps={{ maxLength: 110 }}
                    fullWidth
                    required
                    value={insarticulo.descripcion}
                    onChange={(e) => { onChangeInputInsert(e) }}
                />
                <TextField
                    id="frm_ins_price"
                    name="precio"
                    label="Precio"
                    placeholder="Precio"
                    type="number"
                    inputProps={{ step: 0.01, min: 100, max:10000 }}
                    fullWidth
                    required
                    value={insarticulo.precio}
                    onChange={(e) => { onChangeInputInsert(e) }}
                />
                <TextField
                    id="frm_ins_category"
                    name="categoria"
                    label="Categoría"
                    placeholder="Categoría"
                    inputProps={{ maxLength: 110 }}
                    fullWidth
                    required
                    value={insarticulo.categoria}
                    onChange={(e) => { onChangeInputInsert(e) }}
                />
                <TextField
                    id="frm_ins_brand"
                    name="marca"
                    label="Marca"
                    placeholder="Marca"
                    size="small"
                    inputProps={{ maxLength: 110 }}
                    fullWidth
                    required
                    value={insarticulo.marca}
                    onChange={(e) => { onChangeInputInsert(e) }}
                />
                <Grid 
                container 
                direction="row"
                justify="flex-end"
                alignItems="flex-start"
                >
                    <Button variant="contained" size="small" className={classes.button} type="submit" startIcon={<AddIcon />}>Agregar</Button>
                </Grid>
            </form>
            {(showAlert) ? <SimpleAlert status={alertStatus} successMsg="Artículo agregado" errorMsg="Error. Ya existe este artículo."/> : null}
        </Container>
    );
}
function FormUpdate(props) {
    const [updarticulo, setUpdArticulo] = useState({
        id: '',
        descripcion: '',
        precio: '',
        categoria: '',
        marca: '',
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertStatus, setAlertStatus] = useState(false);
    const mounted = useRef(true);

    useEffect(() => {
        //Set derived component as updarticulo
        setUpdArticulo(props.articulo);
    }, [props.articulo]);

    useEffect(() => {
        if (mounted.current) {
            // ComponentDidMount Logic
            mounted.current = false;
        } else {
            // ComponentDidUpdate Logic

            //If alert is shown, hide alert.
            if (showAlert) {
                setTimeout(() => {
                    setShowAlert(false);
                }, 4000);
            }
        }
    }, [showAlert]);

    function onChangeInputUpdate(e) {
        const { value, name } = e.target;

        //Set new updarticulo state. Merge object updates
        setUpdArticulo(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function submitFormUpdate(form) {
        form.preventDefault();

        //Call handlerUpdateArticulo
        const status = props.updateArticulo(updarticulo);

        //Show alert
        setShowAlert(true);
        setAlertStatus(status);
    }

    return (
        <form id="frm_update" onSubmit={submitFormUpdate}>
            <TextField
                id="frm_upd_description"
                name="descripcion"
                label="Descripción"
                size="small"
                fullWidth
                required
                value={updarticulo.descripcion}
                onChange={(e) => { onChangeInputUpdate(e) }}
            />
            <TextField
                id="frm_upd_price"
                name="precio"
                label="Precio"
                placeholder="Precio"
                type="number"
                size="small"
                inputProps={{ step: 0.01, min: 100, max:10000 }}
                fullWidth
                required
                value={updarticulo.precio}
                onChange={(e) => { onChangeInputUpdate(e) }}
            />
            <TextField
                id="frm_upd_category"
                name="categoria"
                label="Categoría"
                placeholder="Categoría"
                size="small"
                fullWidth
                required
                value={updarticulo.categoria}
                onChange={(e) => { onChangeInputUpdate(e) }}
            />
            <TextField
                id="frm_upd_brand"
                name="marca"
                label="Marca"
                placeholder="Marca"
                size="small"
                fullWidth
                required
                value={updarticulo.marca}
                onChange={(e) => { onChangeInputUpdate(e) }}
            />
            <Grid 
                container 
                direction="row"
                justify="flex-end"
                alignItems="flex-start">
                    <Button variant="contained" size="small" color="primary" type="submit">Guardar</Button>
            </Grid>
            {(showAlert) ? <SimpleAlert status={alertStatus} successMsg="Artículo actualizado" errorMsg="Error. No se pudo actualizar el artículo"/> : null}
        </form>
    );
}
export default FormInsert;
export { FormUpdate };