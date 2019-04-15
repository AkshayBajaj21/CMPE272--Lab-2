import {GET_COURSES} from "../actions/index";

const initialState = {

    courses : []
    // courseid: '',
    // coursename: '',
    // facultyid: '',
    // courseterm: '',
    // coursedept: '',
    // coursedescription: '',
    // courseroom: '',
    // coursecapacity: '',
    // waitlistcapacity: '',
    // status: ''
 
};

const data = (state = initialState, action) => {
console.log("Before entering courses switch : " , initialState.courseid);
console.log("Before entering courses switch : " , action.type);
console.log("Before entering courses switch : " , action.payload);
    switch (action.type) {

        case GET_COURSES :
            return {
                courses: action.payload
                // courseid: action.payload.courseid,
                // coursename: action.payload.coursename,
                // facultyid: action.payload.facultyid,
                // courseterm: action.payload.courseterm,
                // coursedept: action.payload.coursedept,
                // coursedescription: action.payload.coursedescription,
                // courseroom: action.payload.courseroom,
                // coursecapacity: action.payload.coursecapacity,
                // waitlistcapacity: action.payload.waitlistcapacity,
                // status: action.payload.status
            };

    
        default :
            return state;

    }
};

export default data;