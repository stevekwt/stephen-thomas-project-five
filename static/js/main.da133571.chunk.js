(this.webpackJsonpcontinuity=this.webpackJsonpcontinuity||[]).push([[0],{14:function(e,t,a){},21:function(e,t,a){},27:function(e,t,a){"use strict";a.r(t);var n=a(2),s=a(3),r=a.n(s),o=a(15),i=a.n(o),c=(a(21),a(8)),l=a(9),d=a(7),u=a(11),h=a(10),m=(a(14),a(13));a(23);m.a.initializeApp({apiKey:"AIzaSyAhusalV2PNOkZTGMJoF5jEdG6j1MyAwKQ",authDomain:"continuity-fdab5.firebaseapp.com",databaseURL:"https://continuity-fdab5.firebaseio.com",projectId:"continuity-fdab5",storageBucket:"continuity-fdab5.appspot.com",messagingSenderId:"197882571705",appId:"1:197882571705:web:d4d032992e5d5e0d586468"});var b=m.a,p=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).handleSubmit=function(e){if(e.preventDefault(),s.state.userInput.length>=20&&s.state.userInput.length<=1e3&&s.state.nameInput.length>=1){var t=s.props.updateFirebase,a=Date.now();t({item:s.state.userInput,date:a,name:s.state.nameInput}),document.querySelector("textarea").value="",s.setState({userInput:"",nameInput:""})}},s.handleInputChange=function(e){s.setState({userInput:e.target.value}),setTimeout((function(){s.setState({charsLeft:1e3-s.state.userInput.length})}),20)},s.handleNameChange=function(e){s.setState({nameInput:e.target.value})},s.removeGoal=function(e){e&&(0,s.props.removeFromFirebase)(e)},s.renderGoals=function(e){return e.length?e.map((function(e){var t=e.date,a=e.item,s=e.name,r=new Date(t).toLocaleString();return Object(n.jsxs)("li",{children:[Object(n.jsx)("p",{children:Object(n.jsx)("span",{className:"ideaSpan",children:a})}),Object(n.jsxs)("p",{className:"attribution",children:["Added by ",Object(n.jsx)("span",{className:"dateSpan",children:s})," on ",Object(n.jsx)("span",{className:"dateSpan",children:r})]})]},t)})):Object(n.jsx)("li",{children:"No ideas to show"})},s.changeDateOrder=function(e){null===e&&(e=s.state.selectedOrderingChoice);"newest"===e?s.props.goalsArray.sort((function(e,t){return t.date<e.date?-1:t.date>e.date?1:0})):s.props.goalsArray.sort((function(e,t){return e.date<t.date?-1:e.date>t.date?1:0})),console.log("this.props.goalsArray after sort",s.props.goalsArray),s.renderGoals(s.props.goalsArray)},s.handleDateOrderingChange=function(e){e.preventDefault(),s.setState({selectedOrderingChoice:e.target.value}),s.changeDateOrder(e.target.value)},s.state={userInput:"",charsLeft:1e3,nameInput:"",selectedOrderingChoice:"placeholder"},s}return Object(l.a)(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return Object(n.jsxs)(s.Fragment,{children:[Object(n.jsx)("section",{className:"inputFormSection",children:Object(n.jsx)("div",{className:"internalFormDiv wrapper",children:Object(n.jsxs)("form",{action:"",children:[Object(n.jsx)("label",{htmlFor:"newGoal",className:"srOnly",children:"What do you want someone to write about? 20 characters minimum \u2014 but go wild! Get as in-depth as you like. (Max 1000 characters, though.) "}),Object(n.jsx)("p",{className:"newGoal","aria-hidden":"true",children:"What do you want someone to write about?"}),Object(n.jsx)("textarea",{id:"newGoal",className:"ideaTextField",placeholder:"20 characters minimum \u2014 but go wild! Get as in-depth as you like.",onChange:this.handleInputChange,minLength:"20"}),Object(n.jsxs)("p",{className:"charCount",children:[" ",this.state.userInput.length<=1e3?"".concat(this.state.charsLeft," characters left"):"Too many characters"]}),Object(n.jsxs)("div",{className:"nameAndButton",children:[Object(n.jsx)("label",{htmlFor:"name",className:"srOnly",children:"Your Name (required) "}),Object(n.jsx)("input",{type:"text",id:"name",className:"nameField",placeholder:"Your Name",onChange:this.handleNameChange,minLength:"1"}),Object(n.jsx)("button",{className:"addButton",onClick:this.handleSubmit,children:"Add"})]})]})})}),Object(n.jsx)("section",{className:"randomItem",children:Object(n.jsxs)("div",{className:"internalRandomDiv wrapper",children:[Object(n.jsx)("span",{className:"randomIntroText",children:"Random Essay Idea: "}),Object(n.jsx)("span",{className:"randomEssayIdea",children:this.props.displayRandomThing}),Object(n.jsx)("button",{className:"anotherButton",onClick:this.props.getRandomGoal,children:"Show me another"})]})}),Object(n.jsx)("section",{className:"itemList",children:Object(n.jsxs)("div",{className:"internalListDiv wrapper",children:[Object(n.jsx)("h2",{children:"The Ideas"}),Object(n.jsxs)("form",{children:[Object(n.jsx)("label",{htmlFor:"orderByDate",className:"srOnly",children:"Order by:"}),Object(n.jsxs)("select",{name:"orderByDate",id:"orderByDate",onChange:this.handleDateOrderingChange,value:this.state.selectedOrderingChoice,children:[Object(n.jsx)("option",{value:"placeholder",disabled:!0,children:"Order By:"}),Object(n.jsx)("option",{value:"newest",children:"Newest"}),Object(n.jsx)("option",{value:"oldest",children:"Oldest"})]})]}),Object(n.jsx)("ul",{children:this.renderGoals(this.props.goalsArray)})]})})]})}}]),a}(s.Component),j=function(e){Object(u.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this)).getRandomGoal=function(){var e;console.log("inside getrandomgoals function");var t=n.state.goalsArray;console.log("goalsArray",t);var a=null===(e=t[Math.floor(Math.random()*t.length)])||void 0===e?void 0:e.item;console.log(a),n.setState({randomGoal:a})},n.state={goalsArray:[],randomGoal:""},n.firebaseRef=n.firebaseRef.bind(Object(d.a)(n)),n.updateFirebase=n.updateFirebase.bind(Object(d.a)(n)),n.removeFromFirebase=n.removeFromFirebase.bind(Object(d.a)(n)),n}return Object(l.a)(a,[{key:"firebaseRef",value:function(){return b.database().ref()}},{key:"updateFirebase",value:function(e){void 0!==e&&this.firebaseRef().push(e)}},{key:"removeFromFirebase",value:function(e){void 0!==e&&this.firebaseRef().child(e).remove()}},{key:"componentDidMount",value:function(){var e=this;this.firebaseRef().on("value",(function(t){var a=t.val();if(console.log(a),null===a)return e.setState({goalsArray:[]});var n=Object.values(a);console.log(n),e.setState({goalsArray:n}),console.log(e.state.goalsArray),""===e.state.randomGoal&&e.getRandomGoal()}))}},{key:"componentWillUnmount",value:function(){this.firebaseRef().off()}},{key:"render",value:function(){return Object(n.jsxs)(s.Fragment,{children:[Object(n.jsx)("header",{children:Object(n.jsx)("div",{className:"internalHeader wrapper",children:Object(n.jsx)("h1",{children:"Essay Idea DB"})})}),Object(n.jsx)(p,{goalsArray:this.state.goalsArray,updateFirebase:this.updateFirebase,removeFromFirebase:this.removeFromFirebase,displayRandomThing:this.state.randomGoal,getRandomGoal:this.getRandomGoal})]})}}]),a}(s.Component),g=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,28)).then((function(t){var a=t.getCLS,n=t.getFID,s=t.getFCP,r=t.getLCP,o=t.getTTFB;a(e),n(e),s(e),r(e),o(e)}))};i.a.render(Object(n.jsx)(r.a.StrictMode,{children:Object(n.jsx)(j,{})}),document.getElementById("root")),g()}},[[27,1,2]]]);
//# sourceMappingURL=main.da133571.chunk.js.map