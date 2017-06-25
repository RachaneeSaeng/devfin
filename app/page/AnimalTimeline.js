// import React from 'react'
// import { connect } from 'react-redux'
// import FirebaseUtil from '../../script/FirebaseUtil'
// import { updateTimeline } from '../redux/action/timeline'

// require("!style-loader!css-loader!sass-loader!../../style/vertical-timeline-2/scss/style.scss");

// class AnimalTimeline extends React.Component {

//     componentDidMount() {
//         Promise.all([FirebaseUtil.getAnimalTimeline('animal_id1')]).then(function (timelineArr) {
//             this.props.dispatch(updateTimeline(timelineArr[0]));
//         }.bind(this), function (err) {
//             // error occurred
//             console.log('Cannot download animal timeline from server');
//         });
//     }

//     render() {
//         return (
//             <div>
//                 {(() => {
//                     return this.props.timeline ?  
//                         <div>
//                         <h1 style={{textAlign:'center'}}>Animal Timeline</h1>   
//                         <section className="timeline">
//                             <div className="container" >
//                                 {
//                                     this.props.timeline.map((d, index) => {
//                                         return index % 2 == 0 ?
//                                             <div className="timeline-item" key={d.id}>
//                                                 <div className="timeline-img"></div>

//                                                 <div className="timeline-content js--fadeInLeft">
//                                                     <h2>{d.title}</h2>
//                                                     <div className="date">{new Date(d.timestamp).toString()}</div>
//                                                     <p>{d.message}</p>
//                                                 </div>
//                                             </div>
//                                             :
//                                             <div className="timeline-item" key={d.id}>
//                                                 <div className="timeline-img"></div>

//                                                 <div className="timeline-content js--fadeInRight">
                                                    
//                                                     <div className="timeline-img-header timeline-image-center-alignment">
//                                                         <img src="https://firebasestorage.googleapis.com/v0/b/testproject-3782c.appspot.com/o/vVqFiU9WO1fozEWI467E9wJkP3e2%2Fresize%2F-Kn61kksDm19nw1rDW3G%2F-Kn61olutXQtPVvVVB3P?alt=media&token=bb4af98d-71be-4cf4-8599-36bd362a8b19" />
//                                                         <h2>{d.title}</h2>
//                                                     </div>
//                                                     <div className="date">{new Date(d.timestamp).toString()}</div>
//                                                     <p>{d.message}</p>
//                                                 </div>
//                                             </div>
//                                     })
//                                 }
//                             </div>
//                         </section>
//                         </div>
//                         : 'There is no timeline for this animal'
//                 })()}
//             </div>
//         )
//     }
// }

// const mapStateToProps = (store) => {
//     return {
//         timeline: store.timeline,
//     }
// }

// export default connect(mapStateToProps)(AnimalTimeline)