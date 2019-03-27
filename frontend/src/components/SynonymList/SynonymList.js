import React, {Fragment} from 'react';
import classnames from "classnames";
import style from "./synonymList.module.css";
import {Link} from "react-router-dom";
import ThemeButton from "../Form/ThemeButton/ThemeButton";
import AddWordDialog from "../AddWord/AddWordDialog";
import {getSynonymRoute} from "../Utility/routing";

type SynonymListProps = {
    synonymList: (Array),
    reloadData: () => void
}


class SynonymList extends React.Component<SynonymListProps> {
    constructor(props) {
        super(props);

        this.state = {
            addSynonymDialogOpen: false
        }
    }

    toggleDialog = (key) => () => {
        const fullKey = `${key}DialogOpen`;
        this.setState({ [fullKey]: !this.state[fullKey] });
    };


    renderSynonymList(){
        const {synonymList} = this.props;
        if(!synonymList || synonymList.length == 0){
            return <div className="d-flex align-items-center mr-3">No synonyms found.</div>
        }
        return <Fragment>
            {synonymList.map((synonym, index) => {
                return <Link key={`${synonym}-${index}`} className={style.link} to={getSynonymRoute(synonym)}>{synonym}</Link>
            })}
        </Fragment>
    }

    render() {
        return <div>
            <div className={classnames("d-flex flex-wrap", style.wrapper)}>
                {this.renderSynonymList()}
                <ThemeButton onClick={this.toggleDialog("addSynonym")} className={style["link-button"]}>
                     Add Synonym
                </ThemeButton>
            </div>
            <AddWordDialog
                word={this.props.currentWord}
                reloadData={this.props.reloadData}
                isOpen={this.state.addSynonymDialogOpen}
                title={"Add synonym"}
                toggle={this.toggleDialog("addSynonym")}
            />
        </div>
    }
}

// Set default props
SynonymList.defaultProps = {
    synonymList:[],
    reloadData: () => {}
};



export default SynonymList;
