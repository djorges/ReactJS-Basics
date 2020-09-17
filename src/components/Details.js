import React, { useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import { Typography, Container} from '@material-ui/core';
import {articulos} from './../articulos.json';


export default function Details(props) {
    let { id } = useParams(); //Get URL params.
    const [articulo, setArticulo] = useState({  
        id : '',
        descripcion : '',
        precio : '',
        categoria : '',
        marca : ''
    });

    useEffect(()=>{
        //Get articulo that matches id(url parameter), set as state.
        const filtered = articulos.find(obj => parseInt(obj.id) === parseInt(id));
        if(typeof filtered !== "undefined"){
            setArticulo(filtered);
        }
    },[id]);

    return (
        <Container fixed>
            <Typography variant="h5" align="center" gutterBottom>{articulo.descripcion}</Typography>
            <Typography variant="h6">Precio:</Typography>
            <Typography variant="body1" gutterBottom>{articulo.precio}</Typography>
            <Typography variant="h6">Categoría:</Typography>
            <Typography variant="body1" gutterBottom>{articulo.categoria}</Typography>
            <Typography variant="h6">Marca:</Typography>
            <Typography variant="body1" gutterBottom>{articulo.marca}</Typography>
        </Container>
    );
}