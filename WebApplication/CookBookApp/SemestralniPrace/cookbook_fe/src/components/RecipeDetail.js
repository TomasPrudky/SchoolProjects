import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance/AxiosInstance";
import { Grid, IconButton, Rating, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function RecipeDetail() {

    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        axiosInstance.get(`/recipe/${id}`)
            .then(result => {
                setRecipe(result.data);
            }).catch(error => {
                //window.location.replace("/wrong_request");
            })
        if(localStorage.getItem("userId") !== null){
            axiosInstance.get(`/recipe/${id}/${localStorage.getItem("userId")}`, {
                headers: {
                    'Authorization': localStorage.getItem("jwt")
                }
            })
            .then(result => {
                setIsFavorite(result.data);
            })
        }
    }, []);

    function addToFavorite(params) {
        if (localStorage.getItem("userId") !== null) {

            axiosInstance.post(`/recipe/${recipe.id}/${localStorage.getItem("userId")}`, {}, {
                headers: {
                    'Authorization': localStorage.getItem("jwt")
                }
            }).then(result => {
                setIsFavorite(!isFavorite);
            });

            //window.location.reload(true);
        } else {
            console.log("YOU MUST LOGIN");
        }

    }

    function removeFromFavorite(params) {
        if(localStorage.getItem("userId") !== null){

            axiosInstance.delete(`/recipe/${recipe.id}/${localStorage.getItem("userId")}`,{
                headers: {
                    'Authorization': localStorage.getItem("jwt")
                }
            }).then(result => {
                setIsFavorite(!isFavorite);
            });

            //window.location.reload(true);
        }else{
            console.log("YOU MUST LOGIN");
        }
    }

    return (
        <Container component="main" maxWidth="md" sx={{marginBottom: '5%'}}>
            <Box
                sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    px: 4,
                    py: 6,
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Container>
                    {recipe !== null ? (
                        <Grid container item xs={12}>
                            <Grid item xs={8}>
                                <Typography variant="h3">{recipe.name}</Typography>
                            </Grid>
                            <Grid item xs={3} sx={{ textAlign: 'right' }}>
                                <Rating name="read-only" size="large" value={recipe.rating} readOnly/>
                            </Grid>
                            <Grid item xs={1} sx={{ textAlign: 'right' }}>
                                {isFavorite === true ? 
                                    <FavoriteIcon sx={{ color: 'red', '&:hover': { color: 'lightcoral', transform: 'scale(1.3)' } }} fontSize="large" onClick={() => removeFromFavorite()}/>
                                : 
                                <FavoriteBorderIcon fontSize="large" onClick={()=> addToFavorite()}/>
                                }
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>Number of portions: {recipe.numberOfPortions}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>Preparation time (in min): {recipe.prepareTime}</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{textAlign: 'center', margin: 'auto', my: '5%'}}>
                                <img width={'60%'} height={'auto'} src={`.${recipe["linksToImages"]["0"]}` !== null ? `.${recipe["linksToImages"]["0"]}` : '../img/defaultImage.jpg'} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h4">Categories</Typography>
                                <div>
                                    {recipe.categories.map((element, index) => (
                                        <div key={index}>{element.name}</div>
                                    ))}
                                </div>  
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h4">Ingredients</Typography>
                                <div>
                                    {recipe.ingredients.map((element, index) => (
                                        <div key={index}>{element.name}</div>
                                    ))}
                                </div>  
                            </Grid>
                            <Grid item xs={12} sx={{my: '2%'}}>
                                <Typography variant="h5">Preparation procedure</Typography>
                                <Typography>{recipe.procedure}</Typography>
                            </Grid>
                        </Grid>
                    ) : <></>}
                </Container>
            </Box>
        </Container>
    );
}