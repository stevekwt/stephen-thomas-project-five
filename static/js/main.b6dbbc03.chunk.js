(this.webpackJsonpcontinuity=this.webpackJsonpcontinuity||[]).push([[0],{14:function(e,t,n){},22:function(e,t,n){},28:function(e,t,n){"use strict";n.r(t);var a=n(2),o=n(4),r=n.n(o),i=n(15),s=n.n(i),c=(n(22),n(16)),u=n(8),l=n(9),d=n(7),b=n(11),h=n(10),f=(n(14),n(13));n(24);f.a.initializeApp({apiKey:"AIzaSyAhusalV2PNOkZTGMJoF5jEdG6j1MyAwKQ",authDomain:"continuity-fdab5.firebaseapp.com",databaseURL:"https://continuity-fdab5.firebaseio.com",projectId:"continuity-fdab5",storageBucket:"continuity-fdab5.appspot.com",messagingSenderId:"197882571705",appId:"1:197882571705:web:d4d032992e5d5e0d586468"});var p=f.a,j=function(e){Object(b.a)(n,e);var t=Object(h.a)(n);function n(e){var o;return Object(u.a)(this,n),(o=t.call(this,e)).handleSubmit=function(e){e.preventDefault(),(0,o.props.updateFirebase)(o.state.userInput),document.querySelector("input").value=""},o.handleInputChange=function(e){o.setState({userInput:e.target.value})},o.removeGoal=function(e){e&&(0,o.props.removeFromFirebase)(e)},o.renderGoals=function(e){return e.length?e.map((function(e){var t=e.id,n=e.value;return Object(a.jsxs)("li",{children:[Object(a.jsxs)("p",{children:[n," "]}),Object(a.jsx)("button",{onClick:function(){return o.removeGoal(t)},children:"remove"})]},t)})):Object(a.jsx)("li",{children:"No goals to show"})},o.state={userInput:""},o}return Object(l.a)(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return Object(a.jsxs)("div",{children:[Object(a.jsxs)("form",{action:"",children:[Object(a.jsx)("label",{htmlFor:"newGoal",children:"What do you want someone to write about? "}),Object(a.jsx)("input",{type:"text",id:"newGoal",onChange:this.handleInputChange}),Object(a.jsx)("button",{onClick:this.handleSubmit,children:"Add"})]}),Object(a.jsxs)("p",{children:["Random Essay Idea: ",Object(a.jsx)("strong",{children:this.props.displayRandomThing}),Object(a.jsx)("button",{onClick:this.props.getRandomGoal,children:"Show me another"})]}),Object(a.jsx)("ul",{children:this.renderGoals(this.props.goalsArray)})]})}}]),n}(o.Component),m=function(e){Object(b.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this)).getRandomGoal=function(){var e,t=a.state.goalsArray,n=null===(e=t[Math.floor(Math.random()*t.length)])||void 0===e?void 0:e.value;a.setState({randomGoal:n})},a.state={goalsArray:[],randomGoal:""},a.firebaseRef=a.firebaseRef.bind(Object(d.a)(a)),a.updateFirebase=a.updateFirebase.bind(Object(d.a)(a)),a.removeFromFirebase=a.removeFromFirebase.bind(Object(d.a)(a)),a}return Object(l.a)(n,[{key:"firebaseRef",value:function(){return p.database().ref()}},{key:"updateFirebase",value:function(e){void 0!==e&&this.firebaseRef().push(e)}},{key:"removeFromFirebase",value:function(e){void 0!==e&&this.firebaseRef().child(e).remove()}},{key:"componentDidMount",value:function(){var e=this;this.firebaseRef().on("value",(function(t){var n=t.val();if(console.log(n),null===n)return e.setState({goalsArray:[]});var a=Object.entries(n).map((function(e){var t=Object(c.a)(e,2);return{id:t[0],value:t[1]}}));e.setState({goalsArray:a}),""===e.state.randomGoal&&e.getRandomGoal()}))}},{key:"componentWillUnmount",value:function(){this.firebaseRef().off()}},{key:"render",value:function(){return Object(a.jsxs)("div",{children:[Object(a.jsx)("h1",{children:"Essay Idea DB"}),Object(a.jsx)(j,{goalsArray:this.state.goalsArray,updateFirebase:this.updateFirebase,removeFromFirebase:this.removeFromFirebase,displayRandomThing:this.state.randomGoal,getRandomGoal:this.getRandomGoal})]})}}]),n}(o.Component),v=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,29)).then((function(t){var n=t.getCLS,a=t.getFID,o=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),a(e),o(e),r(e),i(e)}))};s.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(m,{})}),document.getElementById("root")),v()}},[[28,1,2]]]);
//# sourceMappingURL=main.b6dbbc03.chunk.js.map