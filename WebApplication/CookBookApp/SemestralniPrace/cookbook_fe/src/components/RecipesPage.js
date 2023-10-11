import { Box, Card, CardContent, CardMedia, FormControl, FormControlLabel, FormLabel, Pagination, Radio, RadioGroup, Rating, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance/AxiosInstance";
import { useNavigate } from "react-router-dom";


export default function RecipePage({ searchTerm }) {

    const navigate = useNavigate();

    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [countOfRecipes, setCountOfRecipes] = useState(0);
    const [actualPage, setActualPage] = useState(1);
    const itemsOnPage = 10;
    const [sorting, setSorting] = useState('rating_dsc');


    useEffect(() => {
        axiosInstance.get(`/recipe/filter?page=${actualPage - 1}&items=${itemsOnPage}&sort=${sorting}`)
            .then(response => {
                setFilteredRecipes(response.data);
            });

        axiosInstance.get("/recipe/count")
            .then(response => {
                setCountOfRecipes(response.data);
            });
    }, [])

    useEffect(() => {
        axiosInstance.get(`/recipe/str?name=${searchTerm}&page=${actualPage - 1}&items=${itemsOnPage}&sort=${sorting}`)
            .then(response => {
                setFilteredRecipes(response.data);
                setActualPage(1);
            });

        let term = searchTerm.replace(/ /g, '-');
        axiosInstance.get(`/recipe/count/str?name=${term}`)
            .then(response => {
                setCountOfRecipes(response.data);
            });

    }, [searchTerm, sorting]);

    function handleClickOnRecipe(id) {
        navigate("/recipe/" + id);
    }

    const changePage = (event, value) => {
        setActualPage(value);
        axiosInstance.get(`/recipe/filter?page=${value - 1}&items=${itemsOnPage}&sort=${sorting}`)
            .then(response => {
                setFilteredRecipes(response.data);
            })
    }

    const handleChangeSorting = (event) => {
        setSorting(event.target.value);
        console.log(event.target.value);
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: '2%'}}>
                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={sorting}
                        onChange={handleChangeSorting}
                    >
                        <FormControlLabel value="name_asc" control={<Radio />} label="Name: Ascending" />
                        <FormControlLabel value="name_des" control={<Radio />} label="Name: Descending" />
                        <FormControlLabel value="rating_asc" control={<Radio />} label="Rating: Ascending" />
                        <FormControlLabel value="rating_dsc" control={<Radio />} label="Rating: Descending" />
                    </RadioGroup>
                </FormControl>
            </Box>
            {
                filteredRecipes.map((recipe, index) => (
                    <Card onClick={() => handleClickOnRecipe(recipe.id)} key={index} sx={{ margin: '60px', display: 'flex', cursor: 'pointer' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                {recipe.name}
                            </Typography>
                            <Rating name="read-only" size="large" value={recipe.rating} readOnly />
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {recipe.description}
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            sx={{ width: 300, height: 300 }}
                            image={`.${recipe["linksToImages"]["0"]}` !== null ? `.${recipe["linksToImages"]["0"]}` : '../img/defaultImage.jpg'}
                        />
                    </Card>
                ))
            }
            <Container sx={{ display: 'flex', justifyContent: 'center', my: '5%' }}>
                <Pagination id="page" page={actualPage} count={Math.ceil(countOfRecipes / itemsOnPage)} color="primary" onChange={changePage} />
            </Container>
        </Container>
    );
}