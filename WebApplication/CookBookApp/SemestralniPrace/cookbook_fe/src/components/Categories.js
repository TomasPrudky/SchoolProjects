import { Box, Button, Container, Grid, IconButton, List, ListItem, ListItemText, ListSubheader, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance/AxiosInstance";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import EditIcon from '@mui/icons-material/Edit';


export default function Categories() {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState(null);

    useEffect(() => {
        axiosInstance.get("/category")
            .then(result => {
                setCategories(result.data);
                console.log(result.data);
            }).catch(error => {
                console.log(error);
            })
    }, []);

    function handleSubmit() {
        if (category === null) {
            axiosInstance.post("/category", {
                name: name
            }, {
                headers: {
                    'Authorization': localStorage.getItem("jwt")
                }
            }).then(window.location.reload(false));
        } else {
            axiosInstance.put(`/category/${category.id}`, {
                id: category.id,
                name: name
            }, {
                headers: {
                    'Authorization': localStorage.getItem("jwt")
                }
            }).then(window.location.reload(false));
        }
    }

    function deleteteCategory(id) {
        axiosInstance.delete(`/category/${id}`, {
            headers: {
                'Authorization': localStorage.getItem("jwt")
            }
        }).then(window.location.reload(false));
    }

    function restoreCategory() {
        setCategory(null);
        setName("");
    }

    function editCategory(id) {
        axiosInstance.get(`/category/${id}`)
            .then(result => {
                console.log(result.data);
                setCategory(result.data);
                setName(result.data.name);
            });
    }

    return (
        <Container sx={{ mt: '5%' }}>
            <Typography variant="h3">
                Categories
            </Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                value={name}
                label="Category name"
                name="name"
                onChange={(event) => setName(event.target.value)}
                InputProps={{
                    endAdornment: (
                        <IconButton
                            edge="end" aria-label="delete"
                            onClick={() => restoreCategory()}>
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
            /*subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    <TextField
                        fullWidth
                    />
                </ListSubheader>
            }*/
            >
                <li>
                    <ul>
                        {categories.map((item) => (
                            <ListItem key={`item-${item.id}-${item.name}`}>
                                <ListItemText primary={`${item.name}`} />
                                <IconButton edge="end" aria-label="delete" onClick={() => editCategory(item.id)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => deleteteCategory(item.id)}>
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