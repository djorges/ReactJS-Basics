import React,{ useState, useEffect} from 'react';
import {Container,Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText,Slider} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
        backgroundColor: "#003366",
        marginTop:"10px",
        borderRadius:5,
    },
    title:{
        color: "white"
    }
});

export default function Filters(props){
    const classes = useStyles();
    const [filter, setFilter] = useState({
        descripcion: '',
        precio: [0,10000],
        categoria: '',
        marca: ''
    });
    const [filterlist, setFilterList] = useState({
        categoria: [],
        marca: [],
    });

    //On mount/unmount
    useEffect(()=>{
        setFilterList(prevState => {
            //Get filters
            let obj = {};
            for(let key in prevState){
                //Get unique string values from articulos properties
                obj[key] = [...new Set(props.articulos.map(item => item[key]))];
            }
            return { ...prevState, ...obj };
        });
    },[props.articulos]);

    useEffect(()=>{
        //Call handlerFilterArticulos
        props.filterArticulos(filter);
    },[filter]);

    const onChangeFilters = (name,value) => {
        //Set new filter state. Merge object updates
        setFilter(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    return (
        <Container className={classes.root}>
            <Typography className={classes.title} variant="h6" align="center" gutterBottom>Filtros</Typography>
            <FormControl fullWidth>
                <InputLabel id="frm_filt_labCategory">Categoría</InputLabel>
                <Select
                    labelId="frm_filt_labCategory"
                    id="frm_filt_category"
                    name="categoria"
                    value={filter.categoria}
                    onChange={(e) => {
                        const { value, name } = e.target;
                        onChangeFilters(name,value);
                    }}
                >
                    <MenuItem value=""><em>Ninguno</em></MenuItem>
                    {/*Loop categoria property*/}
                    {
                        filterlist["categoria"].map((value,pos)=>
                            <MenuItem key={pos} value={value}>{value}</MenuItem>
                        )
                    }
                </Select>
                <FormHelperText>Elige categoría</FormHelperText>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="frm_filt_labBranch">Marca</InputLabel>
                <Select
                    labelId="frm_filt_labBranch"
                    id="frm_filt_branch"
                    name="marca"
                    value={filter.marca}
                    onChange={(e) => {
                        const { value, name } = e.target;
                        onChangeFilters(name,value);
                    }}
                >
                    <MenuItem value=""><em>Ninguno</em></MenuItem>
                    {/*Loop marca property*/}
                    {
                        filterlist["marca"].map((value,pos)=>
                            <MenuItem key={pos} value={value}>{value}</MenuItem>
                        )
                    }
                </Select>
                <FormHelperText>Elige marca</FormHelperText>
            </FormControl>
            <FormControl fullWidth>
                <Typography id="frm_filt_labPrice" gutterBottom>Precio</Typography>
                <Slider
                    aria-labelledby="frm_filt_labPrice"
                    min={0}
                    max={10000}
                    onChangeCommitted={(event,value)=>{onChangeFilters("precio",value)}}
                    value={filter.precio}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value} $`}
                />
            </FormControl>
        </Container>
    );
}