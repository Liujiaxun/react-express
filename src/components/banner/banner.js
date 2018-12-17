import React,{Component} from 'react';

class Banner extends Component {

    constructor(props){
        super(props);
        this.state = {
            BannerList :[],
            msg:'welcome to Banner develop'
        }
    }

    render(){
        return (
            <div>
                Banner, 11
                {this.state.msg}
            </div>
        );
    }
}
export default Banner;