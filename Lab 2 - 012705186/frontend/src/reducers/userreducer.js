import {GET_USER} from "../actions/index";
import {UPDATE_USER} from "../actions/index";

const initialState = {

    id: '',
    name: '',
    email: '',
    role: '',
    phonenumber: 6692168337,
    aboutme: '',
    city: '',
    country: '',
    company: '',
    school: '',
    hometown: '',
    language: '',
    gender: ''  
};

const data = (state = initialState, action) => {
console.log("Before entering switch : " , initialState.id);
console.log("Before entering switch : " , action.type);
console.log("Before entering switch : " , action.payload);
    switch (action.type) {

        case GET_USER :
            return {
                id: action.payload.id,
                name: action.payload.name,
                role: action.payload.role,
                email: action.payload.email,
                phonenumber: action.payload.phonenumber,
                aboutme: action.payload.aboutme,
                city: action.payload.city,
                country: action.payload.country,
                company: action.payload.company,
                school: action.payload.school,
                hometown: action.payload.hometown,
                language: action.payload.language,
                gender: action.payload.gender
            };

        case UPDATE_USER :
            return {
                ...state,                
                name: action.payload.name,
                role: action.payload.role,
                email: action.payload.email,
                phonenumber: action.payload.cno,
                aboutme: action.payload.about,
                city: action.payload.city,
                country: action.payload.country,
                company: action.payload.company,
                school: action.payload.school,
                hometown: action.payload.hometown,
                language: action.payload.language,
                gender: action.payload.gender
            }
        default :
            return state;

    }
};

export default data;