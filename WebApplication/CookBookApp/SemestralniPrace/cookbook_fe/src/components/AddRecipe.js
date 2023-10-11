import { Button, Box, TextField, Typography, Checkbox, Input, Autocomplete } from "@mui/material";
import { Container } from "@mui/system";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance/AxiosInstance";
import { useParams } from "react-router-dom";

export default function AddRecipe() {
    
    const { id } = useParams();
    const [category, setCategory] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [process, setProcess] = useState("");
    const [numOfPortions, setNumOfPortions] = useState(0);
    const [prepareTime, setPrepareTime] = useState(0);
    const [rating, setRating] = useState(0);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    useEffect(() => {
        axiosInstance.get("/category")
        .then(response => {
            setCategory(response.data);
        });

        axiosInstance.get("/ingredient")
        .then(response => {
            setIngredients(response.data);
        });

        if (id) {
            console.log("EDIT")
            axiosInstance.get("/recipe/" + id)
            .then(response =>{
                console.log(response.data);
                setName(response.data.name);
                setDescription(response.data.description);
                setProcess(response.data.procedure);
                setNumOfPortions(response.data.numberOfPortions);
                setSelectedIngredients(response.data.ingredients);
                setSelectedCategories(response.data.categories);
                setRating(response.data.rating);
                setPrepareTime(response.data.prepareTime)
            })
        }

    }, []);

    const handleSubmit = (event) =>{
        console.log("Create recipe");
        console.log(localStorage.getItem("jwt"));

        event.preventDefault();
        const data = new FormData(event.currentTarget); 
        const token = localStorage.getItem("jwt");

        const selectedFile = null;
        try{
            selectedFile = document.getElementById("uploadFile").files[0];
        }catch(error){
            console.log("FILE WAS NOT SET!")
        }

        let filename = './img/';
        if(selectedFile === null){
            filename += 'defaultImage.jpg';
        }else{
            filename += selectedFile.name;
        }


        if(id){
            console.log("EDIT")
            axiosInstance.put("/recipe/" + localStorage.getItem("userId"), {
                id: id,
                name: data.get("recipeName"),
                description: data.get("description"),
                procedure: data.get("process"),
                prepareTime: data.get("prepareTime"),
                numberOfPortions: data.get("numberOfPortion"),
                rating: rating,
                owner: localStorage.getItem("userId"),
                linksToImages: [filename],
                ingredients: selectedIngredients,
                categories: selectedCategories
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': token
                },

            })
            .then()
            .catch(error => {
                // zpracování chyby
            });
        }else{
            console.log("ADD")
            axiosInstance.post("/recipe", {
                    name: data.get("recipeName"),
                    description: data.get("description"),
                    procedure: data.get("process"),
                    prepareTime: data.get("prepareTime"),
                    numberOfPortions: data.get("numberOfPortion"),
                    rating: 0,
                    owner: localStorage.getItem("userId"),
                    linksToImages: [filename],
                    ingredients: selectedIngredients,
                    categories: selectedCategories
                },{
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': token
                },
                   
            })
            .then()
            .catch(error => {
                // zpracování chyby
            });
        }
    }

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    return (
        <Container component="main" maxWidth="sm">
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
                <Typography component="h1" variant="h5">
                    {id ? 'Edit recipe' : 'Add recipe'}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Recipe name"
                        name="recipeName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="description"
                        label="Description"
                        id="desciption"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        name="process"
                        id="process"
                        fullWidth
                        label="Process"
                        placeholder="Placeholder"
                        rows={8}
                        multiline
                        value={process}
                        onChange={(e) => setProcess(e.target.value)}
                        />
                    <TextField 
                        type={"number"} 
                        fullWidth margin="normal" 
                        label="Number of portion" 
                        name="numberOfPortion"
                        value={numOfPortions}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }}
                        onChange={(e) => setNumOfPortions(e.target.value)} 
                        />
                    <TextField 
                        type={"number"} 
                        fullWidth 
                        margin="normal" 
                        label="Prepare time" 
                        name="prepareTime"
                        value={prepareTime}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }} 
                        onChange={(e) => setPrepareTime(e.target.value)} 
                        />
                    <Autocomplete
                        value={selectedCategories}
                        sx={{my: 2}}
                        multiple
                        id="checkboxes-tags-demo"
                        options={category}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.name}
                            </li>
                        )}
                        style={{ width: 500 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Categories" placeholder="Categories" />
                        )}
                        onChange={(event, newValue) => {
                            setSelectedCategories(newValue);
                        }}
                    />
                    <Autocomplete
                        value={selectedIngredients}
                        sx={{ my: 2 }}
                        multiple
                        id="checkboxes-tags-demo"
                        options={ingredients}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.name}
                            </li>
                        )}
                        style={{ width: 500 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Ingredients" placeholder="Ingredients" />
                        )}
                        onChange={(event, newValue) => {
                            setSelectedIngredients(newValue);
                        }}
                    />
                    <TextField 
                    fullWidth
                    id="uploadFile"
                    name="uploadFile"
                    type={"file"} 
                    inputProps={{accept:".jpg, .jpge, .png"}}/>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, py: 1.5 }}
                    >
                        SUBMIT
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
