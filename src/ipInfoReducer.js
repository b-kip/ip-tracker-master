export default function ipInfoReducer(state, action) {
  switch(action.type) {
    case 'IPINFO_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        error: {
          isError: false,
          message: ''
        }
      };
    case 'IPINFO_FETCH_SUCCESS':
      return {
        ...state,
        data: action.payload.ipData,
        error: {
          isError: false,
          message: ''
        },
        isLoading: false
      };
    case 'IPINFO_FETCH_FAILURE':
      return {
        ...state,
        error: {
          isError: true,
          message: action.payload.error.message
        },
        isLoading: false
      };
    default:
      throw new Error();
  }
}

export const initialState = {
  data: {
    coordinates: {lat: null, lng: null},
    textInfo: {
      location: '',
      timezone: '',
      isp: '',
      ip: ''
    }
  },
  error: {
    isError: false,
    message: ""
  },
  isLoading: false
};