import React from 'react';
import './App.css';
import {articulos} from './articulos.json';
import FormInsert,{FormUpdate} from './components/Forms';
import Navbar from "./components/Navbar";
import Details from "./components/Details";
import Filters from "./components/Filters";
import {Switch, Route, Link, useRouteMatch} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {Container,Grid,Card,CardContent,CardActions,Button,Typography} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';


const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: "purple"
  },
  link:{
    '&:hover, &:visited, &:link, &:active':{
      color:"white",
      textDecoration: 'none',
    }
  },
  button:{
    marginLeft:"auto",
    marginRight: "auto"
  }
}));

export default function App(){
  let {path} = useRouteMatch();//Get current URL

  /*Route Matcher. Relative Routes*/
  return(
    <Switch>
      <Route exact path={path} component={Main}/>
      <Route path={`${path}/:id`} component={Details}/>
    </Switch>
  );
}
function SimpleCard(props){
  const classes = useStyles();
  let {url} = useRouteMatch();//Get current URL

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          {(props.cardContent != null)? props.cardContent : <>
            <Typography variant="h6" component="h5" align="center" gutterBottom>
              {/*Router Link*/}
              <Link to={`${url}/${props.articulo.id}`} className={classes.link}>
                {props.articulo.descripcion}
              </Link>
            </Typography>
            <Typography variant="body2" component="p" align="center">
            Precio: {props.articulo.precio}
            </Typography>
            <Typography variant="body2" component="p" align="center">
            Categoria: {props.articulo.categoria}
            </Typography>
            <Typography variant="body2" component="p" align="center">
            Marca: {props.articulo.marca}
            </Typography></>
          }
        </CardContent>
        <CardActions>
          <Button variant="contained" 
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<UpdateIcon />}
                  onClick={() => {props.showFormUpdate(props.articulo)}}
          >
            Modificar
          </Button>
          <Button variant="contained" 
                  color="secondary"
                  size="small"
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                  onClick={() => {props.removeArticulo(props.position)}}
          >
            Borrar
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      articulos : articulos,
      articulosparcial: articulos,
      updarticulo: {  
        id : '',
        descripcion : '',
        precio : '',
        categoria : '',
        marca : ''
      },
      showformupdate:false
    }
  }
  componentDidUpdate(prevProps, prevState){
    //If articulos state has been modified, update articulosparcial state.
    if(prevState.articulos !== this.state.articulos){
      this.setState({
        articulosparcial: this.state.articulos
      });
    }
  }
  handlerSearchArticulo(term){
    //Get articulos if includes term substring. Case insenstive. 
    this.setState({
      articulosparcial: this.state.articulos.filter((articulo,pos)=>{
        return articulo.descripcion.toLowerCase().includes(term.toLowerCase()) 
      })
    })
  }
  handlerFilterArticulos(filter){
    this.setState({
      articulosparcial: this.state.articulos.filter(item => {
        //Apply filters
        for (var key in filter) {
          let filtervalue = filter[key];
          let itemvalue = item[key];
          if (!filtervalue){
            //For not allowed filter. Item pass the filter.
            continue;
          } else if(Array.isArray(filtervalue)){
            //For range filter. If item value is out of range, item doesn't pass the filter.
            let [min,max] = filtervalue;
            if(itemvalue > max || itemvalue < min){
              return false;
            }
          } else if (itemvalue !== filtervalue){
            //For string/boolean filter. If item value doesn't match filter value, item doesn't pass the filter.
            return false;
          }
        }
        //Pass the filter
        return true;
      })
    });
  }
  handlerAddArticulo(articulo){
      
      //Find articulo, if exists
      const array = this.state.articulos.filter((art,pos)=>{
        return(parseInt(art.id) === parseInt(articulo.id));
      });

      if(array.length === 0){
        //Add articulo
        this.setState((state,props)=>{
          return({articulos: state.articulos.concat(articulo)});
        })
        return true;
      }
      return false;
  }
  handlerUpdateArticulo(articulo){
    //Find articulo, if exists
    const array = this.state.articulos.filter((art,pos)=>{
      return(parseInt(art.id) === parseInt(articulo.id));
    });

    if(array.length !== 0){
      //Update articulo
      this.setState((prevState,prevProps)=>{
        return ({
          articulos: prevState.articulos.map((art,pos)=>{
            if(parseInt(articulo.id) === parseInt(art.id)){
              return articulo;
            }
            return art;
          })
        });
      });
      return true;
    }
    return false;
  }
  handlerRemoveArticulo(index){
    if(window.confirm('Estas seguro de querer eliminar este articulo?')){
      this.setState({
        articulos: this.state.articulos.filter((articulo,pos)=>{
          //Return articulo if pos does not match the index
          return pos !== index;
        })
      });
    }
  }
  handlerShowFormUpdate(articulo){
    this.setState((prevState,prevProps)=>{
      return({
          updarticulo : articulo,
          showformupdate : !prevState.showformupdate
      });
    });
  }
  render(){
    //Cards list
    const articuloslist = this.state.articulosparcial.map((articulo,pos)=>{
      //Add update form if currently active.
      let cardContent = null;
      if(this.state.showformupdate){
        if(this.state.updarticulo.id === articulo.id){
          cardContent = <FormUpdate articulo={this.state.updarticulo} updateArticulo={this.handlerUpdateArticulo.bind(this)}/>;
        }
      }
      return (
        <Grid item key={pos} xs={12} md={4} lg={4} xl={4}>
          <SimpleCard articulo={articulo} position={pos} showFormUpdate={this.handlerShowFormUpdate.bind(this)} removeArticulo={this.handlerRemoveArticulo.bind(this)} cardContent={cardContent}/>
        </Grid>
      );
    });

    return (
      <>
        <Navbar titulo="Administrador" searchArticulo={this.handlerSearchArticulo.bind(this)}/>
        <Container fixed >
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} lg={3} xl={3}>
              <FormInsert addArticulo={this.handlerAddArticulo.bind(this)}/>
              <Filters articulos={this.state.articulos} filterArticulos={this.handlerFilterArticulos.bind(this)}/>
            </Grid>
            <Grid item xs={12} md={9} lg={9} xl={9}>
              <Grid container spacing={2}>
                {articuloslist} 
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }  
}