import { Box, Button, Container, Grid, IconButton, List, ListItem, ListItemText, ListSubheader, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance/AxiosInstance";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import EditIcon from '@mui/icons-material/Edit';


export default function Ingredients() {

    const [ingredients, setIngredients] = useState([]);
    const [name, setName] = useState("");
    const [ingredient, setIngredient] = useState(null);

    useEffect(() => {
        axiosInstance.get("/ingredient")
            .then(result => {
                setIngredients(result.data);
                console.log(result.data);
            }).catch(error => {
                console.log(error);
            })
    }, []);

    function handleSubmit() {
        if(ingredient === null){
            axiosInstance.post("/ingredient", {
                name: name
            }, {
                headers: {
                    'Authorization': localStorage.getItem("jwt")
                }
            }).then(window.location.reload(false));
        }else{
            axiosInstance.put(`/ingredient/${ingredient.id}`, {
                id: ingredient.id,
                name: name
            }, {
                headers: {
                    'Authorization': localStorage.getItem("jwt")
                }
            }).then(window.location.reload(false));
        }
    }

    function deleteteIngredient(id) {
        axiosInstance.delete(`/ingredient?id=${id}`, {
            headers: {
                'Authorization': localStorage.getItem("jwt")
            }
        }).then(window.location.reload(false));
    }

    function restoreIngredient(){
        setIngredient(null);
        setName("");
    }

    function editIngredient(id) {
        console.log("EDIT INGREDIENT: " + id);
        axiosInstance.get(`/ingredient/${id}`)
            .then(result => {
                console.log(result.data);
                setIngredient(result.data);
                setName(result.data.name);
            });
    }

    return (
        <Container sx={{ mt: '5%' }}>
            <Typography variant="h3">
                Ingredients
            </Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                value={name}
                label="Ingredient name"
                name="name"
                onChange={(event) => setName(event.target.value)}
                InputProps={{
                    endAdornment: (
                        <IconButton
                            edge="end" aria-label="delete"
                            onClick={()=> restoreIngredient()}>
                            <ReplayIcon />
                        </IconButton>
                    ),
                }}
            />
            <Button
                onClick={() => handleSubmit()}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, py: 1.5 }}
            >
                SUBMIT
            </Button>
            <List
                sx={{
                    mt: '5%',
                    width: '100%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 400,
                    '& ul': { padding: 0 },
                    boxShadow: 2
                }}
            >
                <li>
                    <ul>
                        {ingredients.map((item) => (
                            <ListItem key={`item-${item.id}-${item.name}`}>
                                <ListItemText primary={`${item.name}`} />
                                <IconButton edge="end" aria-label="delete" onClick={() => editIngredient(item.id)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => deleteteIngredient(item.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </ul>
                </li>
            </List>
        </Container>
    );
}