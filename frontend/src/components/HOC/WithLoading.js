import React from 'react';
import style from './loader.module.css';
import PropTypes from 'prop-types';
import {Spinner} from "reactstrap";

export function WithLoading(Component) {

    return class extends React.Component {

        constructor(props) {
            super(props);

            this.state = {
                hidden: true
            }
        }


        componentDidUpdate(prevProps, prevState) {
            if(this.props.isLoading != prevProps.isLoading){
                if(this.props.isLoading){
                    this.interval = setTimeout(() => {
                        this.setState({ hidden: false });
                    }, 200);
                }
                else{
                    clearInterval(this.interval);
                    this.setState({ hidden: true });
                }
            }
        }


        render(){
            const {isLoading} = this.props;
            if (isLoading && !this.state.hidden) {
                    return <div className="d-flex flex-column justify-content-center align-items-center">
                        <Spinner className={style.spinner} color={"#3cbd3f"} />
                        <div className="dark-gray-text">Loading, please wait</div>
                    </div>;
            }
            return (<Component {...this.props} />);
        }

    }
}
