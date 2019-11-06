import React from "react";
import { connect } from "react-redux";
import PostCard from "../components/PostCard";
import _ from "lodash";
import "./style.css";
import logo from "./logo192.png";
import Container from '@material-ui/core/Container'
import { getPosts, allPosts } from "../actions/postAction";
import { style } from "@material-ui/system";
class SearchBar extends React.Component {
    state ={name:""}
  componentDidMount() {
      
    this.props.allPosts();
    console.log(this.props.posts);
  }
   //render posts
   renderPosts() {
    console.log(this.props.posts);
    return _.map(this.props.posts, (post, key) => {
    /*let searchterm = this.state.name;
    let array = this.props.posts;
    
    const searchFilter = (searchterm, arr) => {
      let term = searchterm.toLowerCase();
      return this.props.posts
    }*/
    let term = this.state.name;
    const potentialMatches = [post.instrument, post.genre, post.title];
    const re = new RegExp(term, "i");
    window.re = re;
    if (potentialMatches.some(pm => pm.match(re))){
      
    
      return (
        <PostCard
          key={key}
          title={post.title}
          instrument={post.instrument}
          genre={post.genre}
          blurb={post.blurb}
          link={post.link}
        ></PostCard>
      );
    } 
    });
  }
  renderSearchBar() {
      return(
        
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-lg-3"
            type="search"
            placeholder="Search"
            aria-label="Search"
            name= "name"
            onChange={(event)=>{
                event.preventDefault()
                let name = event.target.name
                let value = event.target.value
                this.setState({[name]:value})
            }}
          />
     
        </form>
      )
  }
  render() {
      
    return (
      <Container  maxWidth="100%"style={{align:"center", backgroundColor:"black"}}>
          <div className="logo-parent">
        <img src={logo} className="logo-child"/>
        {this.renderSearchBar()}
        </div>
        
        {this.props.posts != null ? this.renderPosts() : null}
      </Container>
     
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    posts: state.posts
  };
}
export default connect(
  mapStateToProps,
  { allPosts, getPosts }
)(SearchBar);
