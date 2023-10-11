import { Button, Grid, IconButton, List, ListItem, Typography } from "@mui/material";
import { Container } from "@mui/system";
import * as React from 'react';
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect } from "react";
import axiosInstance from "../axiosInstance/AxiosInstance";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';



export default function Profile() {

    const [userRecipes, setUserRecipes] = useState([]);
    const [userFavorites, setUserFavorites] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        axiosInstance.get("/recipe/owner/" + userId, {
            headers: {
                'Authorization': localStorage.getItem("jwt")
            }
        }).then(result => {
            setUserRecipes(result.data);
        })

        axiosInstance.get("/recipe/favorite/" + userId, {
            headers: {
                'Authorization': localStorage.getItem("jwt")
            }
        }).then(result => {
            setUserFavorites(result.data);
        })



    }, []);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const [secondary, setSecondary] = React.useState(false);

    function handleDeleteRecipe(recipeId){
        axiosInstance.delete(`/recipe/${recipeId}`, {
            headers: {
                'Authorization': localStorage.getItem("jwt")
            }
        })

        window.location.reload(true);
    }

    function handleDeleteFavoriteRecipe(recipeId){
        axiosInstance.delete(`/recipe/${recipeId}/${localStorage.getItem("userId")}`, {
            headers: {
                'Authorization': localStorage.getItem("jwt")
            }
        })

        window.location.reload(true);
    }


    return (
        <Container component="main" sx={{ padding: '50px' }}>
            <Button href="/addRecipe" variant="outlined" sx={{ my: '1em' }} fullWidth>ADD NEW RECIPE</Button>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <Item sx={{ background: '#3b8ad9', cursor: 'pointer' }}>
                        <Typography>My recipes</Typography>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item sx={{ background: '#3b8ad9' }}>
                        <Typography>Favorite recipes</Typography>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    {userRecipes.length > 0 ? (
                        <Item>
                            <List dense={true}>
                                {userRecipes.map((recipe, index) =>
                                    <ListItem key={index}
                                        secondaryAction={
                                            <Container>
                                                <IconButton href={`/addRecipe/${recipe.id}`}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton href={`/recipe/${recipe.id}`}>
                                                    <VisibilityIcon />
                                                </IconButton>
                                                <IconButton edge="end" onClick={() => handleDeleteRecipe(recipe.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Container>
                                        }
                                    >
                                        <ListItemText
                                            primary={recipe.name}
                                            secondary={secondary ? 'Secondary text' : null}
                                        />
                                    </ListItem>
                                )}
                            </List>
                        </Item>
                    ) : null}
                </Grid>
                <Grid item xs={6}>
                {userFavorites.length > 0 ? (
                        <Item>
                            <List dense={true}>
                                {userFavorites.map((recipe, index) =>
                                    <ListItem key={index}
                                        secondaryAction={
                                            <Container>
                                                <IconButton href={`/recipe/${recipe.id}`}>
                                                    <VisibilityIcon />
                                                </IconButton>
                                                <IconButton edge="end" onClick={() => handleDeleteFavoriteRecipe(recipe.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Container>
                                        }
                                    >
                                        <ListItemText
                                            primary={recipe.name}
                                            secondary={secondary ? 'Secondary text' : null}
                                        />
                                    </ListItem>
                                )}
                            </List>
                        </Item>
                    ) : null}
                </Grid>
            </Grid>
        </Container>
    );
}