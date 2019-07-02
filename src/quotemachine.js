import React, { Component, Fragment} from 'react';

class QuoteMachine extends Component { 
constructor() { 
super(); 
this.state = { 
quote: { 
content: '', 
link: '', 
title: ''},
hasQuote: false
};
this.END_POINT = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1'

}
    
getRandomQuote = event => { 
fetch(this.END_POINT)
    .then(response => response.json())
    .then(data => {
    if(data[0].content && data[0].title) { 
    let {quote} = this.state; 
    let Qdata=data[0]; 
    quote.content = Qdata.content; 
    quote.title = Qdata.title;
    quote.link = Qdata.link;
    this.setState({ 
    quote}, () => { 
    if(this.state.hasQuote === false) { 
    this.setState({hasQuote: true})
    }
    })
    }
    else { 
    return console.error('No Quote, sorry!')}})
}

shareOnTwtter = (url,text) => { 


window.open('http://twitter.com/share?url=byNaif'+'&text='+encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');

};
          

renderQuote = () => {

    
return (
<div> 
    <h3 dangerouslySetInnerHTML={{ __html: this.state.quote.content}} />
    <h4> by {this.state.quote.title} </h4>
    <button onClick={() => this.shareOnTwtter(this.state.quote.link,this.state.quote.content)}> Share on Twitter! </button> 
    </div>)
}


render() { 
const { hasQuote } = this.state;
return ( 
    <div> 
    <Fragment> 
        <h1> Quote Machine! </h1>
        <button onClick={this.getRandomQuote}> Click me to get a new quote </button> <br /> <br /> 
        { hasQuote === true ? 
        this.renderQuote()
             : ' No Quote Yet! '}
        </Fragment>
    </div> 

)}

}



export default QuoteMachine; 