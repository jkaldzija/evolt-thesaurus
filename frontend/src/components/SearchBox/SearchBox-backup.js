import React from "react";
import {Button, Card, CardContent, TextField, Typography} from "@material-ui/core";
import './style.css';

type SearchBoxProps = {
    onSubmit: (string) => void
}

export default class SearchBox extends React.Component<SearchBoxProps>{
    state = {
        word: ""
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.word);
    };

    handleChange = e => this.setState({word: e.target.value});

    render() {
        const {word} = this.state;
        return (
            <Card className="search-container">
                <CardContent>
                    <Typography variant="h6" color="default" className="search-title">
                        Search for synonyms
                    </Typography>
                    <form onSubmit={this.onSubmit}>
                        <TextField value={word}
                                   placeholder="Enter word"
                                   fullWidth={true}
                                   onChange={this.handleChange}/>
                        <div className="search-button-container">
                            <Button type="submit" variant="contained" color="primary">Search</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        );
    }
}
